<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import BrightnessChart from './components/BrightnessChart.vue'
import { onBeforeMount, onMounted, ref, toRaw } from 'vue'
const data = [
  ['Time', 'Sales', 'Expenses'],
  [new Date(1655606904467), 1000, 400],
  [new Date(1655806907467), 1170, 460],
  [new Date(1655906507467), 660, 1120],
  [new Date(1655906907267), 1030, 540],
];

const options = {
  // height: 600, 
  // width: 800, 
}

const chartData = ref<Array<any>>([])

function genDate(data:Array<any>) {
  // console.log(data.length)
  for (let i = 1; i < data.length; i++) {
    // console.log(`i=${i}`)
    data[i][0] = new Date(data[i][0])
  }
}

async function refresh() {
  let url = 'http://localhost:5000/api/getDevice?devEui=009569000000F51D&n=100'
  try {let response = await fetch(url, {
        method: "get",
      });
      chartData.value = await response.json()
      console.log(`get data=${chartData.value}`)
  } catch (error) {
    console.log('get data failed', error)
  }
  console.log('refresh done!')
  genDate(chartData.value)
  console.log(`after gen=${chartData.value}`)
}

async function test() {
  // console.log(chartData.value);
}

async function handleTest() {
  await refresh();
  await test();
}
onBeforeMount(() => {
})

onMounted(() => {
  handleTest()
})

</script>

<template>
  <div><img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  </div>
  <div class="chart">
    <BrightnessChart :data="chartData" :options="options" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* .chart {
  width: 100%;
  height: 100%;
} */
</style>
