/* eslint-disable react/prop-types */
import { Check, CheckCheck, Trash2 } from "lucide-react"

const formatConversationTime = (value) => {
  if (!value) return ""
  const date = new Date(value)
  const diffMs = Date.now() - date.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)

  if (diffMinutes < 1) return "Now"
  if (diffMinutes < 60) return `${diffMinutes}m`
  if (diffMinutes < 1440) return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  return date.toLocaleDateString([], { month: "short", day: "numeric" })
}

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

const MessageStatusIcon = ({ conversation, currentUserEmail }) => {
  if (conversation.last_message_sender_email !== currentUserEmail) return null
  if (conversation.last_message_seen_at) return <CheckCheck className="h-3.5 w-3.5 text-sky-500" />
  if (conversation.last_message_delivered_at) return <CheckCheck className="h-3.5 w-3.5 text-slate-400" />
  return <Check className="h-3.5 w-3.5 text-slate-400" />
}

const ChatList = ({ conversations = [], activeId, onSelect, onDelete, deletingId, currentUserEmail, deletingConversationId }) => {
  if (!conversations.length) {
    return <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500 dark:border-white/10 dark:bg-slate-950/30 dark:text-slate-400">No conversations yet.</div>
  }
  return (
    <div className="space-y-3">
      {conversations.map((item) => (
        <div
          key={item._id}
          className={`rounded-[1.5rem] border p-4 transition-all duration-300 ${activeId === item._id
            ? "border-sky-300 bg-sky-50 shadow-[0_18px_35px_rgba(14,165,233,0.12)] dark:border-sky-400/40 dark:bg-sky-400/10"
            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950/35 dark:hover:border-white/20 dark:hover:bg-white/[0.03]"
            }`}
        >
          <div className="flex items-start gap-3">
            <button type="button" onClick={() => onSelect(item)} className="flex min-w-0 flex-1 items-start gap-3 text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
                {item.counterpart?.photoURL ? (
                  <img src={item.counterpart.photoURL} alt={item.counterpart.displayName || "Participant"} className="h-full w-full object-cover" />
                ) : (
                  getInitials(item.counterpart?.displayName || item.counterpart?.email || "CM")
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex h-2.5 w-2.5 rounded-full ${item.counterpart_online ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}`} />
                      <p className="truncate font-medium text-slate-900 dark:text-white">{item.counterpart?.displayName || item.counterpart?.email || "Conversation"}</p>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.counterpart_online ? "Online" : "Offline"}</p>
                    <p className="mt-1 break-words line-clamp-1 text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">{item.car_name}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {item.unread_count ? (
                      <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-sky-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        {item.unread_count}
                      </span>
                    ) : null}
                    <span className="text-xs text-slate-500 dark:text-slate-400">{formatConversationTime(item.last_message_at || item.updatedAt)}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <MessageStatusIcon conversation={item} currentUserEmail={currentUserEmail} />
                  <p className={`truncate text-sm ${item.unread_count ? "font-semibold text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
                    {item.last_message || "No messages yet"}
                  </p>
                </div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => onDelete?.(item)}
              disabled={deletingId === item._id}
              className="mt-1 inline-flex h-9 w-9 cursor-pointer shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 disabled:opacity-50 dark:border-white/10 dark:text-slate-300 dark:hover:border-rose-400/30 dark:hover:bg-rose-400/10 dark:hover:text-rose-300"
              aria-label="Delete conversation"
            >
              {deletingId === item._id ? (
                <span className="h-4 w-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatList
