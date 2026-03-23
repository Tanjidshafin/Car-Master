/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { NavLink } from "react-router"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"

const joinClasses = (...classes) => classes.filter(Boolean).join(" ")

export const SkeletonBlock = ({ className = "" }) => (
  <div className={joinClasses("animate-pulse rounded-2xl bg-slate-200/80 dark:bg-white/10", className)} />
)

export const DashboardShell = ({ children, className = "" }) => (
  <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,_rgba(255,255,255,0.9),_transparent)] dark:bg-[linear-gradient(180deg,_rgba(255,255,255,0.06),_transparent)]" />
    <div className={joinClasses("relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-28 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  </div>
)

export const DashboardHero = ({ eyebrow, title, description, actions, aside }) => (
  <motion.section
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/85 shadow-[0_24px_80px_rgba(148,163,184,0.22)] backdrop-blur-xl dark:border-white/10 dark:bg-white/8 dark:shadow-[0_24px_80px_rgba(15,23,42,0.45)]"
  >
    <div className="grid gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-center lg:px-10 lg:py-10">
      <div className="space-y-5">
        {eyebrow ? (
          <span className="inline-flex items-center rounded-full border border-sky-300/70 bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-200">
            {eyebrow}
          </span>
        ) : null}
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">{title}</h1>
          {description ? <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
      {aside ? (
        <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/10 dark:bg-slate-950/45 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-5">
          {aside}
        </div>
      ) : null}
    </div>
  </motion.section>
)

export const DashboardTabs = ({ items }) => (
  <div className="flex flex-wrap gap-3">
    {items.map((item) => (
      <NavLink
        key={item.to}
        end={item.end}
        to={item.to}
        className={({ isActive }) =>
          joinClasses(
            "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
            isActive
              ? "border-sky-300 bg-sky-100 text-sky-700 shadow-[0_12px_30px_rgba(14,165,233,0.12)] dark:border-sky-400/40 dark:bg-sky-400/15 dark:text-white dark:shadow-[0_12px_30px_rgba(14,165,233,0.16)]"
              : "border-slate-200 bg-white/80 text-slate-600 hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white",
          )
        }
      >
        {item.label}
      </NavLink>
    ))}
  </div>
)

export const SurfaceCard = ({ children, className = "" }) => (
  <div className={joinClasses("rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-4 shadow-[0_24px_80px_rgba(148,163,184,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/8 dark:shadow-[0_24px_80px_rgba(15,23,42,0.28)] sm:p-5", className)}>
    {children}
  </div>
)

export const SectionHeading = ({ eyebrow, title, description, action }) => (
  <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-white/10">
    <div className="space-y-2">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600 dark:text-sky-300/80">{eyebrow}</p> : null}
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h2>
      {description ? <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">{description}</p> : null}
    </div>
    {action ? <div className="shrink-0">{action}</div> : null}
  </div>
)

export const StatCard = ({ label, value, meta, icon: Icon, accent = "sky" }) => (
  <SurfaceCard className="overflow-hidden">
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">{label}</p>
        <div className="text-3xl font-semibold text-slate-900 sm:text-4xl dark:text-white">{value}</div>
        {meta ? <p className="text-sm text-slate-600 dark:text-slate-400">{meta}</p> : null}
      </div>
      {Icon ? (
        <div className={joinClasses("flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg", accent === "emerald" ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-white" : accent === "amber" ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-white" : "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-400/30 dark:bg-sky-400/15 dark:text-white")}>
          <Icon className="h-6 w-6" />
        </div>
      ) : null}
    </div>
  </SurfaceCard>
)

export const EmptyState = ({ title, description }) => (
  <div className="flex min-h-56 flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center dark:border-white/15 dark:bg-slate-950/30">
    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
    <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
  </div>
)

export const LoadingState = ({ label = "Loading..." }) => (
  <div className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-slate-200 bg-white/85 dark:border-white/10 dark:bg-slate-950/35">
    <span className="h-12 w-12 animate-spin rounded-full border-4 border-sky-400/25 border-t-sky-300" />
    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</p>
  </div>
)

export const StatCardSkeleton = ({ count = 1 }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <SurfaceCard key={index} className="overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <SkeletonBlock className="h-3 w-24 rounded-full" />
            <SkeletonBlock className="h-10 w-20" />
            <SkeletonBlock className="h-4 w-48" />
          </div>
          <SkeletonBlock className="h-12 w-12 rounded-2xl" />
        </div>
      </SurfaceCard>
    ))}
  </>
)

