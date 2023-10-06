import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserPreferencesStore = defineStore('userPreferences', () => {
  const count = ref(0)
  const financialStatus = ref('middle')
  const intervalId = null
  const pollIntervalMs = 1000
  const logPrefix = '🍑 [UserPreferencesStore]'

  function setFinancialStatus(financialStatus) {
    const validFinancialStatuses = ['negative', 'low', 'middle', 'high', 'filthy']
    if (validFinancialStatuses.includes(financialStatus)) {
      this.financialStatus = financialStatus
    } else {
      throw new Error(
        `Invalid financial status: ${financialStatus}. Should be one of: ${validFinancialStatuses}`
      )
    }
  }

  function fetchPreferences(force) {
    console.log(logPrefix, 'fetchPreferences')

    if ((!force && document.hidden) || !document.hasFocus()) {
      // console.log(
      //   logPrefix,
      //   'fetchPreferences',
      //   'Skipping fetchPreferences. document.hidden:',
      //   document.hidden,
      //   `document.hasFocus:`,
      //   document.hasFocus()
      // )
      return
    }

    // TODO: exponential backoff, etc.
    try {
      const response = fetch('/userpreferences')
      if (response.ok) {
        const data = response.json()
        console.log(logPrefix, 'Fetched user preferences:', data)
      } else {
        console.error(logPrefix, 'Failed to fetch user preferences:', response.statusText)
      }
    } catch (error) {
      console.error(logPrefix, 'Error fetching user preferences:', error)
    }
  }

  function incrementCounter() {
    count.value++
  }

  function startPolling() {
    if (!this.intervalId) {
      console.log(logPrefix, 'startPolling', 'Polling')
      this.intervalId = setInterval(() => {
        fetchPreferences(false)
      }, this.pollIntervalMs)
    } else {
      console.log(logPrefix, 'startPolling', 'Already polling')
    }

    fetchPreferences(true)
  }

  function initPolling() {
    this.startPolling()
  }

  return {
    count,
    financialStatus,
    setFinancialStatus,
    incrementCounter,
    initPolling,
    startPolling,
    intervalId,
    pollIntervalMs,
    fetchPreferences
  }
})
