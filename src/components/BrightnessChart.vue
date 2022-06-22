<script setup lang="ts">
import { defineComponent, h } from 'vue';

import { GChart } from 'vue-google-charts';

const options = {
  title: '光照随时间变化图',
  curveType: 'none',
  explorer: {}, 
  legend: { position: 'top' },
  width: 1600,
  height: 1200,
};

const props = defineProps({
  data: {
    type: Array<any>,
    required: true,
  },
  options: {
    type: Object,
  },
})

const optionsMerged = Object.assign({}, options, props.options)

// const data = ref<Array<any>[]>(props.data)
// console.log(data)

// const chart = h(GChart, {
//     data,
//     options,
//     type,
// });

// console.log(chart)

</script>

<template>
  <!-- <chart/> -->
  <GChart :settings="{ 'language': 'zh' }" type="LineChart" :data="props.data" :options="optionsMerged" />
</template>