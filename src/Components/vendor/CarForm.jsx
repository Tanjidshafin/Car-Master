/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { PremiumButton, PremiumInput, PremiumSelect, PremiumTextarea } from "../dashboard/PremiumShell"

const initialState = {
  name: "",
  brand: "",
  model: "",
  year: "",
  price: "",
  condition: "",
  transmission: "",
  fuel_type: "",
  mileage: "",
  color: "",
  location: "",
  contact: "",
  description: "",
  status: "recommended",
  image: "",
  imagesText: "",
}

const CarForm = ({ initialData = null, onSubmit, loading = false }) => {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!initialData) {
      setForm(initialState)
      return
    }
    setForm({
      name: initialData.name || "",
      brand: initialData.brand || "",
      model: initialData.model || "",
      year: initialData.specs?.year || "",
      price: initialData.price || "",
      condition: initialData.specs?.condition || "",
      transmission: initialData.specs?.transmission || "",
      fuel_type: initialData.fuel_type || "",
      mileage: initialData.mileage || "",
      color: initialData.specs?.color || "",
      location: initialData.location || "",
      contact: initialData.contact || "",
      description: initialData.description || "",
      status: initialData.status || "recommended",
      image: initialData.image || "",
      imagesText: Array.isArray(initialData.images) ? initialData.images.join(", ") : "",
    })
  }, [initialData])

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    if (!form.name || !form.brand || !form.model || !form.price) {
      setError("Please fill all required fields.")
      return
    }
    const images = form.imagesText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
    const payload = {
      ...form,
      price: Number(form.price),
      images: images.length ? images : form.image ? [form.image] : [],
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {error ? <p className="md:col-span-2 text-sm text-rose-300">{error}</p> : null}
      {[
        ["name", "Name *"],
        ["brand", "Brand *"],
        ["model", "Model *"],
        ["year", "Year *"],
        ["price", "Price *"],
        ["condition", "Condition *"],
        ["transmission", "Transmission *"],
        ["fuel_type", "Fuel Type *"],
        ["mileage", "Mileage *"],
        ["color", "Color *"],
        ["location", "Location *"],
        ["contact", "Contact *"],
        ["image", "Cover Image URL"],
      ].map(([key, label]) => (
        <PremiumInput
          key={key}
          value={form[key]}
          onChange={(e) => handleChange(key, e.target.value)}
          placeholder={label}
          required={label.includes("*")}
        />
      ))}
      <PremiumSelect
        value={form.status}
        onChange={(e) => handleChange("status", e.target.value)}
      >
        <option value="recommended">recommended</option>
        <option value="specialOffer">specialOffer</option>
      </PremiumSelect>
      <PremiumInput
        value={form.imagesText}
        onChange={(e) => handleChange("imagesText", e.target.value)}
        placeholder="Image URLs (comma separated)"
      />
      <PremiumTextarea
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
        placeholder="Description *"
        className="md:col-span-2 min-h-32"
        rows={4}
        required
      />
      <div className="md:col-span-2 flex justify-end">
        <PremiumButton type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Car"}
        </PremiumButton>
      </div>
    </form>
  )
}

export default CarForm
