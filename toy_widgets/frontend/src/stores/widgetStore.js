import { defineStore } from 'pinia'

export const useWidgetStore = defineStore({
  // unique id of the store across your application
  id: 'widgetStore',

  // Simple state
  state: () => ({
    count: 0
  }),

  // Functions to modify the state
  actions: {
    increment() {
      this.count++
    }
  }
})
