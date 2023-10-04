<template>
  <div class="widget">
    <h3>Dynamic Time</h3>
    <p><b>Current local time:</b> {{ currentDate }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const currentDate = ref('')

    const updateTime = () => {
      currentDate.value = new Date().toLocaleString()
    }

    onMounted(() => {
      updateTime()
      setInterval(updateTime, 1000)
    })

    return {
      currentDate
    }
  }
}
</script>
