<template>
  <div class="widget">
    <h3>List Editor</h3>
    <p>
      <input v-model="newItem" @keyup.enter="addItem" />
    </p>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
        <button @click="removeItem(index)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const newItem = ref('')
    const items = ref([])

    const addItem = () => {
      if (newItem.value.trim() !== '') {
        items.value.push(newItem.value.trim())
        newItem.value = ''
      }
    }

    const removeItem = (index) => {
      items.value.splice(index, 1)
    }

    return {
      newItem,
      items,
      addItem,
      removeItem
    }
  }
}
</script>
