import { io } from "socket.io-client"
import { auth } from "../../firebase.init"
import { SOCKET_URL } from "../config/appConfig"

let socket = null

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ["websocket"],
    })
  }
  return socket
}

export const connectSocket = () => {
  const instance = getSocket()
  const email = auth.currentUser?.email
  if (!email) return instance

  instance.auth = { email }
  if (!instance.connected) instance.connect()
  return instance
}

export const disconnectSocket = () => {
  if (socket?.connected) socket.disconnect()
}
