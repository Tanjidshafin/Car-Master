import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router"
import ChatList from "../Components/chat/ChatList"
import ChatWindow from "../Components/chat/ChatWindow"
import MessageInput from "../Components/chat/MessageInput"
import MobileChatOverlay from "../Components/chat/MobileChatOverlay"
import { useChat } from "../Hooks/useChat"
import { AppContext } from "../context/AppContext"
import { ChatLayoutSkeleton, ChatThreadSkeleton, DashboardHero, DashboardShell, EmptyState, SectionHeading, SurfaceCard } from "../Components/dashboard/PremiumShell"

const Messages = () => {
  const { user } = useContext(AppContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeConversation, setActiveConversation] = useState(null)
  const isClosingConversationRef = useRef(false)
  const [deletingConversationId, setDeletingConversationId] = useState(null)
  const { conversationsQuery, messagesQuery, sendMessage, hideConversation } = useChat(activeConversation?._id)
  const conversations = useMemo(() => conversationsQuery.data || [], [conversationsQuery.data])
  const requestedConversationId = searchParams.get("conversationId")
  const isConversationLoading = conversationsQuery.isLoading && !conversations.length
  const isMessagesLoading = !!activeConversation && messagesQuery.isLoading && !messagesQuery.data?.length

  const updateConversationParam = useCallback((conversationId = null) => {
    const nextParams = new URLSearchParams(searchParams)

    if (conversationId) {
      nextParams.set("conversationId", conversationId)
    } else {
      nextParams.delete("conversationId")
    }

    setSearchParams(nextParams)
  }, [searchParams, setSearchParams])

  useEffect(() => {
    if (isClosingConversationRef.current) {
      if (!requestedConversationId) {
        isClosingConversationRef.current = false
      }
      setActiveConversation(null)
      return
    }

    if (!conversations.length) {
      setActiveConversation(null)
      return
    }

    if (requestedConversationId) {
      const matchedConversation = conversations.find((conversation) => conversation._id === requestedConversationId)
      if (matchedConversation) {
        setActiveConversation(matchedConversation)
        return
      }
    }

    if (activeConversation) {
      const refreshedConversation = conversations.find((conversation) => conversation._id === activeConversation._id)
      if (refreshedConversation) {
        if (requestedConversationId && requestedConversationId !== refreshedConversation._id) {
          updateConversationParam(refreshedConversation._id)
        }
        setActiveConversation(refreshedConversation)
        return
      }
    }

    if (requestedConversationId) {
      updateConversationParam(null)
    }
    setActiveConversation(null)
  }, [activeConversation, conversations, requestedConversationId, updateConversationParam])

  const handleSelectConversation = (conversation) => {
    isClosingConversationRef.current = false
    setActiveConversation(conversation)
    updateConversationParam(conversation._id)
  }

  const handleCloseConversation = () => {
    isClosingConversationRef.current = true
    setActiveConversation(null)
    updateConversationParam(null)
  }

  const handleSend = async (payload) => {
    if (!activeConversation) return
    await sendMessage.mutateAsync({
      conversation_id: activeConversation._id,
      text: payload.text,
      attachment_url: payload.attachment?.url || "",
      attachment_name: payload.attachment?.name || "",
      attachment_type: payload.attachment?.type || "",
    })
  }

  const handleDeleteConversation = async (conversation) => {
    const id = conversation?._id
    if (!id || deletingConversationId === id) return
    try {
      setDeletingConversationId(id)
      await hideConversation.mutateAsync(id)
      if (requestedConversationId === id) {
        isClosingConversationRef.current = true
        updateConversationParam(null)
      }
      if (activeConversation?._id === id) {
        setActiveConversation(null)
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error)
    } finally {
      setDeletingConversationId(null)
    }
  }

  return (
    <DashboardShell>
      <DashboardHero
        title="Conversations"
        description="Review every conversation in a refined messaging workspace designed to feel as premium as the listings themselves."

      />
      {isConversationLoading ? (
        <ChatLayoutSkeleton />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <SurfaceCard className="md:col-span-1">
            <SectionHeading title="Conversations" description="Choose a thread to continue the discussion." />
            <ChatList
              conversations={conversations}
              activeId={activeConversation?._id}
              onSelect={handleSelectConversation}
              onDelete={handleDeleteConversation}
              deletingId={hideConversation.variables}
              currentUserEmail={user?.email}
              deletingConversationId={deletingConversationId}
            />
          </SurfaceCard>
          <SurfaceCard className="hidden md:col-span-2 md:block">
            <SectionHeading
              title={activeConversation ? activeConversation.counterpart?.displayName || activeConversation.car_name : "Message details"}
              description={activeConversation ? `Conversation about ${activeConversation.car_name}. New replies will move this thread back to the top automatically.` : "Select a chat to get detailed information."}
              action={activeConversation ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                  <span className={`inline-flex h-2.5 w-2.5 rounded-full ${activeConversation.counterpart_online ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}`} />
                  {activeConversation.counterpart_online ? "Online" : "Offline"}
                </div>
              ) : null}
            />
            {!activeConversation ? (
              <EmptyState title="Select a chat" description="Select a chat to get detailed information and continue the conversation." />
            ) : isMessagesLoading ? (
              <ChatThreadSkeleton />
            ) : (
              <>
                <ChatWindow messages={messagesQuery.data || []} currentUser={user} conversation={activeConversation} />
                <MessageInput onSend={handleSend} sending={sendMessage.isPending} />
              </>
            )}
          </SurfaceCard>
        </div>
      )}
      <MobileChatOverlay
        conversation={activeConversation}
        messages={messagesQuery.data || []}
        currentUser={user}
        sending={sendMessage.isPending}
        loading={isMessagesLoading}
        onBack={handleCloseConversation}
        onSend={handleSend}
      />
    </DashboardShell>
  )
}

export default Messages
