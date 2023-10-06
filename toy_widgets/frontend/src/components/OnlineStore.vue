<template>
  <div class="widget">
    <h3>Online Shopping</h3>
    <p>Recommendations, customized to your income level.</p>
    <p class="recommendedItems">
      Recommended items:
      <ul >
        <li v-for="item in currentShoppingItems" :key="item">
          <img :src="`images/${item}`" :alt="item" />
        </li>
      </ul>
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
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
    'diamond-ring.jpg',
    'smartphone.jpg'
  ],
  filthy: [
    'diamond-ring.jpg',
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

function updateShoppingRecs(financialStatus) {
  let recs = shoppingItemsByFinancialStatus[financialStatus]
  currentShoppingItems.value = shuffle(recs).slice(0, 3)
}

watch(() => userPreferencesStore.financialStatus, (newValue) => {
  console.log('[OnlineStore|watch] Financial status changed to:', newValue)
  updateShoppingRecs(newValue)
})

onMounted(() => {
  updateShoppingRecs(userPreferencesStore.financialStatus)
})
</script>

<style>
  .recommendedItems ul {
    display: flex;
    list-style: none;
    margin: 0px;
  }
  .recommendedItems img {
    width: 150px;
    height: 150px;
    margin: 0.5em;
    border: 1px #777 solid;
    border-radius: 1em;
  }
</style>
