<template>
  <div class="widget">
    <h3>Financial Advisor</h3>
    <p>
      Your Annual Income ($USD):
      <input v-model="income" @keyup="updateMyIncome(income)" @change="updateMyIncome(income)" />
    </p>
    <p>
      <b>Financial Advice:</b>
      <span class="financialAdvice" :class="financialStatus">
        "{{ financialAdvice[financialStatus] }}"
      </span>
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useUserPreferencesStore } from '../stores/UserPreferences'

const income = ref(null)
const userPreferencesStore = useUserPreferencesStore()

const financialAdvice = {
  negative: 'How is that even possible?',
  low: "You don't have a lot of money. But that's okay! Money is dumb. Love is what really matters.",
  middle: 'You are middle class. That is cool. Good work.',
  high: 'You are rich. Make sure to share.',
  filthy:
    'I think you should financially advise me, not the other way around. What could I possibly teach you?'
}

const financialStatus = computed(() => {
  return userPreferencesStore.financialStatus
})

const updateMyIncome = (newIncome) => {
  console.log('New income:', newIncome)
  // userPreferences.setFinancialStatus(financialStatus.value)
  // return if newIncome is null
  if (newIncome === null) {
    return
  }
  userPreferencesStore.setIncome(newIncome)
}

watch(
  () => userPreferencesStore.income,
  (newValue) => {
    console.log('[FinancialAdvisor|watch] Income changed to:', newValue)
    income.value = newValue
  }
)

onMounted(() => {
  income.value = userPreferencesStore.income
  console.log('FinancialAdvisor mounted. Income:', income.value)
})
</script>

<style>
.financialAdvice {
  font-style: italic;
}
.negative {
  color: darkred;
}
.middle {
  color: darkgreen;
}
.high {
  font-weight: bold;
  color: darkblue;
}
.filthy {
  font-weight: bold;
  text-shadow: 2px 2px yellow;
  color: darkblue;
}
</style>
