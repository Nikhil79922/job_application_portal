"use client"

import {
  useCallback,
  useEffect,
  useRef,
} from "react"

interface UsePollingOptions {

  pollingFn:
    () => Promise<void>

  interval?: number

  enabled?: boolean

  maxAttempts?: number
}

export const usePolling = ({
  pollingFn,
  interval = 3000,
  enabled = true,
  maxAttempts = Infinity,
}: UsePollingOptions) => {

  const intervalRef =
    useRef<NodeJS.Timeout | null>(
      null
    )

  const attemptsRef =
    useRef(0)

  /* STABLE POLLING FN */

  const pollingFnRef =
    useRef(pollingFn)

  useEffect(() => {

    pollingFnRef.current =
      pollingFn

  }, [
    pollingFn,
  ])

  /* STOP */

  const stopPolling =
    useCallback(() => {

      if (
        intervalRef.current
      ) {

        clearInterval(
          intervalRef.current
        )

        intervalRef.current =
          null
      }

      attemptsRef.current = 0

    }, [])

  /* START */

  const startPolling =
    useCallback(() => {

      if (!enabled) {
        return
      }

      /* PREVENT DUPLICATE */

      if (
        intervalRef.current
      ) {
        return
      }

      intervalRef.current =
        setInterval(
          async () => {

            if (
              attemptsRef.current >=
              maxAttempts
            ) {

              stopPolling()

              return
            }

            attemptsRef.current += 1

            await pollingFnRef.current()

          },
          interval
        )

    }, [
      enabled,
      interval,
      maxAttempts,
      stopPolling,
    ])

  /* CLEANUP */

  useEffect(() => {

    return () => {

      stopPolling()
    }

  }, [
    stopPolling,
  ])

  return {

    startPolling,

    stopPolling,
  }
}