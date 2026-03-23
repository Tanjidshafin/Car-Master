export const uploadImageToImgbb = async (file) => {
  const formData = new FormData()
  formData.append("image", file)

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, {
    method: "POST",
    body: formData,
  })

  const data = await response.json()

  if (!data?.success) {
    throw new Error(data?.error?.message || "Image upload failed")
  }

  return {
    url: data.data.url,
    deleteUrl: data.data.delete_url || "",
    name: file.name,
    type: file.type,
  }
}
