/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react"
import { Check, CheckCheck, ImageIcon } from "lucide-react"

const joinClasses = (...classes) => classes.filter(Boolean).join(" ")

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

const MessageStatus = ({ message }) => {
  if (message?.seen_at) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-sky-200">
        <CheckCheck className="h-3.5 w-3.5" />
        Seen
      </span>
    )
  }

  if (message?.delivered_at) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-slate-200">
        <CheckCheck className="h-3.5 w-3.5" />
        Delivered
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-slate-200">
      <Check className="h-3.5 w-3.5" />
      Sent
    </span>
  )
}

const ChatWindow = ({ messages = [], currentUser, conversation, className = "", emptyClassName = "", fullHeight = false }) => {
  const scrollContainerRef = useRef(null)
  const previousConversationIdRef = useRef(conversation?._id || null)
  const previousMessageCountRef = useRef(messages.length)
  const shouldStickToBottomRef = useRef(true)
  const defaultContainerClass = fullHeight
    ? "min-h-0 flex-1 space-y-4 overflow-y-auto rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/40"
    : "h-[22rem] space-y-4 overflow-y-auto rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/40 md:h-96"
  const defaultEmptyClass = fullHeight
    ? "flex min-h-0 flex-1 flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-white/10 dark:bg-slate-950/40"
    : "flex h-[22rem] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-white/10 dark:bg-slate-950/40 md:h-96"

  const scrollToBottom = () => {
    const container = scrollContainerRef.current
    if (!container) return
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    })
  }
  useEffect(() => {
    if (!messages.length) {
      previousConversationIdRef.current = conversation?._id || null
      previousMessageCountRef.current = 0
      shouldStickToBottomRef.current = true
      return
    }
    const hasConversationChanged = previousConversationIdRef.current !== (conversation?._id || null)
    const hasNewMessages = messages.length > previousMessageCountRef.current
    if (hasConversationChanged || (hasNewMessages && shouldStickToBottomRef.current)) {
      scrollToBottom()
    }
    previousConversationIdRef.current = conversation?._id || null
    previousMessageCountRef.current = messages.length
  }, [conversation?._id, messages])
  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight
    shouldStickToBottomRef.current = distanceFromBottom <= 64
  }
  if (!messages.length) {
    return (
      <div className={joinClasses(defaultEmptyClass, emptyClassName)}>
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-slate-200 bg-white text-sky-500 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-sky-300">
          <ImageIcon className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Be the one to message</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          {conversation
            ? `Start the conversation about ${conversation.car_name} with ${conversation.counterpart?.displayName || conversation.counterpart?.email || "the participant"}.`
            : "Start the conversation by sending the first message."}
        </p>
      </div>
    )
  }

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className={joinClasses(defaultContainerClass, className)}
    >
      {messages.map((msg) => {
        const isOwnMessage = msg.sender_email === currentUser?.email
        const attachmentUrl = msg.attachment_url || msg.image_url || ""
        const hasText = !!msg.text?.trim()
        const attachmentName = msg.attachment_name || "Shared image"

        return (
          <div key={msg._id} className={`flex gap-3 ${isOwnMessage ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[90%] items-end gap-3 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
                {(isOwnMessage ? currentUser?.photoURL : msg.sender?.photoURL) ? (
                  <img
                    src={isOwnMessage ? currentUser?.photoURL : msg.sender?.photoURL}
                    alt={msg.sender?.displayName || currentUser?.displayName || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(isOwnMessage ? currentUser?.displayName || currentUser?.email : msg.sender?.displayName || msg.sender?.email || "CM")
                )}
              </div>
              <div
                className={`max-w-[85%] rounded-[1.35rem] px-4 py-3 shadow-lg ${isOwnMessage
                  ? "rounded-br-md bg-sky-500 text-slate-950"
                  : "rounded-bl-md border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/8 dark:text-slate-100"
                  }`}
              >
                <div className={`mb-1 flex items-center gap-2 ${isOwnMessage ? "justify-end" : ""}`}>
                  <span className={`text-xs font-semibold opacity-80 ${isOwnMessage ? "text-slate-200" : "text-slate-700 dark:text-slate-300"}`}>
                    {isOwnMessage
                      ? currentUser?.displayName || currentUser?.email || "You"
                      : msg.sender?.displayName || msg.sender?.email || "Participant"}
                  </span>
                  <span className={`text-[11px] opacity-70 ${isOwnMessage ? "text-slate-200" : "text-slate-700 dark:text-slate-300"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                  </span>
                </div>
                {attachmentUrl ? (
                  <a href={attachmentUrl} target="_blank" rel="noreferrer" className="mb-3 block">
                    <img
                      src={attachmentUrl}
                      alt={attachmentName}
                      className="max-h-64 w-full rounded-2xl object-cover"
                    />
                  </a>
                ) : null}
                {hasText ? (
                  <p className={`text-sm leading-6 ${isOwnMessage ? "text-slate-200" : "text-slate-700 dark:text-slate-300"}`}>
                    {msg.text}
                  </p>
                ) : attachmentUrl ? (
                  <p className={`text-sm leading-6 italic ${isOwnMessage ? "text-slate-200" : "text-slate-700 dark:text-slate-300"}`}>
                    Image attachment
                  </p>
                ) : null}
                {isOwnMessage ? (
                  <div className="mt-3 flex justify-end">
                    <MessageStatus message={msg} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ChatWindow
