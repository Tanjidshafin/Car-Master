/* eslint-disable react/prop-types */
import { ArrowLeft } from "lucide-react"
import ChatWindow from "./ChatWindow"
import MessageInput from "./MessageInput"

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

const MobileChatOverlay = ({ conversation, messages = [], currentUser, sending = false, onBack, onSend, loading = false }) => {
  if (!conversation) return null

  const counterpartName = conversation.counterpart?.displayName || conversation.counterpart?.email || "Participant"
  const counterpartPhoto = conversation.counterpart?.photoURL || ""

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col bg-white dark:bg-slate-950 md:hidden">
      <div className="border-b border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-slate-950">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-100 dark:hover:bg-white/10"
            aria-label="Back to conversations"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-100">
            {counterpartPhoto ? (
              <img src={counterpartPhoto} alt={counterpartName} className="h-full w-full object-cover" />
            ) : (
              getInitials(counterpartName)
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate font-semibold text-slate-900 dark:text-white">{counterpartName}</p>
              <span className={`inline-flex h-2.5 w-2.5 shrink-0 rounded-full ${conversation.counterpart_online ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}`} />
            </div>
            <p className="truncate text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{conversation.car_name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{conversation.counterpart_online ? "Online" : "Offline"}</p>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-3">
        {loading ? (
          <div className="flex flex-1 items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500 dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-400">
            Loading conversation...
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1">
              <ChatWindow
                messages={messages}
                currentUser={currentUser}
                conversation={conversation}
                fullHeight
                className="h-full"
                emptyClassName="h-full"
              />
            </div>
            <div className="shrink-0 bg-white pb-[max(env(safe-area-inset-bottom),0px)] dark:bg-slate-950">
              <MessageInput onSend={onSend} sending={sending} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MobileChatOverlay
