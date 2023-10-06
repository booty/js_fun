import { defineStore } from 'pinia'

export const useUserPreferencesStore = defineStore('userPreferences', {
  state: () => ({
    count: 0,
    financialStatus: 'middle'
  }),
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
    }
  }
})
