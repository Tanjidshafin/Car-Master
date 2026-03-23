import { useContext, useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Camera, Mail, MapPin, Phone, UserRound } from "lucide-react"
import { updateProfile } from "firebase/auth"
import { auth } from "../../firebase.init"
import { AppContext } from "../context/AppContext"
import { profileService } from "../services/profileService"
import { DashboardHero, DashboardShell, PremiumButton, PremiumInput, ProfileHeroSkeleton, SectionHeading, SurfaceCard } from "../Components/dashboard/PremiumShell"

const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append("image", file)
  const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, {
    method: "POST",
    body: formData,
  })
  const data = await response.json()
  if (!data.success) {
    throw new Error("Image upload failed")
  }
  return data.data.url
}

const MyProfile = () => {
  const queryClient = useQueryClient()
  const fileInputRef = useRef(null)
  const { user, updateSessionUser } = useContext(AppContext)
  const [draft, setDraft] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const profileQuery = useQuery({
    queryKey: ["my-profile"],
    queryFn: profileService.getMyProfile,
  })

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
      queryClient.invalidateQueries({ queryKey: ["my-profile"] })
      queryClient.invalidateQueries({ queryKey: ["vendor-profile", updatedProfile._id?.toString?.() || updatedProfile._id] })
      setDraft(updatedProfile)
      setIsEditing(false)
    },
  })

  const profile = draft || profileQuery.data

  const beginEditing = () => {
    setDraft(profileQuery.data)
    setIsEditing(true)
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      setIsUploading(true)
      const imageUrl = await uploadImage(file)
      setDraft((prev) => ({ ...(prev || profileQuery.data), photoURL: imageUrl }))
    } finally {
      setIsUploading(false)
    }
  }

  if (profileQuery.isLoading && !profileQuery.data) return <ProfileHeroSkeleton />

  return (
    <DashboardShell>
      <DashboardHero
        eyebrow="My Profile"
        title={profile?.displayName || user?.displayName || "Profile"}
        description="Update the details buyers and vendors use throughout Car Master, including your profile photo, contact number, and location."
        aside={
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5">
                <img
                  src={draft?.photoURL || profile?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Profile_photo_placeholder_square.svg/1024px-Profile_photo_placeholder_square.svg.png"}
                  alt={profile?.displayName || "Profile"}
                  className="h-full w-full object-cover"
                />
                {isUploading ? <div className="absolute inset-0 bg-slate-950/40" /> : null}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white break-all line-clamp-1">{profile?.email}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{profile?.role === "vendor" ? "Vendor account" : "Buyer account"}</p>
              </div>
            </div>
            {isEditing ? (
              <>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <PremiumButton type="button" tone="ghost" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                  <Camera className="mr-2 h-4 w-4" />
                  {isUploading ? "Uploading..." : "Change Photo"}
                </PremiumButton>
              </>
            ) : null}
          </div>
        }
      />

      <SurfaceCard>
        <SectionHeading
          title="Profile Details"
          description="These details appear anywhere your profile is surfaced in the marketplace."
          action={
            isEditing ? (
              <div className="flex gap-2">
                <PremiumButton type="button" tone="ghost" onClick={() => {
                  setDraft(profileQuery.data)
                  setIsEditing(false)
                }}>
                  Cancel
                </PremiumButton>
                <PremiumButton type="button" onClick={() => saveProfile.mutate(draft)} disabled={saveProfile.isPending}>
                  {saveProfile.isPending ? "Saving..." : "Save Changes"}
                </PremiumButton>
              </div>
            ) : (
              <PremiumButton type="button" onClick={beginEditing}>Edit Profile</PremiumButton>
            )
          }
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35">
            <div className="mb-3 flex items-center gap-3">
              <UserRound className="h-5 w-5 text-sky-600 dark:text-sky-300" />
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Display Name</p>
            </div>
            {isEditing ? (
              <PremiumInput value={draft?.displayName || ""} onChange={(e) => setDraft((prev) => ({ ...(prev || profileQuery.data), displayName: e.target.value }))} />
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-300">{profile?.displayName || "Not set"}</p>
            )}
          </div>

          <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35">
            <div className="mb-3 flex items-center gap-3">
              <Mail className="h-5 w-5 text-sky-600 dark:text-sky-300" />
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Email</p>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">{profile?.email}</p>
          </div>

          <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35">
            <div className="mb-3 flex items-center gap-3">
              <Phone className="h-5 w-5 text-sky-600 dark:text-sky-300" />
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Phone</p>
            </div>
            {isEditing ? (
              <PremiumInput value={draft?.phone || ""} onChange={(e) => setDraft((prev) => ({ ...(prev || profileQuery.data), phone: e.target.value }))} placeholder="Enter your phone number" />
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-300">{profile?.phone || "Not provided"}</p>
            )}
          </div>

          <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35">
            <div className="mb-3 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-sky-600 dark:text-sky-300" />
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Location</p>
            </div>
            {isEditing ? (
              <PremiumInput value={draft?.location || ""} onChange={(e) => setDraft((prev) => ({ ...(prev || profileQuery.data), location: e.target.value }))} placeholder="Enter your location" />
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-300">{profile?.location || "Not provided"}</p>
            )}
          </div>
        </div>
      </SurfaceCard>
    </DashboardShell>
  )
}

export default MyProfile
