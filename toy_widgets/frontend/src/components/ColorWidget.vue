<template>
  <div class="widget">
    <h3>Color Palette</h3>
    <div class="color-palette">
      <div
        v-for="(color, index) in colors"
        :key="index"
        :style="{ backgroundColor: color }"
        @click="updateColor(color)"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

// const store = useStore('widgetStore')
console.log('Hi from ColorWidget.vue!')

export default {
  setup() {
    console.log('Hi from ColorWidget.vue setup()!')
    const colors = ref(['#ff0000', '#00ff00', '#0000ff'])

    const updateColor = (color) => {
      // store.currentBgColor = color
    }

    return {
      // store,
      colors,
      updateColor
    }
  }
}
</script>

<style>
.color-palette {
  display: flex;
  flex-wrap: wrap;
}

.color-palette > div {
  width: 50px;
  height: 50px;
  margin: 5px;
  cursor: pointer;
}
</style>