export const TableSkeleton = ({ columns = 4, rows = 5, title = true, action = false }) => (
  <SurfaceCard>
    {title ? (
      <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-white/10">
        <div className="space-y-3">
          <SkeletonBlock className="h-7 w-48" />
          <SkeletonBlock className="h-4 w-80 max-w-full" />
        </div>
        {action ? <SkeletonBlock className="h-10 w-32 rounded-full" /> : null}
      </div>
    ) : null}
    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white/90 dark:border-white/10 dark:bg-slate-950/35">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="grid gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {Array.from({ length: columns }).map((_, index) => (
              <SkeletonBlock key={index} className="h-3 w-20 rounded-full" />
            ))}
          </div>
          <div className="divide-y divide-slate-200 dark:divide-white/10">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="grid gap-4 px-4 py-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                {Array.from({ length: columns }).map((__, colIndex) => (
                  <SkeletonBlock key={colIndex} className="h-4 w-full max-w-[12rem]" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </SurfaceCard>
)

export const NotificationListSkeleton = ({ rows = 5 }) => (
  <div className="space-y-2">
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="rounded-[1.35rem] border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-start gap-3">
          <SkeletonBlock className="mt-1 h-2.5 w-2.5 rounded-full" />
          <div className="min-w-0 flex-1 space-y-3">
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-4/5" />
            <div className="flex items-center justify-between gap-3">
              <SkeletonBlock className="h-3 w-20 rounded-full" />
              <SkeletonBlock className="h-3 w-12 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)

export const ChatListSkeleton = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="rounded-[1.5rem] border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/35">
        <div className="flex items-start gap-3">
          <SkeletonBlock className="h-12 w-12 rounded-2xl" />
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <SkeletonBlock className="h-4 w-32" />
                <SkeletonBlock className="h-3 w-20 rounded-full" />
              </div>
              <SkeletonBlock className="h-3 w-12 rounded-full" />
            </div>
            <SkeletonBlock className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    ))}
  </div>
)

export const ChatThreadSkeleton = () => (
  <div className="space-y-4">
    <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-white/10">
      <div className="space-y-3">
        <SkeletonBlock className="h-7 w-40" />
        <SkeletonBlock className="h-4 w-72 max-w-full" />
      </div>
      <SkeletonBlock className="h-8 w-24 rounded-full" />
    </div>
    <div className="h-[22rem] space-y-4 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/40 md:h-96">
      <div className="flex gap-3">
        <SkeletonBlock className="h-10 w-10 rounded-2xl" />
        <SkeletonBlock className="h-20 w-64 max-w-[85%] rounded-[1.35rem]" />
      </div>
      <div className="flex justify-end gap-3">
        <SkeletonBlock className="h-24 w-72 max-w-[85%] rounded-[1.35rem]" />
        <SkeletonBlock className="h-10 w-10 rounded-2xl" />
      </div>
      <div className="flex gap-3">
        <SkeletonBlock className="h-10 w-10 rounded-2xl" />
        <SkeletonBlock className="h-16 w-56 max-w-[85%] rounded-[1.35rem]" />
      </div>
    </div>
    <div className="space-y-3">
      <SkeletonBlock className="h-12 w-full rounded-2xl" />
      <div className="flex gap-3">
        <SkeletonBlock className="h-11 w-28 rounded-full" />
        <SkeletonBlock className="h-11 w-28 rounded-full" />
      </div>
    </div>
  </div>
)

export const ChatLayoutSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-3">
    <SurfaceCard className="md:col-span-1">
      <div className="mb-5 space-y-3 border-b border-slate-200 pb-5 dark:border-white/10">
        <SkeletonBlock className="h-7 w-32" />
        <SkeletonBlock className="h-4 w-56 max-w-full" />
      </div>
      <ChatListSkeleton />
    </SurfaceCard>
    <SurfaceCard className="md:col-span-2">
      <ChatThreadSkeleton />
    </SurfaceCard>
  </div>
)

