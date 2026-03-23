/* eslint-disable react/prop-types */
import { ArrowRight, Bell } from "lucide-react"

const formatNotificationTime = (value) => {
  if (!value) return ""
  const date = new Date(value)
  const diffMs = Date.now() - date.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)

  if (diffMinutes < 1) return "Just now"
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffMinutes < 1440) return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  return date.toLocaleDateString([], { month: "short", day: "numeric" })
}

const NotificationList = ({ notifications = [], onSelect, compact = false, loadingId }) => {
  if (!notifications.length) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center dark:border-white/10 dark:bg-slate-950/35">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <Bell className="h-5 w-5" />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-200">No notifications yet.</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Realtime updates will appear here as activity comes in.</p>
      </div>
    )
  }

  return (
    <div className={`space-y-2 ${compact ? "max-h-96 overflow-auto pr-1" : ""}`}>
      {notifications.map((item) => {
        const isLoading = loadingId === item._id
        return (
          <button
            key={item._id}
            type="button"
            onClick={() => onSelect?.(item)}
            disabled={isLoading}
            className={`w-full rounded-[1.35rem] border p-4 text-left transition ${item.read
              ? "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
              : "border-sky-200 bg-sky-50/90 shadow-sm hover:bg-sky-100/80 dark:border-sky-400/20 dark:bg-sky-400/10 dark:hover:bg-sky-400/15"
              } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.read
                  ? "bg-slate-300 dark:bg-slate-600"
                  : "bg-sky-500 dark:bg-sky-300"
                  }`}
              />

              <div className="min-w-0 flex-1">
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-100">
                  {item.message}
                </p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {formatNotificationTime(item.created_at)}
                  </p>
                  {item.route ? (
                    <span className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-300">
                      {isLoading ? "Opening..." : "Open"}
                      {isLoading ? (
                        <span className="h-3 w-3 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5" />
                      )}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default NotificationList
