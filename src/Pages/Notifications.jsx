import { useState } from "react"
import NotificationList from "../Components/notifications/NotificationList"
import { DashboardHero, DashboardShell, NotificationListSkeleton, PremiumButton, SectionHeading, SkeletonBlock, SurfaceCard } from "../Components/dashboard/PremiumShell"
import Pagination from "../Components/shared/Pagination"
import { useNotifications } from "../Hooks/useNotifications"
import { useNavigate } from "react-router"
import { normalizePaginatedData } from "../utils/pagination"

const Notifications = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const { notificationsQuery, markRead, markAllRead } = useNotifications({ page: currentPage, limit: 8 })
  const notificationsResponse = normalizePaginatedData(notificationsQuery.data, currentPage, 8)
  const notifications = notificationsResponse.data
  const totalPages = notificationsResponse.totalPages
  const showPagination = totalPages > 1
  const [loadingId, setLoadingId] = useState(null)
  const handleSelect = async (notification) => {
    if (!notification?._id) return
    try {
      setLoadingId(notification._id)
      if (!notification.read) {
        await markRead.mutateAsync(notification._id)
      }
      navigate(notification.route || "/notifications")
    } catch (error) {
      console.error("Error marking notification as read:", error)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <DashboardShell>
      <DashboardHero
        title="Notifications"
        description="Track marketplace activity, approvals, assignments, bookings, and new replies from one polished inbox."
      />
      <SurfaceCard>
        <SectionHeading
          title="Recent activity"
          description="Newest updates stay at the top so the latest action is always the easiest to reach."
          action={
            <PremiumButton
              type="button"
              tone="ghost"
              onClick={() => markAllRead.mutate()}
              disabled={!notifications.length || markAllRead.isPending}
            >
              Mark all read
            </PremiumButton>
          }
        />
        {notificationsQuery.isPending && !notifications.length ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <SkeletonBlock className="h-4 w-40" />
              <SkeletonBlock className="h-10 w-28 rounded-full" />
            </div>
            <NotificationListSkeleton />
          </div>
        ) : (
          <>
            <NotificationList notifications={notifications} onSelect={handleSelect} loadingId={loadingId} />
            {showPagination ? (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            ) : null}
          </>
        )}
      </SurfaceCard>
    </DashboardShell>
  )
}

export default Notifications
