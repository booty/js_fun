<template>
  <div class="widget">
    <h3>Static Time</h3>
    <p><b>App launched at:</b> {{ currentDate }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const currentDate = ref('')

    onMounted(() => {
      currentDate.value = new Date().toLocaleString()
    })

    return {
      currentDate
    }
  }
}
</script>
