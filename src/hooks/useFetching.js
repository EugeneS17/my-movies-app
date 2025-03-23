import { useState } from 'react'

export default function useFetching(callback) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetching() {
    try {
      setIsLoading(true)
      await callback()
    } catch (e) {
      setError(e.message)
    } finally {
      setTimeout(() => setIsLoading(false), 1000)
      // setIsLoading(false)
    }
  }

  return [fetching, isLoading, setIsLoading, error]
}
