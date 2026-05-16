"use client"

import {
  useCallback,
  useRef,
} from "react"

interface UsePollingOptions {
  pollingFn: () => Promise<void>
  interval?: number
  enabled?: boolean
  maxAttempts?: number
}

export const usePolling = ({
  pollingFn,
  interval = 3000,
  enabled = true,
  maxAttempts = 10,
}: UsePollingOptions) => {

  const intervalRef =
    useRef<NodeJS.Timeout | null>(null)

  const attemptsRef =
    useRef(0)

  /* STOP */

  const stopPolling =
    useCallback(() => {
      if (intervalRef.current) {
        clearInterval(
          intervalRef.current
        )
        intervalRef.current =
          null
      }

    }, [])

  /* START */

  const startPolling =
    useCallback(() => {
      if (!enabled) {
        return
      }
      /* PREVENT DUPLICATES */
      stopPolling()

      /* RESET ATTEMPTS */

      attemptsRef.current = 0

      intervalRef.current =
        setInterval(async () => {

          /* MAX ATTEMPTS */

          if (
            attemptsRef.current >=
            maxAttempts
          ) {

            stopPolling()

            return
          }

          attemptsRef.current += 1

          await pollingFn()

        }, interval)

    }, [
      enabled,
      interval,
      pollingFn,
      stopPolling,
      maxAttempts,
    ])

  return {
    startPolling,
    stopPolling,
  }
}