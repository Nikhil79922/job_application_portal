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
  Briefcase,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  CircleHelp,
  FileText,
  Home,
  LogIn,
  LogOut,
  Menu,
  SearchCheck,
  User,
  UserPlus,
  Users,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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

/* ────────────────────────────────────────────────────────────────────────── */
/* JOBSEEKER */
/* ────────────────────────────────────────────────────────────────────────── */

const jobseekerDropdownLinks = [
  {
    name: "Applied Jobs",
    href: "/applications",
    icon: FileText,
  },
]

/* ────────────────────────────────────────────────────────────────────────── */
/* RECRUITER */
/* ────────────────────────────────────────────────────────────────────────── */

const recruiterDropdownLinks = [
  {
    name: "My Companies",
    href: "/recruiter/companies",
    icon: Building2,
  },
  {
    name: "My Jobs",
    href: "/recruiter/jobs",
    icon: Briefcase,
  },
  {
    name: "Applicants",
    href: "/recruiter/applicants",
    icon: Users,
  },
]

const Navbar = () => {

  const pathname =
    usePathname()

  const router =
    useRouter()

  const [
    open,
    setOpen,
  ] = useState(false)

  const {
    user,
    isAuthenticated,
  } = useAuthStore()

  const {
    mutate: logoutUser,
  } = useLogout()

  /* ROLE */

  const isRecruiter =
    user?.role === "recruiter"

  /* NAVIGATION LINKS */

  const baseNavLinks = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },

    {
      name:
        isRecruiter
          ? "Companies"
          : "Find Jobs",

      href:
        isRecruiter
          ? "/recruiter/companies"
          : "/jobs",

      icon:
        isRecruiter
          ? Building2
          : SearchCheck,
    },

    {
      name: "About",
      href: "/about",
      icon: CircleHelp,
    },
  ]

  /* NAVIGATION */

  const handleNavigation = (
    href: string
  ) => {

    setOpen(false)

    setTimeout(() => {

      router.push(href)

    }, 220)
  }

  /* LOGOUT */

  const handleLogout = () => {

    logoutUser()

    setOpen(false)
  }

  return (

    <>
      {/* HEADER */}

      <header
        className="
          sticky top-0 z-50 w-full
          border-b border-slate-200/80
          bg-white/92
          shadow-[0_8px_30px_rgba(15,23,42,0.04)]
          backdrop-blur-2xl
          transition-all duration-500
          dark:border-white/10
          dark:bg-[#09090B]/85
          dark:shadow-none
        "
      >

        <div
          className="
            mx-auto flex h-24
            max-w-7xl items-center
            justify-between
            px-4 md:px-6 lg:px-8
          "
        >

          {/* LOGO */}

          <Link
            href="/"
            className="
              group flex items-center gap-4
            "
          >

            <div
              className="
                relative flex h-12 w-12
                items-center justify-center
                rounded-2xl border
                border-slate-200 bg-white
                shadow-sm transition-all
                duration-500 ease-out
                group-hover:-translate-y-[2px]
                group-hover:scale-[1.03]
                group-hover:border-emerald-200
                group-hover:shadow-[0_12px_30px_rgba(16,185,129,0.12)]
                dark:border-white/10
                dark:bg-zinc-900
                dark:group-hover:border-emerald-500/20
              "
            >

              <div
                className="
                  absolute inset-0 rounded-2xl
                  bg-gradient-to-br
                  from-emerald-500/[0.03]
                  to-transparent opacity-0
                  transition-opacity duration-500
                  group-hover:opacity-100
                "
              />

              <div
                className="
                  absolute right-1.5 top-1.5
                  h-2 w-2 rounded-full
                  bg-emerald-500
                  shadow-[0_0_10px_rgba(16,185,129,0.6)]
                "
              />

              <BriefcaseBusiness
                className="
                  h-5 w-5 text-slate-950
                  transition-all duration-500
                  group-hover:text-emerald-600
                  dark:text-white
                  dark:group-hover:text-emerald-400
                "
              />
            </div>

            <div className="leading-none">

              <h1
                className="
                  text-[28px] font-black
                  tracking-[-1.5px]
                  text-slate-950
                  dark:text-white
                "
              >
                Talent
                <span
                  className="
                    ml-1 text-emerald-600
                  "
                >
                  Forge
                </span>
              </h1>

              <p
                className="
                  mt-1.5 text-[11px]
                  font-semibold uppercase
                  tracking-[0.35em]
                  text-slate-400
                  dark:text-zinc-500
                "
              >
                Future Of Hiring
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}

          <nav
            className="
              hidden items-center
              gap-1 lg:flex
            "
          >

            {
              baseNavLinks.map((item) => {

                const Icon =
                  item.icon

                const active =
                  pathname === item.href

                return (

                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group relative flex
                      items-center gap-2
                      overflow-hidden rounded-full
                      px-5 py-2.5
                      text-sm font-semibold
                      transition-all duration-500
                      ${
                        active
                          ? "bg-emerald-100 text-emerald-700 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "text-slate-700 hover:bg-emerald-50/80 hover:text-emerald-600 dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-white"
                      }
                    `}
                  >

                    <Icon
                      className="
                        relative z-10
                        h-[18px] w-[18px]
                      "
                    />

                    <span
                      className="
                        relative z-10
                      "
                    >
                      {item.name}
                    </span>
                  </Link>
                )
              })
            }
          </nav>

          {/* DESKTOP ACTIONS */}

          <div
            className="
              hidden items-center
              gap-3 lg:flex
            "
          >

            <ThemeToggle />

            {
              !isAuthenticated ? (
                <>
                  <Link href="/login">

                    <Button
                      variant="ghost"
                      className="
                        h-11 rounded-full
                        border border-slate-200
                        bg-slate-50 px-6
                        text-sm font-semibold
                        dark:border-white/10
                        dark:bg-zinc-900
                      "
                    >

                      <LogIn className="mr-2 h-4 w-4" />

                      Login
                    </Button>
                  </Link>

                  <Link href="/register">

                    <Button
                      className="
                        h-11 rounded-full
                        bg-emerald-600 px-6
                        text-sm font-semibold
                        text-white
                        shadow-[0_10px_30px_rgba(16,185,129,0.25)]
                        hover:bg-emerald-500
                      "
                    >

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
                      className="
                        group h-auto rounded-full
                        border-slate-200 bg-white
                        py-1.5 pl-1.5 pr-3
                        shadow-sm
                        dark:border-white/10
                        dark:bg-zinc-900
                      "
                    >

                      {/* AVATAR */}

                      <div
                        className={`
                          relative flex h-9 w-9
                          items-center justify-center
                          rounded-full text-sm
                          font-bold text-white
                          ${
                            isRecruiter
                              ? "bg-violet-600"
                              : "bg-emerald-600"
                          }
                        `}
                      >

                        {user?.name?.charAt(0)}

                        <span
                          className="
                            absolute -bottom-0.5
                            -right-0.5 flex h-3 w-3
                            items-center justify-center
                            rounded-full border-2
                            border-white
                            dark:border-zinc-900
                          "
                        >

                          <span
                            className="
                              h-1.5 w-1.5
                              rounded-full
                              bg-emerald-500
                            "
                          />
                        </span>
                      </div>

                      <div
                        className="
                          hidden text-left
                          sm:block
                        "
                      >

                        <p
                          className="
                            text-sm font-semibold
                            leading-none
                            text-slate-900
                            dark:text-white
                          "
                        >
                          {user?.name}
                        </p>

                        <span
                          className={`
                            mt-1 inline-block
                            rounded-full px-1.5
                            py-0.5 text-[9px]
                            font-bold uppercase
                            tracking-wider
                            ${
                              isRecruiter
                                ? "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
                                : "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                            }
                          `}
                        >
                          {
                            isRecruiter
                              ? "Recruiter"
                              : "Jobseeker"
                          }
                        </span>
                      </div>

                      <ChevronDown
                        className="
                          h-4 w-4 text-slate-500
                          transition-transform duration-300
                          group-data-[state=open]:rotate-180
                          dark:text-zinc-400
                        "
                      />
                    </Button>
                  </DropdownMenuTrigger>

                  {/* DROPDOWN */}

                  <DropdownMenuContent
                    align="end"
                    className="
                      mt-3 w-72 rounded-2xl
                      border border-slate-200
                      bg-white p-2
                      shadow-[0_20px_60px_rgba(15,23,42,0.12)]
                      dark:border-white/10
                      dark:bg-[#111111]
                    "
                  >

                    {/* USER CARD */}

                    <div
                      className="
                        mb-1 rounded-xl
                        bg-slate-50 p-3
                        dark:bg-white/[0.03]
                      "
                    >

                      <div
                        className="
                          flex items-center gap-3
                        "
                      >

                        <div
                          className={`
                            flex h-10 w-10
                            shrink-0 items-center
                            justify-center rounded-2xl
                            text-sm font-bold
                            text-white
                            ${
                              isRecruiter
                                ? "bg-violet-600"
                                : "bg-emerald-600"
                            }
                          `}
                        >
                          {user?.name?.charAt(0)}
                        </div>

                        <div className="min-w-0">

                          <p
                            className="
                              truncate text-sm
                              font-bold text-slate-900
                              dark:text-white
                            "
                          >
                            {user?.name}
                          </p>

                          <p
                            className="
                              truncate text-[11px]
                              text-slate-500
                              dark:text-zinc-500
                            "
                          >
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* PROFILE */}

                    <DropdownMenuItem
                      className="
                        cursor-pointer rounded-xl
                        px-3 py-2.5 text-sm
                        font-semibold
                      "
                      onClick={() =>
                        handleNavigation("/profile")
                      }
                    >

                      <User className="mr-3 h-4 w-4" />

                      Manage Profile
                    </DropdownMenuItem>

                    {/* JOBSEEKER */}

                    {
                      !isRecruiter && (
                        <>
                          <DropdownMenuSeparator className="my-1" />

                          <DropdownMenuLabel
                            className="
                              px-3 py-1.5 text-[10px]
                              font-bold uppercase
                              tracking-[0.15em]
                              text-slate-400
                              dark:text-zinc-600
                            "
                          >
                            Jobseeker Tools
                          </DropdownMenuLabel>

                          {
                            jobseekerDropdownLinks.map((item) => {

                              const Icon =
                                item.icon

                              const active =
                                pathname.startsWith(item.href)

                              return (

                                <DropdownMenuItem
                                  key={item.name}
                                  onClick={() =>
                                    handleNavigation(item.href)
                                  }
                                  className={`
                                    cursor-pointer rounded-xl
                                    px-3 py-2.5 text-sm
                                    font-semibold transition-all
                                    ${
                                      active
                                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                        : "text-slate-700 dark:text-zinc-300"
                                    }
                                  `}
                                >

                                  <Icon
                                    className="
                                      mr-3 h-4 w-4
                                      shrink-0
                                    "
                                  />

                                  {item.name}
                                </DropdownMenuItem>
                              )
                            })
                          }
                        </>
                      )
                    }

                    {/* RECRUITER */}

                    {
                      isRecruiter && (
                        <>
                          <DropdownMenuSeparator className="my-1" />

                          <DropdownMenuLabel
                            className="
                              px-3 py-1.5 text-[10px]
                              font-bold uppercase
                              tracking-[0.15em]
                              text-slate-400
                              dark:text-zinc-600
                            "
                          >
                            Recruiter Tools
                          </DropdownMenuLabel>

                          {
                            recruiterDropdownLinks.map((item) => {

                              const Icon =
                                item.icon

                              const active =
                                pathname.startsWith(item.href)

                              return (

                                <DropdownMenuItem
                                  key={item.name}
                                  onClick={() =>
                                    handleNavigation(item.href)
                                  }
                                  className={`
                                    cursor-pointer rounded-xl
                                    px-3 py-2.5 text-sm
                                    font-semibold transition-all
                                    ${
                                      active
                                        ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                                        : "text-slate-700 dark:text-zinc-300"
                                    }
                                  `}
                                >

                                  <Icon
                                    className="
                                      mr-3 h-4 w-4
                                      shrink-0
                                    "
                                  />

                                  {item.name}
                                </DropdownMenuItem>
                              )
                            })
                          }
                        </>
                      )
                    }

                    <DropdownMenuSeparator className="my-1" />

                    {/* LOGOUT */}

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="
                        cursor-pointer rounded-xl
                        px-3 py-2.5 text-sm
                        font-semibold text-red-500
                        focus:text-red-500
                      "
                    >

                      <LogOut className="mr-3 h-4 w-4" />

                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }
          </div>

          {/* MOBILE BUTTON */}

          <div
            className="
              flex items-center
              gap-3 lg:hidden
            "
          >

            <ThemeToggle />

            <Button
              size="icon"
              variant="outline"
              onClick={() =>
                setOpen(!open)
              }
              className="
                h-11 w-11 rounded-2xl
                border-slate-200 bg-white
                dark:border-white/10
                dark:bg-zinc-900
              "
            >

              {
                open
                  ? <X className="h-5 w-5 shrink-0" />
                  : <Menu className="h-5 w-5" />
              }
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar