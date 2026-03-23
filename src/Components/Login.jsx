"use client"

import { useContext, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { LockKeyhole, Mail } from "lucide-react"
import swal from "sweetalert"
import { NavLink, useLocation, useNavigate } from "react-router"
import { AppContext } from "../context/AppContext"
import logo from "../assets/logo.png"

const Login = () => {
  const { handleLogin } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const from = useMemo(() => {
    if (typeof location.state === "string") return location.state
    if (location.state?.from) return location.state.from
    return "/"
  }, [location.state])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      setLoading(true)
      await handleLogin(email, password)
      navigate(from, { replace: true })
    } catch (error) {
      swal({
        title: "Something is Wrong!",
        text: `${error}`,
        icon: "error",
        button: "Ok",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto grid min-h-screen max-w-7xl items-stretch md:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative hidden overflow-hidden md:block"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-slate-950/55" />
          <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white lg:p-16">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight lg:text-5xl">Welcome back to Car Master</h1>
              <p className="max-w-lg text-base text-slate-200 lg:text-lg">
                Sign in to manage messages, bookings, saved vehicles, and your personalized marketplace experience.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img src={logo} alt="Car Master" className="h-10 w-auto" />
              <div>
                <h2 className="text-xl font-semibold">Car Master</h2>
                <p className="text-sm text-slate-200">Premium Auto Experience</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex min-h-screen items-center px-5 py-28 sm:px-8 lg:px-12"
        >
          <div className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_80px_rgba(148,163,184,0.22)] dark:border-white/10 dark:bg-slate-900/90 dark:shadow-[0_24px_80px_rgba(15,23,42,0.55)] sm:p-8">
            <div className="mb-8 space-y-2 text-center">
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Sign In</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Access your account from any device with the same secure login flow.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="abc@gmail.com"
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="**********"
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-600"
              >
                {loading ? <span className="loading loading-spinner loading-sm mr-2" /> : null}
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{" "}
              <NavLink to="/register" state={from} className="font-medium text-blue-500 hover:text-blue-400">
                Register
              </NavLink>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
