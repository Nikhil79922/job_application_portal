"use client"

import Link from "next/link"

import {
  usePathname,
  useRouter,
} from "next/navigation"

import {
  useState,
} from "react"

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
  Search,
  SearchCheck,
  User,
  UserPlus,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/models/dropdown-menu"

import ThemeToggle from "@/components/shared/theme-toggle"

import {
  useAuthStore,
} from "@/stores/auth.store"

import {
  useLogout,
} from "@/features/auth/hooks/use-logout"

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
    name: "About",
    href: "/about",
    icon: CircleHelp,
  },
]

const Navbar = () => {

  const pathname =
    usePathname()

  const router =
    useRouter()

  const [open, setOpen] =
    useState(false)

  const {
    user,
    isAuthenticated,
  } = useAuthStore()

  const {
    mutate: logoutUser,
  } = useLogout()

  const handleNavigation = (
    href: string
  ) => {

    setOpen(false)

    setTimeout(() => {

      router.push(href)

    }, 220)
  }

  const handleLogout = () => {

    logoutUser()

    setOpen(false)
  }

  return (

    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/92 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-2xl transition-all duration-500 dark:border-white/10 dark:bg-[#09090B]/85 dark:shadow-none">

        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">

          {/* LOGO */}
          <Link
            href="/"
            className="group flex items-center gap-4"
          >

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 ease-out group-hover:-translate-y-[2px] group-hover:scale-[1.03] group-hover:border-emerald-200 group-hover:shadow-[0_12px_30px_rgba(16,185,129,0.12)] dark:border-white/10 dark:bg-zinc-900 dark:group-hover:border-emerald-500/20 dark:group-hover:shadow-[0_10px_30px_rgba(16,185,129,0.08)]">

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]" />

              <BriefcaseBusiness className="h-5 w-5 text-slate-950 transition-all duration-500 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400" />
            </div>

            <div className="leading-none">

              <h1 className="text-[28px] font-black tracking-[-1.5px] text-slate-950 dark:text-white">

                Talent

                <span className="ml-1 text-emerald-600">
                  Forge
                </span>
              </h1>

              <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400 dark:text-zinc-500">
                Future Of Hiring
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-2 lg:flex">

            {navLinks.map((item) => {

              const Icon = item.icon

              const active =
                pathname === item.href

              return (

                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-500 ${active
                      ? "bg-emerald-100 text-emerald-700 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "text-slate-700 hover:bg-emerald-50/80 hover:text-emerald-600 dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-white"
                    }`}
                >

                  <Icon className="relative z-10 h-[18px] w-[18px]" />

                  <span className="relative z-10">
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-3 lg:flex">

            <ThemeToggle />

            {!isAuthenticated ? (

              <>
                <Link href="/login">

                  <Button
                    variant="ghost"
                    className="h-11 rounded-full border border-slate-200 bg-slate-50 px-6 text-sm font-semibold dark:border-white/10 dark:bg-zinc-900"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>

                <Link href="/register">

                  <Button className="h-11 rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)] hover:bg-emerald-500">

                    <UserPlus className="mr-2 h-4 w-4" />

                    Get Started

                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>

            ) : (

              <DropdownMenu>

                <DropdownMenuTrigger asChild>

                  <Button
                    type="button"
                    variant="outline"
                    className="group h-auto rounded-full border-slate-200 bg-white py-1.5 pl-1.5 pr-3 shadow-sm dark:border-white/10 dark:bg-zinc-900"
                  >

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">

                      {user?.name?.charAt(0)}
                    </div>

                    <div className="hidden text-left sm:block">

                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {user?.name}
                      </p>
                    </div>

                    <ChevronDown className="h-4 w-4 text-slate-500 dark:text-zinc-400" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[#111111]"
                >

                  <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-3"
                    onClick={() =>
                      handleNavigation("/profile")
                    }
                  >

                    <User className="mr-3 h-4 w-4" />

                    Manage Profile
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer rounded-xl px-3 py-3 text-red-500"
                  >

                    <LogOut className="mr-3 h-4 w-4" />

                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex items-center gap-3 lg:hidden">

            <ThemeToggle />

            <Button
              size="icon"
              variant="outline"
              onClick={() => setOpen(!open)}
              className="h-11 w-11 rounded-2xl border-slate-200 bg-white dark:border-white/10 dark:bg-zinc-900"
            >

              {open ? (
                <X className="h-5 w-5 shrink-0" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${open
          ? "pointer-events-auto visible"
          : "pointer-events-none invisible"
        }`}>

        {/* OVERLAY */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${open
              ? "opacity-100"
              : "opacity-0"
            }`}
        />

        {/* DRAWER */}
        <div className={`absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col border-l border-white/10 bg-white/95 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-500 dark:bg-[#09090B]/95 ${open
            ? "translate-x-0"
            : "translate-x-full"
          }`}>

          {/* NAVIGATION */}
          <div className="mt-24 flex flex-col gap-3">

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
                  className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-left text-sm font-semibold transition-all duration-300 ${active
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                    }`}
                >

                  <Icon className="h-5 w-5" />

                  {item.name}
                </button>
              )
            })}
          </div>

          {/* AUTH */}
          <div className="mt-auto flex flex-col gap-3">

            {!isAuthenticated ? (

              <>
                <Button
                  onClick={() =>
                    handleNavigation("/login")
                  }
                  variant="outline"
                  className="h-12 rounded-2xl border-border/60 bg-background/60 text-sm font-semibold backdrop-blur-xl"
                >

                  <LogIn className="mr-2 h-4 w-4" />

                  Login
                </Button>

                <Button
                  onClick={() =>
                    handleNavigation("/register")
                  }
                  className="h-12 rounded-2xl bg-emerald-600 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)] transition-all duration-300 hover:bg-emerald-500"
                >

                  <UserPlus className="mr-2 h-4 w-4" />

                  Get Started
                </Button>
              </>

            ) : (

              <>
                {/* USER CARD */}

                <div className="rounded-[28px] border border-border/60 bg-card/70 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl">

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white shadow-[0_10px_25px_rgba(16,185,129,0.28)]">

                      {user?.name?.charAt(0)}
                    </div>

                    <div className="min-w-0 flex-1">

                      <h3 className="truncate text-sm font-semibold text-foreground">
                        {user?.name}
                      </h3>

                      <p className="truncate text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() =>
                      handleNavigation("/profile")
                    }
                    className="mt-4 h-11 w-full rounded-2xl border-border/60 bg-background/60 text-sm font-semibold backdrop-blur-xl transition-all duration-300 hover:bg-background"
                  >

                    <User className="mr-2 h-4 w-4" />

                    Manage Profile
                  </Button>
                </div>

                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="h-12 rounded-2xl text-sm font-semibold"
                >

                  <LogOut className="mr-2 h-4 w-4" />

                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar