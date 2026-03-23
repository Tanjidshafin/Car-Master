import { useState } from "react"
import { PremiumButton, PremiumInput, PremiumTextarea } from "../dashboard/PremiumShell"

const ReservationForm = ({ onSubmit, loading = false }) => {
  const [deposit, setDeposit] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const submit = (e) => {
    e.preventDefault()
    if (deposit === "" || Number(deposit) < 0) {
      setError("Please provide a valid deposit amount.")
      return
    }
    setError("")
    onSubmit({ deposit: Number(deposit), message })
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-white/85 p-4 shadow-[0_18px_40px_rgba(148,163,184,0.16)] dark:border-white/10 dark:bg-white/5">
      {error ? <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200">{error}</p> : null}
      <PremiumInput
        type="number"
        min="0"
        placeholder="Deposit Amount"
        value={deposit}
        onChange={(e) => setDeposit(e.target.value)}
      />
      <PremiumTextarea
        rows={4}
        placeholder="Share any reservation details you want the seller to know."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <PremiumButton className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Reserve Car"}
      </PremiumButton>
    </form>
  )
}

export default ReservationForm
