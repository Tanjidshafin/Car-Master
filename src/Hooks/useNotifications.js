import { useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import apiClient from "../services/apiClient"
import { connectSocket } from "../services/socket"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"

export const useNotifications = ({ page = 1, limit = 8 } = {}) => {
  const queryClient = useQueryClient()
  const { user, loading } = useContext(AppContext)

  const notificationsQuery = useQuery({
    queryKey: ["notifications", page, limit],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await apiClient.get("/notifications", { params: { page, limit } })
      return res.data
    },
  })

  const markRead = useMutation({
    mutationFn: async (id) => apiClient.patch(`/notifications/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  })

  const markAllRead = useMutation({
    mutationFn: async () => apiClient.patch("/notifications/read-all"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  })

  useEffect(() => {
    if (!user?.email) return undefined
    const socket = connectSocket()
    const playNotificationSound = () => {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext
        if (!AudioContextClass) return
        const audioContext = new AudioContextClass()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.type = "sine"
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(660, audioContext.currentTime + 0.12)
        gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.22)

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.24)
      } catch (error) {
        console.log("Notification sound could not play:", error?.message || error)
      }
    }

    const handleNewNotification = () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
      playNotificationSound()
    }
    const refresh = () => queryClient.invalidateQueries({ queryKey: ["notifications"] })
    socket.on("notification:new", handleNewNotification)
    socket.on("notification:read", refresh)
    socket.on("notification:read-all", refresh)
    return () => {
      socket.off("notification:new", handleNewNotification)
      socket.off("notification:read", refresh)
      socket.off("notification:read-all", refresh)
    }
  }, [queryClient, user?.email])

  return { notificationsQuery, markRead, markAllRead }
}
