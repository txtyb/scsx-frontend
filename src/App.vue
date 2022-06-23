<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import LineChart from './components/LineChart.vue'
import { onBeforeMount, onMounted, ref, h, VNode, VNodeTypes } from 'vue'
import { reference } from '@popperjs/core';

const dataNum = ref(100)
const devEui = ref('009569000000F51D')
const typeVal = ref(0)
const changeHandler = (e: number) => (typeVal.value = e)

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

let chartDataList = ref<Array<any>>(new Array())
let chartTypeList = ref<Array<number>>(new Array())

// chartTypeList.value = [3, 2, 1, 0]

let chartGrid = h(
  LineChart, { data: chartData.value, type: 3 }
)

function genDate(data: Array<any>) {
  // console.log(data.length)
  for (let i = 1; i < data.length; i++) {
    // console.log(`i=${i}`)
    data[i][0] = new Date(data[i][0])
  }
}

async function refresh() {
  for (let i = 0; i < chartDataList.value.length; i++) {
    let url = 'http://localhost:5000/api/getDevice?devEui=' + devEui.value + '&n=' + dataNum.value + '&type=' + chartTypeList.value[i]
    try {
      let response = await fetch(url, {
        method: "get",
      });
      chartDataList.value[i].value = await response.json()
      // console.log(`get data=${chartData.value}`)
    } catch (error) {
      console.log('get data failed', error)
    }
    console.log('refresh done!')
    genDate(chartDataList.value[i].value)
    // console.log(`after gen=${chartData.value}`)
  }
}

async function test() {
  console.log(`chartTypeList=${chartTypeList.value.toLocaleString()}`);
  console.log(`chartDataList=${chartDataList.value.toLocaleString()}`);
}

async function handleTest() {
  await refresh();
  await test();
}

async function addChart() {
  chartTypeList.value.push(typeVal.value)
  let data = ref<Array<any>>([])
  chartDataList.value.push(data)
}

async function handleAddButtonClick() {
  await refresh()
  await addChart()
  await handleTest()
  await test()
}

async function handleRefreshButtonClick() {
  await refresh()
}

onBeforeMount(() => {
})

onMounted(() => {
  handleTest()
})

</script>

<template>
  <fe-grid-group :gap="1" justify="flex-start" alignItems="center">
    <fe-grid :md="5"><span style="font-weight: bold; font-size: 25px">图表汇总</span></fe-grid>
    <fe-grid :md="5">
      <fe-slider v-model="dataNum" :max="300" @click="refresh" />
    </fe-grid>
    <!-- <fe-spacer :x=2 /> -->
    <fe-grid :md="1">
      <fe-button auto type="success" @click="handleRefreshButtonClick">刷新</fe-button>
    </fe-grid>
    <fe-grid :md="2" justify="flex-end">
      <span>devEui</span>
    </fe-grid>
    <fe-grid :md="2">
      <fe-input placeholder="devEui" v-model="devEui" />
    </fe-grid>
    <fe-grid :md="3">
      <fe-select width="5" :value="typeVal" @change="changeHandler">
        <fe-option label="光照" :value="0"></fe-option>
        <fe-option label="温度" :value="1"></fe-option>
        <fe-option label="湿度" :value="2"></fe-option>
        <fe-option label="气压" :value="3"></fe-option>
      </fe-select>
    </fe-grid>
    <!-- <fe-spacer :x=3 /> -->
    <fe-grid :md="1">
      <fe-button auto style="margin-top:2px" type="success" size="small" ghost @click="handleAddButtonClick">添加
      </fe-button>
    </fe-grid>
  </fe-grid-group>
  <fe-grid-group :gap="2" justify="flex-start">
    <!-- <fe-grid :xs="24" :md="12">
      <fe-card class="chart" shadow>
        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
      </fe-card>
    </fe-grid>
    <fe-grid :xs="24" :md="12">
      <fe-card class="chart" shadow>
        <LineChart :data="chartData" :options="options" :type='a' />
      </fe-card>
    </fe-grid>
    <fe-grid :xs="24" :md="12">
      <fe-card class="chart" shadow>
        <LineChart :data="chartData" :options="options" />
      </fe-card>
    </fe-grid> -->
    <fe-grid v-for="(i, index) in chartTypeList" :xs="24" :md="12">
      <fe-card class="chart" shadow>
        <LineChart :data="chartDataList[index].value" :options="options" :type="i" :key="index" />
      </fe-card>
    </fe-grid>
  </fe-grid-group>
  <!-- <chartGrid /> -->
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

.chart {
  width: 100%;
  height: 500px;
}
</style>
