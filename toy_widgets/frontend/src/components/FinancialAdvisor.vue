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
        {{ financialAdvice[financialStatus] }}
      </span>
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useUserPreferencesStore } from '../stores/UserPreferences'

const income = ref(5000)
const userPreferences = useUserPreferencesStore()

const financialAdvice = {
  negative: 'How is that even possible?',
  low: "You are poor. But that's okay! Money is dumb.",
  middle: 'You are middle class. That is cool. Good work.',
  high: 'You are rich. Make sure to share!',
  filthy:
    "I think you should financially advise me, not the other way 'round. What could I possibly teach you?"
}

const financialStatus = computed(() => {
  if (income.value < 0) return 'negative'
  if (income.value < 1000) return 'low'
  if (income.value < 100000) return 'middle'
  if (income.value < 1000000) return 'high'
  return 'filthy'
})

const updateMyIncome = (newIncome) => {
  console.log('New income:', newIncome)
  userPreferences.setFinancialStatus(financialStatus.value)
}

onMounted(() => {
  console.log('FinancialAdvisor mounted. Income:', income.value)
  updateMyIncome(income.value)
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
