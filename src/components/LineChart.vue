<script setup lang="ts">
import { defineComponent, h } from 'vue';

import '@fect-ui/themes'
import EditAndClosePanel from './EditAndClosePanel.vue'

import { GChart } from 'vue-google-charts';

const emit = defineEmits(['close', 'addNewNode', 'returnUrl'])

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
  modelValue: Array<String>,
})

const chartTypes = ['光照', '温度', '湿度', '气压']
const options = {
  title: chartTypes[props.type] + '随时间变化图',
  curveType: 'none',
  // explorer: {}, 
  legend: { position: 'top' },
  chartArea: {
    left: 55,
    top: 42,
    width: '95%',
    height: '85%',
  },
  // width: 1000,
  height: 450,
  interpolateNulls: true,
};

const optionsMerged = Object.assign({}, options, props.options)

async function getImageUrl(chart: any, google: any) {
  await new Promise(r => setTimeout(r, 1000));
  let url = chart.getImageURI()
  // console.log(`ImageUrl=${url}`)
  emit('returnUrl', url)
}

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
  <div style="position:relative">
    <GChart class="gchart" :settings="{ 'language': 'zh' }" type="LineChart" :data="props.data" :options="optionsMerged"
      @ready="getImageUrl" />
    <EditAndClosePanel @close="$emit('close')" @add-new-node="(devEui: string) => $emit('addNewNode', devEui)" />
  </div>
</template>

<style scoped>
.gchart {
  width: 100%;
  height: 100%;
}
</style>