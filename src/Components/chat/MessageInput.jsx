/* eslint-disable react/prop-types */
import { useRef, useState } from "react"
import { ImagePlus, SendHorizonal, X } from "lucide-react"
import { PremiumButton, PremiumInput } from "../dashboard/PremiumShell"
import { uploadImageToImgbb } from "../../utils/uploadImageToImgbb"

const MessageInput = ({ onSend, sending = false }) => {
  const [text, setText] = useState("")
  const [attachment, setAttachment] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef(null)

  const isBusy = sending || uploading

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Only image attachments are supported right now.")
      e.target.value = ""
      return
    }

    try {
      setError("")
      setUploading(true)
      const uploaded = await uploadImageToImgbb(file)
      setAttachment({
        url: uploaded.url,
        name: uploaded.name,
        type: uploaded.type,
      })
    } catch (uploadError) {
      setError(uploadError.message || "Failed to upload image.")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  const clearAttachment = () => {
    setAttachment(null)
    setError("")
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!text.trim() && !attachment?.url) return

    try {
      setError("")
      await onSend({
        text: text.trim(),
        attachment,
      })

      setText("")
      setAttachment(null)
    } catch (sendError) {
      setError(sendError?.response?.data?.error || sendError?.message || "Failed to send message.")
    }
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      {attachment?.url ? (
        <div className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-slate-950/35">
          <div className="flex min-w-0 items-center gap-3">
            <img src={attachment.url} alt={attachment.name || "Attachment preview"} className="h-14 w-14 rounded-xl object-cover" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{attachment.name || "Image attachment"}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ready to send</p>
            </div>
          </div>
          <button
            type="button"
            onClick={clearAttachment}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
            aria-label="Remove attachment"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      {error ? <p className="text-sm text-rose-500">{error}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <PremiumInput
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={attachment?.url ? "Add a caption (optional)" : "Type your message"}
          className=""
        />
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        <div className="flex gap-2">
          <PremiumButton
            type="button"
            tone="ghost"
            onClick={() => fileInputRef.current?.click()}
            disabled={isBusy}
            className="w-full sm:w-auto"
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            {uploading ? "Uploading..." : "Attach"}
          </PremiumButton>
          <PremiumButton type="submit" disabled={isBusy || (!text.trim() && !attachment?.url)} className="w-full sm:w-auto">
            <SendHorizonal className="mr-2 h-4 w-4" />
            {sending ? "Sending..." : "Send"}
          </PremiumButton>
        </div>
      </div>
    </form>
  )
}

export default MessageInput
