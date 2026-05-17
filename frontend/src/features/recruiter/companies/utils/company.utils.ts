import type {
    Company,
    CompanySortKey,
  } from "../types/company.types"
  
  /* LOGO */
  
  export function hasLogoReady(
    company:
      Company |
      null |
      undefined,
  ): boolean {
  
    return (
      !!company &&
      company.logo_upload_status ===
        "success" &&
      !!company.logo &&
      typeof company.logo ===
        "string" &&
      company.logo.trim()
        .length > 0
    )
  }
  
  export function hasLogoFailed(
    company:
      Company |
      null |
      undefined,
  ): boolean {
  
    return (
      company?.logo_upload_status ===
      "fail"
    )
  }
  
  export function isLogoPending(
    company:
      Company |
      null |
      undefined,
  ): boolean {
  
    return (
      company?.logo_upload_status ===
      "pending"
    )
  }
  
  /* INITIALS */
  
  export function getCompanyInitials(
    name: string,
  ): string {
  
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (
          word
        ) =>
          word[0]
            ?.toUpperCase() ??
          ""
      )
      .join("")
  }
  
  /* WEBSITE */
  
  export function formatWebsiteDisplay(
    url: string,
  ): string {
  
    try {
  
      const {
        hostname,
      } =
        new URL(url)
  
      return hostname.replace(
        /^www\./,
        "",
      )
  
    } catch {
  
      return url
    }
  }
  
  /* DATE */
  
  export function formatDate(
    value?: string | null,
  ): string {
  
    if (!value) {
      return "Recently"
    }
  
    const date =
      new Date(value)
  
    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
  
      return "Recently"
    }
  
    return new Intl.DateTimeFormat(
      "en-IN",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
    ).format(date)
  }
  
  /* SORT */
  
  export function sortCompanies(
    companies: Company[],
    by:
      CompanySortKey =
        "createdAt",
    order:
      "asc" |
      "desc" =
        "desc",
  ): Company[] {
  
    return [
      ...companies,
    ].sort(
      (
        a,
        b,
      ) => {
  
        const valA =
          by === "name"
            ? a.name.toLowerCase()
            : new Date(
                a.created_at
              ).getTime()
  
        const valB =
          by === "name"
            ? b.name.toLowerCase()
            : new Date(
                b.created_at
              ).getTime()
  
        if (valA < valB) {
          return order ===
            "asc"
            ? -1
            : 1
        }
  
        if (valA > valB) {
          return order ===
            "asc"
            ? 1
            : -1
        }
  
        return 0
      },
    )
  }
  
  /* FILTER */
  
  export function filterCompaniesByName(
    companies: Company[],
    query: string,
  ): Company[] {
  
    const q =
      query
        .trim()
        .toLowerCase()
  
    if (!q) {
      return companies
    }
  
    return companies.filter(
      (
        company
      ) =>
        company.name
          .toLowerCase()
          .includes(q)
    )
  }