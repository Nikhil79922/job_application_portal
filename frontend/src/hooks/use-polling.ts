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

  /** Called when maxAttempts is reached without success */
  onExhausted?: () => void
}

export const usePolling = ({
  pollingFn,
  interval = 3000,
  enabled = true,
  maxAttempts = Infinity,
  onExhausted,
}: UsePollingOptions) => {

  const intervalRef =
    useRef<NodeJS.Timeout | null>(
      null
    )

  const attemptsRef =
    useRef(0)

  /* STABLE REFS */

  const pollingFnRef =
    useRef(pollingFn)

  const onExhaustedRef =
    useRef(onExhausted)

  useEffect(() => {
    pollingFnRef.current = pollingFn
  }, [pollingFn])

  useEffect(() => {
    onExhaustedRef.current = onExhausted
  }, [onExhausted])

  /* STOP */

  const stopPolling =
    useCallback(() => {

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      attemptsRef.current = 0

    }, [])

  /* START */

  const startPolling =
    useCallback(() => {

      if (!enabled) return

      /* PREVENT DUPLICATE */
      if (intervalRef.current) return

      intervalRef.current =
        setInterval(
          async () => {

            if (
              attemptsRef.current >=
              maxAttempts
            ) {
              stopPolling()
              onExhaustedRef.current?.()
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
  }, [stopPolling])

  return {
    startPolling,
    stopPolling,
  }
}
