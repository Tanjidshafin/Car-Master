import { useContext, useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Camera } from "lucide-react"
import { updateProfile } from "firebase/auth"
import { auth } from "../../../firebase.init"
import { useParams } from "react-router"
import { carService } from "../../services/carService"
import CarCard from "../../Hooks/Carcard"
import { AppContext } from "../../context/AppContext"
import { profileService } from "../../services/profileService"
import { DashboardHero, DashboardShell, EmptyState, PremiumButton, PremiumInput, ProfileHeroSkeleton, SurfaceCard } from "../../Components/dashboard/PremiumShell"

const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append("image", file)
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, {
    method: "POST",
    body: formData,
  })
  const data = await response.json()
  if (!data.success) throw new Error("Image upload failed")
  return data.data.url
}

const VendorProfile = () => {
  const queryClient = useQueryClient()
  const fileInputRef = useRef(null)
  const { vendorId } = useParams()
  const { user, updateSessionUser } = useContext(AppContext)
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const { data, isLoading } = useQuery({
    queryKey: ["vendor-profile", vendorId],
    queryFn: () => carService.getVendorProfile(vendorId),
  })

  const isOwner = !!user?.email && !!data?.vendor?.email && user.email === data.vendor.email

  const saveProfile = useMutation({
    mutationFn: async (payload) => {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: payload.displayName,
          photoURL: payload.photoURL,
        })
      }
      return profileService.updateMyProfile(payload)
    },
    onSuccess: (updatedProfile) => {
      updateSessionUser({
        displayName: updatedProfile.displayName,
        photoURL: updatedProfile.photoURL,
        phone: updatedProfile.phone,
        location: updatedProfile.location,
      })
      queryClient.invalidateQueries({ queryKey: ["vendor-profile", vendorId] })
      queryClient.invalidateQueries({ queryKey: ["my-profile"] })
      setDraft(null)
      setIsEditing(false)
    },
  })

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      setIsUploading(true)
      const imageUrl = await uploadImage(file)
      setDraft((prev) => ({ ...(prev || data.vendor), photoURL: imageUrl }))
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading && !data) return <ProfileHeroSkeleton />
  if (!data) return <DashboardShell><EmptyState title="Vendor not found" description="We couldn't find a vendor profile for this link." /></DashboardShell>

  const vendor = draft || data.vendor

  return (
    <DashboardShell>
      <DashboardHero
        eyebrow="Vendor Profile"
        title={vendor.displayName}
        description="Discover vehicles from this verified vendor and browse a curated inventory with a premium presentation."
        aside={
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
              <div className="relative h-16 w-16 overflow-hidden rounded-[1.2rem] border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5">
                <img
                  src={vendor.photoURL || "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Profile_photo_placeholder_square.svg/1024px-Profile_photo_placeholder_square.svg.png"}
                  alt={vendor.displayName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{vendor.displayName}</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{vendor.email}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Display name</p>
              {isEditing ? (
                <PremiumInput className="mt-2" value={vendor.displayName || ""} onChange={(e) => setDraft((prev) => ({ ...(prev || data.vendor), displayName: e.target.value }))} placeholder="Enter display name" />
              ) : (
                <p className="mt-1 text-slate-900 dark:text-white">{vendor.displayName || "Vendor"}</p>
              )}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Location</p>
              {isEditing ? (
                <PremiumInput className="mt-2" value={vendor.location || ""} onChange={(e) => setDraft((prev) => ({ ...(prev || data.vendor), location: e.target.value }))} placeholder="Enter location" />
              ) : (
                <p className="mt-1 text-slate-900 dark:text-white">{vendor.location || "Location not set"}</p>
              )}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Contact</p>
              {isEditing ? (
                <PremiumInput className="mt-2" value={vendor.phone || ""} onChange={(e) => setDraft((prev) => ({ ...(prev || data.vendor), phone: e.target.value }))} placeholder="Enter phone number" />
              ) : (
                <p className="mt-1 text-slate-900 dark:text-white">{vendor.phone || "Phone not set"}</p>
              )}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Live listings</p>
              <p className="mt-1 text-slate-900 dark:text-white">{data.cars.length}</p>
            </div>
            {isOwner ? (
              <div className="flex flex-wrap gap-2">
                {isEditing ? (
                  <>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <PremiumButton type="button" tone="ghost" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                      <Camera className="mr-2 h-4 w-4" />
                      {isUploading ? "Uploading..." : "Change Photo"}
                    </PremiumButton>
                    <PremiumButton type="button" tone="ghost" onClick={() => {
                      setDraft(null)
                      setIsEditing(false)
                    }}>
                      Cancel
                    </PremiumButton>
                    <PremiumButton type="button" onClick={() => saveProfile.mutate(vendor)} disabled={saveProfile.isPending}>
                      {saveProfile.isPending ? "Saving..." : "Save Profile"}
                    </PremiumButton>
                  </>
                ) : (
                  <PremiumButton type="button" onClick={() => {
                    setDraft(data.vendor)
                    setIsEditing(true)
                  }}>
                    Edit Vendor Profile
                  </PremiumButton>
                )}
              </div>
            ) : null}
          </div>
        }
      />
      <SurfaceCard>
        <div className="mb-5 flex items-end justify-between border-b border-slate-200 pb-5 dark:border-white/10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600/80 dark:text-sky-300/80">Inventory</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Available cars from this vendor</h2>
          </div>
        </div>
        {!data.cars.length ? (
          <EmptyState title="No cars listed yet" description="This vendor hasn't published any visible cars at the moment." />
        ) : (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {data.cars.map((car) => <CarCard key={car._id} car={car} />)}
          </div>
        )}
      </SurfaceCard>
    </DashboardShell>
  )
}

export default VendorProfile
