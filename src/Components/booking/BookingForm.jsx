import { useState } from "react"
import { PremiumButton, PremiumInput, PremiumTextarea } from "../dashboard/PremiumShell"

const BookingForm = ({ onSubmit, loading = false }) => {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", message: "" })
  const [error, setError] = useState("")

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.date || !form.time) {
      setError("Please fill all required fields.")
      return
    }
    setError("")
    onSubmit(form)
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-white/85 p-4 shadow-[0_18px_40px_rgba(148,163,184,0.16)] dark:border-white/10 dark:bg-white/5">
      {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200">{error}</p> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <PremiumInput placeholder="Name *" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
        <PremiumInput placeholder="Phone *" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
        <PremiumInput type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
        <PremiumInput type="time" value={form.time} onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))} />
      </div>
      <PremiumTextarea rows={4} placeholder="Share any preferred timing or questions for the seller." value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} />
      <PremiumButton className="w-full" disabled={loading}>{loading ? "Submitting..." : "Book Test Drive"}</PremiumButton>
    </form>
  )
}

export default BookingForm
