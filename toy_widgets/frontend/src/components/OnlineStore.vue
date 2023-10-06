<template>
  <div class="widget">
    <h3>Shopping List</h3>
    <ul>
      <li v-for="(item, index) in shoppingList" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const shoppingList = ref([])

watch(income, (newIncome) => {
  if (newIncome < 1000) {
    shoppingList.value = ['Ramen noodles', 'Generic brand cereal', 'Peanut butter and jelly']
  } else if (newIncome < 100000) {
    shoppingList.value = ['Fresh produce', 'Meat and poultry', 'Dairy products']
  } else {
    shoppingList.value = ['Organic produce', 'Premium cuts of meat', 'Imported cheeses']
  }
})
</script>

<style>
/* add any styles you want here */
</style>
