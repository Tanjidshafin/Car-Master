import apiClient from "./apiClient"

export const chatService = {
  getConversations: async () => {
    const res = await apiClient.get("/chat/conversations")
    return res.data.data
  },
  createConversation: async (payload) => {
    const res = await apiClient.post("/chat/conversations", payload)
    return res.data.data
  },
  getMessages: async (conversationId) => {
    const res = await apiClient.get(`/chat/messages?conversationId=${conversationId}`)
    return res.data.data
  },
  hideConversation: async (conversationId) => {
    const res = await apiClient.patch(`/chat/conversations/${conversationId}/hide`)
    return res.data
  },
  sendMessage: async (payload) => {
    const res = await apiClient.post("/chat/messages", payload)
    return res.data.data
  },
}
