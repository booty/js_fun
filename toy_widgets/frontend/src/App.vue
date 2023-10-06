<!-- import StaticWidget -->

<script setup>
import StaticTimeWidget from './components/StaticTimeWidget.vue'
import DynamicTimeWidget from './components/DynamicTimeWidget.vue'
import ListEditor from './components/ListEditor.vue'
import RssFrontEnd from './components/RssFrontEnd.vue'
import ColorWidget from './components/ColorWidget.vue'
import FinancialAdvisor from './components/FinancialAdvisor.vue'
import OnlineStore from './components/OnlineStore.vue'
</script>

<template>
  <div class="widget-box widget">
    <h1>Vue Widgets</h1>
    <p>Let's have some fun!</p>
  </div>
  <ColorWidget />
  <StaticTimeWidget />
  <DynamicTimeWidget />
  <ListEditor />
  <RssFrontEnd />
  <FinancialAdvisor />
  <OnlineStore />
</template>
