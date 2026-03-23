/* eslint-disable react/prop-types */
"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, Search, SlidersHorizontal, X } from "lucide-react"

const createDraftState = (filters) => ({
  q: filters.q || "",
  brand: filters.brand || "",
  model: filters.model || "",
  condition: filters.condition || "",
  transmission: filters.transmission || "",
  fuel_type: filters.fuel_type || "",
  location: filters.location || "",
  colors: Array.isArray(filters.colors) ? filters.colors : [],
  minPrice: filters.minPrice || "",
  maxPrice: filters.maxPrice || "",
  minYear: filters.minYear || "",
  maxYear: filters.maxYear || "",
})

const FiltersSidebar = ({ isOpen, onClose, meta, filters, onApply, onReset }) => {
  const [draft, setDraft] = useState(() => createDraftState(filters))

  useEffect(() => {
    setDraft(createDraftState(filters))
  }, [filters, isOpen])

  const visibleModels = useMemo(() => meta.models || [], [meta.models])
  const bounds = meta.bounds || {}

  const handleChange = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  const toggleColor = (value) => {
    setDraft((prev) => ({
      ...prev,
      colors: prev.colors.includes(value)
        ? prev.colors.filter((item) => item !== value)
        : [...prev.colors, value],
    }))
  }

  const handleApply = () => {
    onApply({
      ...draft,
      q: draft.q.trim(),
      brand: draft.brand.trim(),
      model: draft.model.trim(),
      condition: draft.condition.trim(),
      transmission: draft.transmission.trim(),
      fuel_type: draft.fuel_type.trim(),
      location: draft.location.trim(),
      minPrice: draft.minPrice.toString().trim(),
      maxPrice: draft.maxPrice.toString().trim(),
      minYear: draft.minYear.toString().trim(),
      maxYear: draft.maxYear.toString().trim(),
    })
  }

  const handleReset = () => {
    const nextDraft = createDraftState({
      q: "",
      brand: "",
      model: "",
      condition: "",
      transmission: "",
      fuel_type: "",
      location: "",
      colors: [],
      minPrice: "",
      maxPrice: "",
      minYear: "",
      maxYear: "",
    })
    setDraft(nextDraft)
    onReset()
  }

  const panel = (
    <motion.div
      initial={{ x: isOpen ? "100%" : 0 }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 24, stiffness: 220 }}
      className="h-full overflow-y-auto rounded-[1.5rem] border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900"
    >
      <div className="mb-5 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-sky-500" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Filters</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Keyword search</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={draft.q}
              onChange={(event) => handleChange("q", event.target.value)}
              placeholder="Search name, brand, model, location"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Brand</label>
            <select
              value={draft.brand}
              onChange={(event) => handleChange("brand", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
            >
              <option value="">All brands</option>
              {meta.brands.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Model</label>
            <select
              value={draft.model}
              onChange={(event) => handleChange("model", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
            >
              <option value="">All models</option>
              {visibleModels.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Condition</label>
            <select
              value={draft.condition}
              onChange={(event) => handleChange("condition", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
            >
              <option value="">All conditions</option>
              {meta.conditions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Transmission</label>
            <select
              value={draft.transmission}
              onChange={(event) => handleChange("transmission", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
            >
              <option value="">All transmissions</option>
              {meta.transmissions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Fuel type</label>
            <select
              value={draft.fuel_type}
              onChange={(event) => handleChange("fuel_type", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
            >
              <option value="">All fuel types</option>
              {meta.fuelTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Location</label>
            <select
              value={draft.location}
              onChange={(event) => handleChange("location", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
            >
              <option value="">All locations</option>
              {meta.locations.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Price range</label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min={bounds.minPrice ?? 0}
              max={bounds.maxPrice ?? undefined}
              value={draft.minPrice}
              onChange={(event) => handleChange("minPrice", event.target.value)}
              placeholder={bounds.minPrice ? `Min ${bounds.minPrice}` : "Min"}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
            />
            <input
              type="number"
              min={bounds.minPrice ?? 0}
              max={bounds.maxPrice ?? undefined}
              value={draft.maxPrice}
              onChange={(event) => handleChange("maxPrice", event.target.value)}
              placeholder={bounds.maxPrice ? `Max ${bounds.maxPrice}` : "Max"}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Year range</label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min={bounds.minYear ?? undefined}
              max={bounds.maxYear ?? undefined}
              value={draft.minYear}
              onChange={(event) => handleChange("minYear", event.target.value)}
              placeholder={bounds.minYear ? `Min ${bounds.minYear}` : "Min"}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
            />
            <input
              type="number"
              min={bounds.minYear ?? undefined}
              max={bounds.maxYear ?? undefined}
              value={draft.maxYear}
              onChange={(event) => handleChange("maxYear", event.target.value)}
              placeholder={bounds.maxYear ? `Max ${bounds.maxYear}` : "Max"}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Colors</label>
          <div className="flex flex-wrap gap-2">
            {meta.colors.length ? (
              meta.colors.map((option) => {
                const selected = draft.colors.includes(option)
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleColor(option)}
                    className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      selected
                        ? "border-sky-500 bg-sky-500 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-200"
                    }`}
                  >
                    {option}
                  </button>
                )
              })
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">No color options available.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={handleApply}
          className="flex-1 rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
        >
          Apply filters
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[9998] bg-slate-950/45 md:hidden"
        />
        <div className="fixed inset-y-0 right-0 z-[9999] w-[22rem] max-w-[92vw] md:static md:w-full">
          {panel}
        </div>
      </>
    </AnimatePresence>
  )
}

export default FiltersSidebar
