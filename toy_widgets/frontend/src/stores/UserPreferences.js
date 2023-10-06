import { defineStore } from 'pinia'
import { ref } from 'vue'

/*
export const useUserPreferencesStore = defineStore('userPreferences', {
  state: () => {
    console.log('💩 UserPreferences:state')
    return {
      count: 0,
      financialStatus: 'middle'
    }
  },
  actions: {
    incrementCounter() {
      this.count++
    },
    setFinancialStatus(financialStatus) {
      const validFinancialStatuses = ['negative', 'low', 'middle', 'high', 'filthy']
      if (validFinancialStatuses.includes(financialStatus)) {
        this.financialStatus = financialStatus
      } else {
        throw new Error(
          `Invalid financial status: ${financialStatus}. Should be one of: ${validFinancialStatuses}`
        )
      }
    },
    created() {
      console.log('💩 UserPreferences store created')
    }
  },
  init: () => {
    console.log('💩 UserPreferences store initialized')
  }
})
*/

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

  function fetchPreferences() {
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
      this.intervalId = setInterval(() => {
        console.log(logPrefix, 'startPolling', 'Polling')
        fetchPreferences()
      }, this.pollIntervalMs)
    } else {
      console.log(logPrefix, 'startPolling', 'Already polling')
    }
  }

  function stopPolling() {
    if (this.intervalId) {
      console.log(logPrefix, 'stopPolling', 'We are polling. Stopping.')
      clearInterval(this.intervalId)
      this.intervalId = null
    } else {
      console.log(logPrefix, 'stopPolling', 'Not polling')
    }
  }

  function initPolling() {
    this.fetchPreferences()
    this.startPolling()
    window.addEventListener('focus', this.startPolling)
    window.addEventListener('blur', this.stopPolling)
  }

  return {
    count,
    financialStatus,
    setFinancialStatus,
    incrementCounter,
    initPolling,
    startPolling,
    stopPolling,
    intervalId,
    pollIntervalMs,
    fetchPreferences
  }
})
