import { MapPin, Pencil, Users } from "lucide-react"
import { CompanyJob } from "../../companies/types/company.types"

export function JobCard({
    job,
    onEdit,
  }: {
    job: CompanyJob
    onEdit: (
      job: CompanyJob
    ) => void
  }) {
  
    return (
  
      <div
        className="
          group relative
          overflow-hidden
          rounded-[28px]
          border border-slate-200
          bg-white/80
          backdrop-blur-md
          transition-all duration-300
          hover:-translate-y-1
          hover:border-emerald-500/20
          hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]
          dark:border-white/10
          dark:bg-white/[0.03]
          dark:hover:bg-white/[0.05]
          dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]
        "
      >
  
        <div
          className="
            absolute inset-x-0 top-0
            h-[1px]
            bg-gradient-to-r
            from-transparent
            via-emerald-400/0
            to-transparent
            transition-all duration-300
            group-hover:via-emerald-400/50
          "
        />
  
        <div
          className="
            p-6
          "
        >
  
          {/* HEADER */}
  
          <div
            className="
              flex items-start
              justify-between gap-3
            "
          >
  
            <div
              className="
                min-w-0
              "
            >
  
              <h3
                className="
                  truncate text-xl
                  font-black
                  tracking-[-0.06em]
                  text-slate-900
                  dark:text-white
                "
              >
                {job.title}
              </h3>
  
              <p
                className="
                  mt-1 text-sm
                  font-medium
                  text-slate-500
                  dark:text-zinc-500
                "
              >
                {job.role}
              </p>
            </div>
  
            <span
              className={`
                shrink-0 rounded-full
                px-3 py-1
                text-[10px]
                font-bold uppercase
                tracking-[0.14em]
  
                ${
                  job.is_active
                    ? `
                      border border-emerald-500/20
                      bg-emerald-500/10
                      text-emerald-600
                      dark:text-emerald-400
                    `
                    : `
                      border border-red-500/15
                      bg-red-500/10
                      text-red-500
                    `
                }
              `}
            >
  
              {
                job.is_active
                  ? "Active"
                  : "Inactive"
              }
            </span>
          </div>
  
          {/* DESC */}
  
          <p
            className="
              mt-4 line-clamp-3
              text-sm leading-7
              text-slate-600
              dark:text-zinc-400
            "
          >
            {job.description}
          </p>
  
          {/* BADGES */}
  
          <div
            className="
              mt-5 flex flex-wrap gap-2
            "
          >
  
            <span
              className="
                rounded-full
                border border-emerald-200
                bg-emerald-50
                px-3 py-1
                text-xs font-semibold
                text-emerald-700
                dark:border-emerald-500/20
                dark:bg-emerald-500/10
                dark:text-emerald-400
              "
            >
              {job.job_type}
            </span>
  
            <span
              className="
                rounded-full
                border border-cyan-200
                bg-cyan-50
                px-3 py-1
                text-xs font-semibold
                text-cyan-700
                dark:border-cyan-500/20
                dark:bg-cyan-500/10
                dark:text-cyan-400
              "
            >
              {job.work_location}
            </span>
  
            <span
              className="
                flex items-center
                gap-1.5 rounded-full
                border border-slate-200
                bg-slate-100
                px-3 py-1
                text-xs font-semibold
                text-slate-600
                dark:border-white/10
                dark:bg-white/[0.03]
                dark:text-zinc-400
              "
            >
  
              <MapPin
                className="
                  h-3 w-3
                  text-emerald-500
                "
              />
  
              {job.location}
            </span>
          </div>
  
          {/* FOOTER */}
  
          <div
            className="
              mt-6 flex items-center
              justify-between
              border-t border-slate-200
              pt-5
              dark:border-white/[0.06]
            "
          >
  
            <div
              className="
                flex items-center gap-5
              "
            >
  
              <div>
  
                <p
                  className="
                    text-[10px]
                    font-bold uppercase
                    tracking-[0.14em]
                    text-slate-400
                    dark:text-zinc-600
                  "
                >
                  Salary
                </p>
  
                <p
                  className="
                    mt-1 text-lg
                    font-black
                    tracking-[-0.05em]
                    text-slate-900
                    dark:text-white
                  "
                >
                  ₹
                  {
                    Number(
                      job.salary
                    ).toLocaleString(
                      "en-IN"
                    )
                  }
                </p>
              </div>
  
              <div>
  
                <p
                  className="
                    text-[10px]
                    font-bold uppercase
                    tracking-[0.14em]
                    text-slate-400
                    dark:text-zinc-600
                  "
                >
                  Openings
                </p>
  
                <div
                  className="
                    mt-1 flex
                    items-center gap-1.5
                  "
                >
  
                  <Users
                    className="
                      h-3.5 w-3.5
                      text-cyan-500
                    "
                  />
  
                  <p
                    className="
                      text-lg font-black
                      tracking-[-0.05em]
                      text-slate-900
                      dark:text-white
                    "
                  >
                    {job.openings}
                  </p>
                </div>
              </div>
            </div>
  
            {/* EDIT BUTTON */}
  
            <button
              onClick={() =>
                onEdit(job)
              }
              className="
                        cursor-pointer
                group/btn relative
                flex h-10
                items-center gap-2
                overflow-hidden
                rounded-2xl
                border border-emerald-400/20
                bg-[#07130F]
                px-4 text-sm
                font-semibold
                text-emerald-50
                transition-all duration-300
                hover:border-emerald-400/40
                hover:bg-[#0A1B15]
                hover:shadow-[0_8px_25px_rgba(16,185,129,0.2)]
              "
            >
  
              <div
                className="
                  absolute inset-0
                  translate-x-[-120%]
                  bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.06),transparent)]
                  transition-transform duration-700
                  group-hover/btn:translate-x-[120%]
                "
              />
  
              <Pencil
                className="
                  h-3.5 w-3.5
                  text-emerald-400
                "
              />
  
              <span
                className="
                  relative
                "
              >
                Edit
              </span>
            </button>
          </div>
        </div>
      </div>
    )
  }
  