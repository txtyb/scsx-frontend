<script setup lang="ts">
import { defineComponent, h } from 'vue';

import { GChart } from 'vue-google-charts';

  const props = defineProps({
    data: {
      type: Array<any>,
      required: true,
    },
    options: {
      type: Object,
    },
    type: {
      type: Number, 
      required: true, 
    }, 
  })

const chartTypes = ['光照', '温度', '湿度', '气压']
const options = {
  title: chartTypes[props.type] + '随时间变化图',
  curveType: 'none',
  // explorer: {}, 
  legend: { position: 'top' },
  chartArea: {
    left: 40, 
    top: 40, 
    width: '95%', 
    height: '85%', 
  }, 
  // width: 1000,
  height: 450,
};

const optionsMerged = Object.assign({}, options, props.options)

// const data = ref<Array<any>[]>(props.data)
// console.log(data)

// const chart = h(GChart, {
//     data,
//     options,
//     type,
// });

// const settings = { 'language': 'zh' }
// const chart = h(GChart, { settings: settings, data: props.data, options: optionsMerged, type: 'LineChart' })

</script>

<template>
  <!-- <chart /> -->
  <GChart class="gchart" :settings="{ 'language': 'zh' }" type="LineChart" :data="props.data" :options="optionsMerged" />
</template>

<style scoped>
.gchart {
  width: 100%;
  height: 100%;
}
</style>