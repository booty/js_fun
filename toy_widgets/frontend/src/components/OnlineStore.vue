<template>
  <div class="widget">
    <h3>Online Shopping</h3>
    <p>Recommendations, customized to your income level.</p>
    <p>
      Recommended items:
      <ul>
        <li v-for="item in currentShoppingItems" :key="item">{{ item }}</li>
      </ul>
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useUserPreferencesStore } from '../stores/UserPreferences'

const userPreferencesStore = useUserPreferencesStore()
const currentShoppingItems = ref([])

const shoppingItemsByFinancialStatus = {
  negative: ['ramen.jpg'],
  low: [
    'ramen.jpg',
    'bologna.jpg',
    'gumpack.jpg',
    'soup.jpg',
    'dogfood.jpg',
    'bud.jpg',
    'pencil.jpg'
  ],
  middle: [
    'fryingpan.jpg',
    'shovel.jpg',
    'smartphone.jpg',
    'sneakers.jpg',
    'soup.jpg',
    'spatula.jpg',
    'bud.jpg',
    'gumpack.jpg',
    'dogfood.jpg',
    'bologna.jpg'
  ],
  high: [
    'sneakers.jpg',
    'furcoat.jpg',
    'lobster.jpg',
    'chimay.jpg',
    'diamondring.jpg',
    'smartphone.jpg'
  ],
  filthy: [
    'diamondring.jpg',
    'yacht.jpg',
    'spaceship.jpg',
    'lobster.jpg',
    'goldbars.jpg',
    'island.jpg',
    'furcoat.jpg'
  ]
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


watch(() => userPreferencesStore.financialStatus, (newValue) => {
  console.log('Financial status changed to:', newValue)
  // currentShoppingItems.value = shoppingItemsByFinancialStatus[newValue]
  let recs = shoppingItemsByFinancialStatus[newValue]
  currentShoppingItems.value = shuffle(recs).slice(0, 3)
  console.log('Current shopping items:', currentShoppingItems.value)
})

// todo: onmounted
</script>
