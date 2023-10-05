<template>
  <div class="widget">
    <h3>Financial Advisor</h3>
    <p>Your Annual Income ($USD): <input v-model="income" @keyup.enter="updateIncome" /></p>
    <p>
      <b>Financial Advice:</b>
      <i>
        <span v-if="income < 0">"How is that even possible?"</span>
        <span v-else-if="income < 1000">"You are poor. But that's okay! Money is dumb."</span>
        <span v-else-if="income < 10000">"You are middle class. That is cool. Good work."</span>
        <span v-else-if="income < 100000">"You are rich. Make sure to share!"</span>
        <span v-else-if="income < 1000000"
          >"I think you should financially advise me, not the other way 'round."</span
        >
      </i>
    </p>
  </div>
</template>

<!-- We'll do this one in the Composition API -->
<script setup>
import { onMounted, ref } from 'vue'

const income = ref(0)

const updateIncome = (foo) => {
  console.log('updateIncome called', 'foo:', foo)
}

onMounted(() => {
  console.log('FinancialAdvisor mounted. Income:', income.value)
})
</script>
