import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { BadgeCheck, Store } from "lucide-react"
import apiClient from "../../services/apiClient"
import { DashboardHero, DashboardShell, PremiumButton, PremiumInput, SectionHeading, SurfaceCard } from "../../Components/dashboard/PremiumShell"

const BecomeVendor = () => {
  const [form, setForm] = useState({ business_name: "", phone: "", location: "" })
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const requestMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await apiClient.post("/vendor-requests", payload)
      return res.data.data
    },
    onSuccess: () => {
      setError("")
      setSuccess("Vendor request submitted. Admin review is pending.")
    },
    onError: (err) => {
      setSuccess("")
      setError(err?.response?.data?.error || "Failed to submit request")
    },
  })

  const submit = (e) => {
    e.preventDefault()
    requestMutation.mutate(form)
  }

  return (
    <DashboardShell className="max-w-5xl">
      <DashboardHero
        title="Apply For Vendor Access"
        description="Tell us about your business so the admin team can review your request and unlock vendor tools for your account."
      />
      <SurfaceCard className="mx-auto w-full max-w-3xl">
        <SectionHeading
          title="Vendor request"
          description="Submit accurate business details so approval can move quickly."
        />
        <form onSubmit={submit} className="space-y-4">
          <PremiumInput placeholder="Business Name" value={form.business_name} onChange={(e) => setForm((p) => ({ ...p, business_name: e.target.value }))} required />
          <PremiumInput placeholder="Phone" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} required />
          <PremiumInput placeholder="Location" value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} required />
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          {success ? <p className="text-sm text-emerald-300">{success}</p> : null}
          <PremiumButton className="w-full" disabled={requestMutation.isPending}>
            {requestMutation.isPending ? "Submitting..." : "Submit Request"}
          </PremiumButton>
        </form>
      </SurfaceCard>
    </DashboardShell>
  )
}

export default BecomeVendor
