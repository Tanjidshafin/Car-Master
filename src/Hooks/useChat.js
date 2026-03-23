import { useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { chatService } from "../services/chatService"
import { connectSocket, getSocket } from "../services/socket"
import { auth } from "../../firebase.init"

const toMessageId = (value) => String(value)

const getMessageStatus = (message) => {
  if (message?.seen_at) return "seen"
  if (message?.delivered_at) return "delivered"
  return "sent"
}

export const useChat = (conversationId = null) => {
  const queryClient = useQueryClient()
  const currentEmail = auth.currentUser?.email || ""

  const conversationsQuery = useQuery({
    queryKey: ["chat-conversations"],
    queryFn: chatService.getConversations,
  })

  const messagesQuery = useQuery({
    queryKey: ["chat-messages", conversationId],
    enabled: !!conversationId,
    queryFn: () => chatService.getMessages(conversationId),
  })

  const createConversation = useMutation({
    mutationFn: chatService.createConversation,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["chat-conversations"] }),
  })

  const hideConversation = useMutation({
    mutationFn: chatService.hideConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-conversations"] })
      if (conversationId) {
        queryClient.removeQueries({ queryKey: ["chat-messages", conversationId] })
      }
    },
  })

  const sendMessage = useMutation({
    mutationFn: chatService.sendMessage,
    onSuccess: (message) => {
      queryClient.setQueryData(["chat-messages", message.conversation_id], (current = []) => {
        if (current.some((item) => toMessageId(item._id) === toMessageId(message._id))) return current
        return [...current, message]
      })

      queryClient.setQueryData(["chat-conversations"], (current = []) =>
        current
          .map((conversation) =>
            conversation._id === message.conversation_id
              ? {
                  ...conversation,
                  last_message: message.text?.trim() || (message.attachment_url ? "Sent an image" : ""),
                  last_message_at: message.createdAt,
                  updatedAt: message.createdAt,
                  last_message_id: message._id,
                  last_message_sender_email: message.sender_email,
                  last_message_delivered_at: message.delivered_at,
                  last_message_seen_at: message.seen_at,
                }
              : conversation,
          )
          .sort((a, b) => new Date(b.last_message_at || b.updatedAt || 0) - new Date(a.last_message_at || a.updatedAt || 0)),
      )
    },
  })

  useEffect(() => {
    const socket = connectSocket()
    const emitDelivered = (message) => {
      if (!message?._id || !message?.conversation_id) return
      if (message.sender_email === currentEmail) return
      if (message.delivered_at) return

      socket.emit("chat:message:delivered", {
        conversationId: message.conversation_id,
        messageId: message._id,
      })
    }

    const handleIncoming = (message) => {
      if (!message?.conversation_id) return

      queryClient.setQueryData(["chat-conversations"], (current = []) =>
        current
          .map((conversation) => {
            if (conversation._id !== message.conversation_id) return conversation

            const isIncoming = message.sender_email !== currentEmail
            const shouldIncrementUnread = isIncoming && conversationId !== message.conversation_id

            return {
              ...conversation,
              last_message: message.text?.trim() || (message.attachment_url ? "Sent an image" : ""),
              last_message_at: message.createdAt,
              updatedAt: message.createdAt,
              last_message_id: message._id,
              last_message_sender_email: message.sender_email,
              last_message_delivered_at: message.delivered_at,
              last_message_seen_at: message.seen_at,
              unread_count: shouldIncrementUnread ? (conversation.unread_count || 0) + 1 : conversation.unread_count || 0,
            }
          })
          .sort((a, b) => new Date(b.last_message_at || b.updatedAt || 0) - new Date(a.last_message_at || a.updatedAt || 0)),
      )

      queryClient.setQueryData(["chat-messages", message.conversation_id], (current = []) => {
        if (current.some((item) => toMessageId(item._id) === toMessageId(message._id))) return current
        return [...current, message]
      })

      emitDelivered(message)
    }

    const handleStatus = (statusEvent) => {
      if (!statusEvent?.conversation_id || !Array.isArray(statusEvent.message_ids)) return

      const messageIds = new Set(statusEvent.message_ids.map(toMessageId))

      queryClient.setQueryData(["chat-messages", statusEvent.conversation_id], (current = []) =>
        current.map((message) =>
          messageIds.has(toMessageId(message._id))
            ? {
                ...message,
                delivered_at: statusEvent.delivered_at ?? message.delivered_at,
                seen_at: statusEvent.seen_at ?? message.seen_at,
              }
            : message,
        ),
      )

      queryClient.setQueryData(["chat-conversations"], (current = []) =>
        current.map((conversation) => {
          if (conversation._id !== statusEvent.conversation_id) return conversation

          const isLastMessageUpdated = conversation.last_message_id && messageIds.has(toMessageId(conversation.last_message_id))
          const isSeenByCurrentUser = statusEvent.type === "seen" && statusEvent.updated_by === currentEmail

          return {
            ...conversation,
            unread_count: isSeenByCurrentUser ? 0 : conversation.unread_count || 0,
            last_message_delivered_at: isLastMessageUpdated ? statusEvent.delivered_at ?? conversation.last_message_delivered_at : conversation.last_message_delivered_at,
            last_message_seen_at: isLastMessageUpdated ? statusEvent.seen_at ?? conversation.last_message_seen_at : conversation.last_message_seen_at,
          }
        }),
      )
    }

    const handlePresence = ({ email, online }) => {
      queryClient.setQueryData(["chat-conversations"], (current = []) =>
        current.map((conversation) =>
          conversation.counterpart?.email === email
            ? {
                ...conversation,
                counterpart_online: online,
              }
            : conversation,
        ),
      )
    }

    const handlePendingMessages = (pendingMessages = []) => {
      pendingMessages.forEach((message) => {
        socket.emit("chat:message:delivered", {
          conversationId: message.conversation_id,
          messageId: message._id,
        })
      })
    }

    socket.on("chat:message:new", handleIncoming)
    socket.on("chat:message:status", handleStatus)
    socket.on("chat:presence:update", handlePresence)
    socket.on("chat:message:pending", handlePendingMessages)

    const handleConnect = () => {
      socket.emit("chat:pending:request")
    }

    socket.on("connect", handleConnect)
    if (socket.connected) {
      socket.emit("chat:pending:request")
    }

    return () => {
      socket.off("chat:message:new", handleIncoming)
      socket.off("chat:message:status", handleStatus)
      socket.off("chat:presence:update", handlePresence)
      socket.off("chat:message:pending", handlePendingMessages)
      socket.off("connect", handleConnect)
    }
  }, [conversationId, currentEmail, queryClient])

  useEffect(() => {
    if (!conversationId) return
    const socket = getSocket()
    socket.emit("chat:join", conversationId)
    return () => socket.emit("chat:leave", conversationId)
  }, [conversationId])

  useEffect(() => {
    if (!conversationId || !messagesQuery.data?.length || !currentEmail) return

    const unseenIncomingMessageIds = messagesQuery.data
      .filter((message) => message.sender_email !== currentEmail && !message.seen_at)
      .map((message) => message._id)

    if (!unseenIncomingMessageIds.length) return

    const socket = getSocket()
    socket.emit("chat:message:seen", {
      conversationId,
      messageIds: unseenIncomingMessageIds,
    })
  }, [conversationId, currentEmail, messagesQuery.data])

  return {
    conversationsQuery,
    messagesQuery,
    createConversation,
    hideConversation,
    sendMessage,
    getMessageStatus,
  }
}
