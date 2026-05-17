"use client"

import {
  useMemo,
  useState,
} from "react"

import {
  Building2,
  Plus,
  Search,
  Sparkles,
  Globe,
  Layers3,
} from "lucide-react"

import AppBackground from "@/components/shared/app-background"

import {
  Button,
} from "@/components/ui/button"

import CompanyGrid from "./company-grid"
import CompanyForm from "./company-form"
import CompanyEmpty from "./company-empty"
import CompanySkeleton from "./company-skeleton"
import CompanyDeleteModal from "./company-delete-modal"

import {
  useCompanies,
} from "../hooks/use-companies"

import {
  useCreateCompany,
} from "../hooks/use-create-company"

import {
  useDeleteCompany,
} from "../hooks/use-delete-company"

import {
  filterCompaniesByName,
  sortCompanies,
} from "../utils/company.utils"

export default function CompaniesPageView() {

  const [query,
    setQuery] =
    useState("")

  const [showCreate,
    setShowCreate] =
    useState(false)

  const [selectedDelete,
    setSelectedDelete] =
    useState<{
      id: number
      name: string
    } | null>(null)

  const {
    data: companies,
    isLoading,
  } = useCompanies()

  const createMutation =
    useCreateCompany()

  const deleteMutation =
    useDeleteCompany()

  const filteredCompanies =
    useMemo(() => {

      if (!companies) {
        return []
      }

      return sortCompanies(
        filterCompaniesByName(
          companies,
          query,
        ),
      )

    }, [
      companies,
      query,
    ])

  const totalCompanies =
    companies?.length || 0

  const logoCompanies =
    companies?.filter(
      (company) =>
        company.logo
    ).length || 0

  return (

    <AppBackground>

      <section className="relative min-h-screen overflow-hidden">

        {/* BG */}

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/[0.05] blur-3xl" />

          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/[0.04] blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 lg:px-8">

          {/* HERO */}

          <div className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white/80 shadow-[0_25px_80px_rgba(15,23,42,0.07)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#111111]/80">

            {/* BG */}

            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-cyan-500/[0.04]" />

            <div className="relative z-10 p-7 lg:p-8">

              <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

                {/* LEFT */}

                <div className="max-w-3xl">

                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400">

                    <Sparkles className="h-3.5 w-3.5" />

                    Recruiter Workspace
                  </div>

                  <h1 className="mt-5 text-4xl font-black tracking-[-2.5px] text-slate-950 dark:text-white lg:text-5xl">

                    Company Management
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-zinc-400">

                    Build your recruiter presence, organize organizations,
                    manage hiring brands, and streamline your recruitment ecosystem.
                  </p>

                  {/* STATS */}

                  <div className="mt-7 grid gap-4 sm:grid-cols-3">

                    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

                          <Building2 className="h-5 w-5" />
                        </div>

                        <div>

                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-zinc-500">

                            Total Companies
                          </p>

                          <h3 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">

                            {totalCompanies}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">

                          <Globe className="h-5 w-5" />
                        </div>

                        <div>

                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-zinc-500">

                            Logos Uploaded
                          </p>

                          <h3 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">

                            {logoCompanies}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">

                          <Layers3 className="h-5 w-5" />
                        </div>

                        <div>

                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-zinc-500">

                            Active Workspace
                          </p>

                          <h3 className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">

                            Live
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="flex flex-col gap-4 xl:w-[340px]">

                  <div className="rounded-[28px] border border-slate-200 bg-white/70 p-5 dark:border-white/10 dark:bg-white/[0.03]">

                    <h3 className="text-lg font-black tracking-[-0.7px] text-slate-950 dark:text-white">

                      Quick Actions
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-zinc-400">

                      Create and manage organizations from a centralized recruiter workspace.
                    </p>

                    <Button
                      onClick={() =>
                        setShowCreate(
                          !showCreate
                        )
                      }
                      className="mt-5 h-12 w-full rounded-2xl bg-emerald-500 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600"
                    >

                      <Plus className="mr-2 h-4 w-4" />

                      {
                        showCreate
                          ? "Close Form"
                          : "Create Company"
                      }
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}

          {
            showCreate && (

              <div className="mt-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-[#111111]">

                <div className="border-b border-slate-100 px-6 py-5 dark:border-white/[0.06]">

                  <h2 className="text-xl font-black tracking-[-1px] text-slate-950 dark:text-white">

                    Register Company
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">

                    Add organization details, upload a logo,
                    and establish your recruiter presence.
                  </p>
                </div>

                <CompanyForm
                  isSubmitting={
                    createMutation.isPending
                  }
                  onClose={() =>
                    setShowCreate(
                      false
                    )
                  }
                  onSubmit={(
                    values
                  ) => {

                    createMutation.mutate(
                      values,
                      {
                        onSuccess:
                          () => {

                            setShowCreate(
                              false
                            )
                          },
                      },
                    )
                  }}
                />
              </div>
            )
          }

          {/* WORKSPACE BAR */}

          <div className="mt-8 rounded-[28px] border border-slate-200 bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/80">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              {/* SEARCH */}

              <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">

                <div className="relative flex-1">

                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    value={query}
                    onChange={(e) =>
                      setQuery(
                        e.target.value
                      )
                    }
                    placeholder="Search companies, brands, or domains..."
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/80 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-white/[0.05]"
                  />
                </div>

                <button className="flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.05]">

                  <Building2 className="h-4 w-4 text-emerald-500" />

                  All Companies
                </button>
              </div>

              {/* RIGHT */}

              <div className="flex items-center gap-3">

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.03]">

                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-zinc-500">

                    Visible Results
                  </p>

                  <h3 className="mt-1 text-lg font-black text-slate-950 dark:text-white">

                    {
                      filteredCompanies.length
                    }
                  </h3>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.03]">

                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-zinc-500">

                    Active Logos
                  </p>

                  <h3 className="mt-1 text-lg font-black text-emerald-600 dark:text-emerald-400">

                    {
                      filteredCompanies.filter(
                        (c) => c.logo
                      ).length
                    }
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* LOADING */}

          {
            isLoading && (

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {
                  Array.from({
                    length: 6,
                  }).map(
                    (
                      _,
                      index
                    ) => (

                      <CompanySkeleton
                        key={index}
                      />
                    )
                  )
                }
              </div>
            )
          }

          {/* EMPTY */}

          {
            !isLoading &&
            filteredCompanies.length === 0 && (

              <div className="mt-10">

                <CompanyEmpty
                  onCreate={() =>
                    setShowCreate(
                      true
                    )
                  }
                />
              </div>
            )
          }

          {/* GRID */}

          {
            !isLoading &&
            filteredCompanies.length > 0 && (

              <div className="mt-8">

                <CompanyGrid
                  companies={
                    filteredCompanies
                  }
                  onDelete={(
                    companyId
                  ) => {

                    const company =
                      companies?.find(
                        (
                          item: { company_id: number }
                        ) =>

                          item.company_id ===
                          companyId
                      )

                    if (!company) {
                      return
                    }

                    setSelectedDelete({
                      id: companyId,
                      name:
                        company.name,
                    })
                  }}
                />
              </div>
            )
          }
        </div>

        {/* DELETE */}

        <CompanyDeleteModal
          open={
            !!selectedDelete
          }
          companyName={
            selectedDelete?.name
          }
          isDeleting={
            deleteMutation.isPending
          }
          onClose={() =>
            setSelectedDelete(
              null
            )
          }
          onConfirm={() => {

            if (
              !selectedDelete
            ) {
              return
            }

            deleteMutation.mutate(
              {
                companyId:
                  selectedDelete.id,
              },
              {
                onSuccess:
                  () => {

                    setSelectedDelete(
                      null
                    )
                  },
              },
            )
          }}
        />
      </section>
    </AppBackground>
  )
}