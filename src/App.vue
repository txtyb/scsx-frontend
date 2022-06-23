<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import LineChart from './components/LineChart.vue'
import { onBeforeMount, onMounted, ref, h, VNode, VNodeTypes } from 'vue'
import { reference } from '@popperjs/core';

const dataNum = ref('100')
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
  LineChart, {data: chartData.value, type: 3}
  )

function genDate(data: Array<any>) {
  // console.log(data.length)
  for (let i = 1; i < data.length; i++) {
    // console.log(`i=${i}`)
    data[i][0] = new Date(data[i][0])
  }
}

async function refresh() {
  let url = 'http://localhost:5000/api/getDevice?devEui=' + devEui.value + '&n=' + dataNum.value
  try {
    let response = await fetch(url, {
      method: "get",
    });
    chartData.value = await response.json()
    // console.log(`get data=${chartData.value}`)
  } catch (error) {
    console.log('get data failed', error)
  }
  console.log('refresh done!')
  genDate(chartData.value)
  // console.log(`after gen=${chartData.value}`)
}

async function test() {
  console.log(chartTypeList.value);
}

async function handleTest() {
  await refresh();
  await test();
}

async function addChart() {
  chartTypeList.value.push(typeVal.value)
}

async function handleAddButtonClick() {
  await refresh()
  await addChart()
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

const a = 1

</script>

<template>
  <div>
    <fe-row gutter="5" justify="start">
      <fe-col :span="7"><span style="font-weight: bold; font-size: 25px">图表汇总</span></fe-col>
      <fe-col :span="8">
        <fe-slider style="margin-top: 14px" v-model="dataNum" :max="300" />
      </fe-col>
      <fe-spacer :x=2 />
      <fe-col :span="0.5">
        <fe-button type="success" @click="handleRefreshButtonClick">刷新</fe-button>
      </fe-col>
      <fe-col :span="2">
        <fe-input placeholder="devEui" v-model="devEui" />
      </fe-col>
      <fe-col :span="1">
        <fe-select :value="typeVal" @change="changeHandler">
          <fe-option label="光照" :value="0"></fe-option>
          <fe-option label="温度" :value="1"></fe-option>
          <fe-option label="湿度" :value="2"></fe-option>
          <fe-option label="气压" :value="3"></fe-option>
        </fe-select>
      </fe-col>
      <fe-spacer :x=10 />
      <fe-col :span="1">
        <fe-button style="margin-top:2px" type="success" size="small" ghost @click="handleAddButtonClick">添加</fe-button>
      </fe-col>
    </fe-row>
  </div>
  <fe-grid-group :gap="2" justify="left">
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
        <LineChart :data="chartData" :options="options" :type="i" :key="index" />
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
