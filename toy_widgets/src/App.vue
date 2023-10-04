<!-- import StaticWidget -->

<script setup>
import StaticTimeWidget from './components/StaticTimeWidget.vue'
import DynamicTimeWidget from './components/DynamicTimeWidget.vue'
</script>

<template>
  <div class="widget-box widget">
    <h1>Vue Widgets</h1>
    <p>Let's have some fun!</p>
  </div>
  <StaticTimeWidget />
  <DynamicTimeWidget />
</template>
