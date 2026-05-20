"use client"

import Link from "next/link"

import {
  useAuthStore,
} from "@/stores/auth.store"

export default function FuturisticFooter() {

  const {
    user,
  } = useAuthStore()

  const isRecruiter =
    user?.role === "recruiter"

  const footerLinks = [
    {
      name: "Home",
      href: "/",
    },

    {
      name:
        isRecruiter
          ? "Companies"
          : "Jobs",

      href:
        isRecruiter
          ? "/recruiter/companies"
          : "/jobs",
    },

    {
      name: "About",
      href: "/about",
    },
  ]

  return (

    <footer
      className="
        relative w-full overflow-hidden
        border-t border-slate-200/80
        bg-white/92
        shadow-[0_8px_30px_rgba(15,23,42,0.04)]
        backdrop-blur-2xl
        transition-all duration-500
        dark:border-white/10
        dark:bg-[#09090B]
        dark:shadow-none
      "
    >

      {/* SUBTLE GREEN GLOW */}

      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.05),transparent_45%)]
          dark:bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.06),transparent_45%)]
        "
      />

      <div
        className="
          relative z-10 mx-auto
          max-w-7xl px-4 py-4
          md:px-6 lg:px-8
        "
      >

        <div
          className="
            flex flex-col gap-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* LEFT SECTION */}

          <div
            className="
              flex items-start gap-3
            "
          >

            {/* LOGO */}

            <div
              className="
                group relative flex
                h-10 w-10 items-center
                justify-center rounded-xl
                border border-slate-200
                bg-white shadow-sm
                transition-all duration-500
                dark:border-white/10
                dark:bg-zinc-900
              "
            >

              {/* GLOW */}

              <div
                className="
                  absolute inset-0 rounded-xl
                  bg-gradient-to-br
                  from-emerald-500/[0.05]
                  to-transparent opacity-0
                  transition-opacity duration-500
                  group-hover:opacity-100
                "
              />

              {/* STATUS DOT */}

              <div
                className="
                  absolute right-1 top-1
                  h-1.5 w-1.5 rounded-full
                  bg-emerald-500
                  shadow-[0_0_10px_rgba(16,185,129,0.7)]
                "
              />

              <span
                className="
                  text-[11px] font-black
                  tracking-wide
                  text-slate-950
                  dark:text-white
                "
              >
                TF
              </span>
            </div>

            {/* TEXT */}

            <div>

              <h2
                className="
                  text-[20px]
                  font-black tracking-[-1px]
                  leading-none
                  text-slate-950
                  dark:text-white
                "
              >
                Talent

                <span
                  className="
                    ml-1 text-emerald-600
                    dark:text-emerald-500
                  "
                >
                  Forge
                </span>
              </h2>

              <p
                className="
                  mt-1 text-[9px]
                  font-semibold uppercase
                  tracking-[0.24em]
                  text-slate-400
                  dark:text-zinc-500
                "
              >
                Future Of Hiring
              </p>

              <p
                className="
                  mt-2 max-w-md text-xs
                  leading-5 text-slate-500
                  dark:text-zinc-400
                "
              >
                Building modern hiring experiences
                for candidates and companies through
                intelligent recruitment workflows.
              </p>
            </div>
          </div>

          {/* RIGHT SECTION */}

          <div
            className="
              flex flex-col items-start
              gap-3 lg:items-end
            "
          >

            {/* LINKS */}

            <div
              className="
                flex flex-wrap
                items-center gap-2
              "
            >

              {
                footerLinks.map((item, index) => (

                  <Link
                    key={index}
                    href={item.href}
                    className="
                      group rounded-full
                      border border-slate-200
                      bg-white px-3 py-1
                      text-[11px] font-semibold
                      text-slate-600 shadow-sm
                      transition-all duration-500
                      hover:-translate-y-[1px]
                      hover:border-emerald-200
                      hover:text-emerald-600
                      dark:border-white/10
                      dark:bg-zinc-900
                      dark:text-zinc-300
                      dark:hover:border-emerald-500/20
                      dark:hover:bg-emerald-500/10
                      dark:hover:text-emerald-400
                    "
                  >

                    <span
                      className="
                        transition-all duration-500
                        group-hover:tracking-[0.02em]
                      "
                    >
                      {item.name}
                    </span>
                  </Link>
                ))
              }
            </div>

            {/* COPYRIGHT */}

            <div
              className="
                flex flex-col
                items-start gap-0.5
                text-[10px]
                text-slate-400
                dark:text-zinc-500
                lg:items-end
              "
            >

              <p className="font-medium">
                © 2026 Talent Forge.
                All rights reserved.
              </p>

              <p>
                Designed for the next generation
                hiring ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}