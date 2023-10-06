import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserPreferencesStore = defineStore('userPreferences', () => {
  const count = ref(0)
  const financialStatus = ref('middle') // should be hidden behind setter/getter
  const income = ref(null) // should be hidden behind setter/getter
  const intervalId = null
  const pollIntervalMs = 1000
  const logPrefix = '🍑 [UserPreferencesStore]'
  const serverUrl = 'http://localhost:8000/userpreferences' // obviously this should be configurable

  function setIncome(newIncome) {
    // convert income to a number
    if (typeof newIncome === 'string') {
      newIncome = newIncome.replace(/[^0-9.]/g, '')
      newIncome = parseFloat(newIncome)
    }

    if (newIncome == income.value) {
      console.log(logPrefix, '[setIncome] income unchanged', newIncome, income.value)
      return
    }

    income.value = newIncome
    console.log(logPrefix, '[setIncome] new income=', income.value)

    if (newIncome < 0) financialStatus.value = 'negative'
    else if (newIncome < 10000) financialStatus.value = 'low'
    else if (newIncome < 100000) financialStatus.value = 'middle'
    else if (newIncome < 1000000) financialStatus.value = 'high'
    else {
      financialStatus.value = 'filthy'
    }

    syncUserPreferencesToServer()
  }

  function setFinancialStatus(financialStatus) {
    const validFinancialStatuses = ['negative', 'low', 'middle', 'high', 'filthy']
    if (validFinancialStatuses.includes(financialStatus)) {
      this.financialStatus = financialStatus
      console.log(logPrefix, 'setFinancialStatus this.financialStatus=', financialStatus)
    } else {
      throw new Error(
        `Invalid financial status: ${financialStatus}. Should be one of: ${validFinancialStatuses}`
      )
    }
  }

  async function syncUserPreferencesToServer() {
    console.log(logPrefix, 'syncUserPreferencesToServer')

    const data = {
      income: income.value
    }

    // PUT this data to serverUrl
    try {
      const response = await fetch(serverUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        console.log('PUT user preferences:', response)
        return response.json()
      } else {
        throw new Error(`Failed to PUT user preferences: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error PUTting user preferences:', error)
      return null
    }
  }

  function syncUserPreferencesFromServer(force) {
    console.log(logPrefix, 'fetchPreferences, force:', force)

    if ((!force && document.hidden) || !document.hasFocus()) {
      return
    }

    console.log(logPrefix, 'fetchPreferences, fetching')
    fetch(serverUrl)
      .then((response) => {
        console.log('Fetched user preferences:', response)
        if (response.ok) {
          // let json = response.json()
          // this.setIncome(json.income)
          return response.json()
        } else {
          throw new Error(`Failed to fetch user preferences: ${response.statusText}`)
        }
      })
      .then((data) => {
        console.log('data:', data)
        setIncome(data.income)
        return data
      })
      .catch((error) => {
        console.error('Error fetching user preferences:', error)
        return null
      })
  }

  function incrementCounter() {
    count.value++
  }

  function startPolling() {
    if (!this.intervalId) {
      console.log(logPrefix, 'startPolling', 'Polling')
      this.intervalId = setInterval(() => {
        syncUserPreferencesFromServer(false)
      }, this.pollIntervalMs)
    } else {
      console.log(logPrefix, 'startPolling', 'Already polling')
    }

    syncUserPreferencesFromServer(true)
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
    fetchUserPreferences: syncUserPreferencesFromServer,
    serverUrl,
    income,
    setIncome
  }
})