export const ProfileHeroSkeleton = ({ detailCards = 4 }) => (
  <DashboardShell>
    <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/85 shadow-[0_24px_80px_rgba(148,163,184,0.22)] backdrop-blur-xl dark:border-white/10 dark:bg-white/8 dark:shadow-[0_24px_80px_rgba(15,23,42,0.45)]">
      <div className="grid gap-6 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-center lg:px-10 lg:py-10">
        <div className="space-y-5">
          <SkeletonBlock className="h-6 w-28 rounded-full" />
          <div className="space-y-3">
            <SkeletonBlock className="h-12 w-72 max-w-full" />
            <SkeletonBlock className="h-4 w-full max-w-2xl" />
            <SkeletonBlock className="h-4 w-3/4 max-w-xl" />
          </div>
        </div>
        <div className="space-y-3 rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/45 sm:p-5">
          <div className="flex items-center gap-4">
            <SkeletonBlock className="h-20 w-20 rounded-[1.5rem]" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-4 w-32" />
              <SkeletonBlock className="h-3 w-24 rounded-full" />
            </div>
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
              <SkeletonBlock className="h-3 w-20 rounded-full" />
              <SkeletonBlock className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    </section>
    <SurfaceCard>
      <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-white/10">
        <div className="space-y-3">
          <SkeletonBlock className="h-7 w-40" />
          <SkeletonBlock className="h-4 w-72 max-w-full" />
        </div>
        <SkeletonBlock className="h-10 w-28 rounded-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: detailCards }).map((_, index) => (
          <div key={index} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35">
            <div className="mb-3 flex items-center gap-3">
              <SkeletonBlock className="h-5 w-5 rounded-full" />
              <SkeletonBlock className="h-4 w-28" />
            </div>
            <SkeletonBlock className="h-10 w-full rounded-2xl" />
          </div>
        ))}
      </div>
    </SurfaceCard>
  </DashboardShell>
)

export const PremiumButton = ({ children, className = "", tone = "primary", ...props }) => (
  <button
    {...props}
    className={joinClasses(
      "inline-flex items-center justify-center cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60",
      tone === "ghost"
        ? "border border-slate-200 bg-white/85 text-black hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/10"
        : tone === "danger"
          ? "bg-rose-500 text-white shadow-[0_12px_30px_rgba(244,63,94,0.28)] hover:bg-rose-400"
          : tone === "success"
            ? "bg-emerald-500 text-white shadow-[0_12px_30px_rgba(16,185,129,0.28)] hover:bg-emerald-400"
            : "bg-sky-500 text-white shadow-[0_12px_30px_rgba(14,165,233,0.35)] hover:bg-sky-400",
      className,
    )}
  >
    {children}
  </button>
)

export const PremiumInput = ({ className = "", ...props }) => (
  <input
    {...props}
    className={joinClasses(
      "h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400/60 focus:bg-white dark:border-white/10 dark:bg-slate-950/55 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-400/50 dark:focus:bg-slate-950/70",
      className,
    )}
  />
)

export const PremiumTextarea = ({ className = "", ...props }) => (
  <textarea
    {...props}
    className={joinClasses(
      "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400/60 focus:bg-white dark:border-white/10 dark:bg-slate-950/55 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-400/50 dark:focus:bg-slate-950/70",
      className,
    )}
  />
)

export const PremiumSelect = ({ className = "", children, ...props }) => (
  <select
    {...props}
    className={joinClasses(
      "h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-400/60 focus:bg-white dark:border-white/10 dark:bg-slate-950/55 dark:text-white dark:focus:border-sky-400/50 dark:focus:bg-slate-950/70",
      className,
    )}
  >
    {children}
  </select>
)

export const PremiumTable = ({ columns, children }) => (
  <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white/90 dark:border-white/10 dark:bg-slate-950/35">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-left dark:divide-white/10">
        <thead className="bg-slate-50 dark:bg-white/[0.03]">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-white/10">{children}</tbody>
      </table>
    </div>
  </div>
)

export const PremiumTableRow = ({ children }) => <tr className="transition hover:bg-slate-50 dark:hover:bg-white/[0.03]">{children}</tr>

export const PremiumTableCell = ({ children, className = "" }) => (
  <td className={joinClasses("px-4 py-4 text-sm text-slate-700 dark:text-slate-200", className)}>{children}</td>
)

export const PremiumDialog = ({ open, onClose, title, children, className = "" }) => {
  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className={joinClasses(
          "max-h-[calc(100vh-2rem)] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white/95 p-5 shadow-[0_30px_80px_rgba(148,163,184,0.32)] dark:border-white/10 dark:bg-slate-950/95 dark:shadow-[0_30px_80px_rgba(2,6,23,0.65)] sm:p-6",
          className,
        )}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
