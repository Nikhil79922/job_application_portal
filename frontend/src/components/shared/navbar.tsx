"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  CircleHelp,
  Home,
  LogIn,
  LogOut,
  Menu,
  SearchCheck,
  User,
  UserPlus,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/models/sheet"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/models/dropdown-menu"

import ThemeToggle from "@/components/shared/theme-toggle"

const isAuthenticated = false

const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Find Jobs",
    href: "/jobs",
    icon: SearchCheck,
  },
  {
    name: "Companies",
    href: "/companies",
    icon: Building2,
  },
  {
    name: "About",
    href: "/about",
    icon: CircleHelp,
  },
]

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const handleNavigation = (href: string) => {
    setOpen(false)

    setTimeout(() => {
      router.push(href)
    }, 220)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/92 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-2xl transition-all duration-500 dark:border-white/10 dark:bg-[#09090B]/85 dark:shadow-none">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">

        {/* LOGO */}
        <Link
          href="/"
          className="group flex items-center gap-4"
        >
          {/* ICON */}
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 ease-out group-hover:-translate-y-[2px] group-hover:scale-[1.03] group-hover:border-emerald-200 group-hover:shadow-[0_12px_30px_rgba(16,185,129,0.12)] dark:border-white/10 dark:bg-zinc-900 dark:group-hover:border-emerald-500/20 dark:group-hover:shadow-[0_10px_30px_rgba(16,185,129,0.08)]">

            {/* SOFT GLOW */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* ACCENT DOT */}
            <div className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-all duration-500 group-hover:scale-110" />

            <BriefcaseBusiness className="h-5 w-5 text-slate-950 transition-all duration-500 group-hover:scale-110 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400" />
          </div>

          {/* BRAND */}
          <div className="leading-none">
            <h1 className="text-[28px] font-black tracking-[-1.5px] text-slate-950 transition-all duration-500 group-hover:text-slate-900 dark:text-white">
              Talent
              <span className="ml-1 text-emerald-600 transition-all duration-500 group-hover:text-emerald-500">
                Forge
              </span>
            </h1>

            <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400 transition-all duration-500 group-hover:text-emerald-500 dark:text-zinc-500 dark:group-hover:text-zinc-400">
              Future Of Hiring
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((item) => {
            const Icon = item.icon

            const active = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-500 ease-out ${
                  active
                    ? "bg-emerald-100 text-emerald-700 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "text-slate-700 hover:bg-emerald-50/80 hover:text-emerald-600 dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-white"
                }`}
              >

                {/* HOVER BACKGROUND */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <Icon className="relative z-10 h-[18px] w-[18px] opacity-90 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-[1px]" />

                <span className="relative z-10">
                  {item.name}
                </span>

                {/* BOTTOM LINE */}
                <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-emerald-500 transition-all duration-500 group-hover:w-8" />
              </Link>
            )
          })}
        </nav>

        {/* ACTIONS */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* THEME TOGGLE */}
          <ThemeToggle />

          {!isAuthenticated ? (
            <>
              {/* LOGIN */}
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="group h-11 cursor-pointer rounded-full border border-slate-200 bg-slate-50 px-6 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-500 ease-out hover:-translate-y-[1px] hover:border-emerald-200 hover:bg-white hover:text-emerald-600 hover:shadow-[0_10px_25px_rgba(16,185,129,0.08)] dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:hover:border-emerald-500/20 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                >
                  <LogIn className="mr-2 h-4 w-4 transition-all duration-500 group-hover:-translate-x-[2px] group-hover:scale-110" />

                  Login
                </Button>
              </Link>

              {/* CTA */}
              <Link href="/register">
                <Button className="group h-11 cursor-pointer rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)] transition-all duration-500 ease-out hover:-translate-y-[2px] hover:scale-[1.02] hover:bg-emerald-500 hover:shadow-[0_18px_40px_rgba(16,185,129,0.32)] dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:hover:shadow-[0_12px_35px_rgba(255,255,255,0.12)]">

                  <UserPlus className="mr-2 h-4 w-4 transition-all duration-500 group-hover:scale-110" />

                  Get Started

                  <ArrowRight className="ml-2 h-4 w-4 transition-all duration-500 group-hover:translate-x-[3px]" />
                </Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>

              <DropdownMenuTrigger asChild>
                <button className="group flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 shadow-sm transition-all duration-500 hover:-translate-y-[1px] hover:border-emerald-200 hover:shadow-[0_10px_30px_rgba(16,185,129,0.08)] dark:border-white/10 dark:bg-zinc-900 dark:hover:border-emerald-500/20 dark:hover:bg-zinc-800">

                  {/* AVATAR */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-[0_6px_18px_rgba(16,185,129,0.28)]">
                    N
                  </div>

                  {/* INFO */}
                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Nikhil
                    </p>
                  </div>

                  <ChevronDown className="h-4 w-4 text-slate-500 transition-all duration-500 group-data-[state=open]:rotate-180 dark:text-zinc-400" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[#111111]"
              >

                {/* PROFILE HEADER */}
                <div className="flex items-center gap-3 rounded-xl px-3 py-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-[0_6px_18px_rgba(16,185,129,0.28)]">
                    N
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Nikhil Singh
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      nikhil@gmail.com
                    </p>
                  </div>
                </div>

                <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/10" />

                {/* PROFILE */}
                <DropdownMenuItem className="mt-1 cursor-pointer rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition-all duration-300 focus:bg-emerald-50 focus:text-emerald-600 dark:text-zinc-300 dark:focus:bg-emerald-500/10 dark:focus:text-emerald-400">
                  <User className="mr-3 h-4 w-4" />

                  Manage Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/10" />

                {/* LOGOUT */}
                <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition-all duration-300 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-500/10">
                  <LogOut className="mr-3 h-4 w-4" />

                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* MOBILE NAV */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-500 hover:scale-[1.03] hover:bg-slate-100 hover:shadow-md dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800">
                <Menu className="transition-all duration-500 group-hover:scale-110" size={22} />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[88%] border-l border-slate-200 bg-white px-6 text-slate-900 dark:border-white/10 dark:bg-[#09090B] dark:text-white sm:w-[400px]"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>
                  Mobile Navigation Menu
                </SheetTitle>
              </SheetHeader>

              <div className="flex h-full flex-col">

                {/* MOBILE HEADER */}
                <div className="border-b border-slate-200 pb-6 pt-10 dark:border-white/10">

                  <div className="flex items-center gap-4">

                    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">

                      <div className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]" />

                      <BriefcaseBusiness className="h-5 w-5 text-slate-950 dark:text-white" />
                    </div>

                    <div>
                      <h1 className="text-2xl font-black tracking-[-1px] text-slate-950 dark:text-white">
                        Talent
                        <span className="ml-1 text-emerald-600">
                          Forge
                        </span>
                      </h1>

                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400 dark:text-zinc-500">
                        Future Of Hiring
                      </p>
                    </div>
                  </div>
                </div>

                {/* MOBILE LINKS */}
                <div className="mt-6 flex flex-col gap-2">
                  {navLinks.map((item) => {
                    const Icon = item.icon

                    const active =
                      pathname === item.href

                    return (
                      <button
                        key={item.name}
                        onClick={() =>
                          handleNavigation(item.href)
                        }
                        className={`group flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-4 text-left text-base font-semibold transition-all duration-500 ${
                          active
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "text-slate-700 hover:bg-emerald-50/80 hover:text-emerald-600 dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-white"
                        }`}
                      >
                        <Icon className="h-[18px] w-[18px] opacity-90 transition-all duration-500 group-hover:scale-110" />

                        {item.name}
                      </button>
                    )
                  })}
                </div>

                {/* MOBILE ACTIONS */}
                <div className="mt-auto border-t border-slate-200 pt-6 dark:border-white/10">

                  {!isAuthenticated ? (
                    <div className="flex flex-col gap-4 pb-6">

                      {/* THEME TOGGLE */}
                      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-zinc-900">

                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                            Appearance
                          </h3>

                          <p className="text-xs text-slate-500 dark:text-zinc-400">
                            Switch between light & dark
                          </p>
                        </div>

                        <ThemeToggle />
                      </div>

                      {/* LOGIN */}
                      <Button
                        onClick={() =>
                          handleNavigation("/login")
                        }
                        variant="ghost"
                        className="group h-12 w-full cursor-pointer rounded-full border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-500 hover:-translate-y-[1px] hover:border-emerald-200 hover:bg-white hover:text-emerald-600 hover:shadow-[0_10px_25px_rgba(16,185,129,0.08)] dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:hover:border-emerald-500/20 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                      >
                        <LogIn className="mr-2 h-4 w-4 transition-all duration-500 group-hover:-translate-x-[2px] group-hover:scale-110" />

                        Login
                      </Button>

                      {/* REGISTER */}
                      <Button
                        onClick={() =>
                          handleNavigation("/register")
                        }
                        className="group h-12 w-full cursor-pointer rounded-full bg-emerald-600 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)] transition-all duration-500 hover:-translate-y-[2px] hover:bg-emerald-500 hover:shadow-[0_18px_40px_rgba(16,185,129,0.32)] dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                      >
                        <UserPlus className="mr-2 h-4 w-4 transition-all duration-500 group-hover:scale-110" />

                        Get Started
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 pb-6">

                      {/* PROFILE CARD */}
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-zinc-900">

                        <div className="flex items-center gap-3">

                          {/* AVATAR */}
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow-[0_6px_18px_rgba(16,185,129,0.28)]">
                            N
                          </div>

                          {/* USER INFO */}
                          <div>
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                              Nikhil Singh
                            </h3>

                            <p className="text-xs text-slate-500 dark:text-zinc-400">
                              nikhil@gmail.com
                            </p>
                          </div>
                        </div>

                        {/* PROFILE BUTTON */}
                        <div className="mt-5">

                          <Button
                            onClick={() =>
                              handleNavigation("/profile")
                            }
                            variant="ghost"
                            className="h-11 w-full justify-start rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 transition-all duration-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 dark:border-white/10 dark:bg-[#111111] dark:text-white dark:hover:border-emerald-500/20 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                          >
                            <User className="mr-3 h-4 w-4" />

                            Manage Profile
                          </Button>
                        </div>
                      </div>

                      {/* THEME TOGGLE */}
                      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-zinc-900">

                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                            Appearance
                          </h3>

                          <p className="text-xs text-slate-500 dark:text-zinc-400">
                            Switch between light & dark
                          </p>
                        </div>

                        <ThemeToggle />
                      </div>

                      {/* LOGOUT */}
                      <Button
                        variant="ghost"
                        className="group h-12 w-full cursor-pointer rounded-2xl border border-red-100 bg-red-50 text-sm font-semibold text-red-600 transition-all duration-500 hover:-translate-y-[1px] hover:bg-red-100 hover:text-red-700 dark:border-red-500/10 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                      >
                        <LogOut className="mr-2 h-4 w-4 transition-all duration-500 group-hover:-translate-x-[2px]" />

                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Navbar