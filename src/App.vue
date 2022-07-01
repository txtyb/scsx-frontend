<script setup lang="ts">
import LineChart from './components/LineChart.vue'
import { onBeforeMount, onMounted, ref, h } from 'vue'

const dataNum = ref(100)
const devEui = ref('009569000000F51D')
const typeVal = ref(0)
const changeHandler = (e: number) => (typeVal.value = e)
let chartKeyId = 0

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

class ChartDataObject {
  data: Array<any>
  options: object
  type: number
  devEui: Array<string>
  id: number
  url: string

  constructor(data: Array<any>, options: Object, type: number, devEui: string, keyId: number) {
    this.data = data
    this.options = options
    this.type = type
    this.devEui = []
    this.devEui.push(devEui)
    console.log(`this.devEui=${this.devEui}`)
    this.id = keyId
    this.url = ''
  }
  async refresh() {
    let devEuiParams = ''
    for (let i of this.devEui) {
      devEuiParams += `&devEui=${i}`
    }
    console.log(`devEuiParams=${devEuiParams}`)
    let url = 'https://scsx-serverless.vercel.app/api/getDevice' + '?n=' + dataNum.value + '&type=' + this.type + devEuiParams
    try {
      let response = await fetch(url, {
        method: "get",
      });
      this.data = await response.json()
      // console.log(`get data=${chartData.value}`)
    } catch (error) {
      console.log('get data failed', error)
    }
    console.log('refresh done!')
    genDate(this.data)
    // console.log(`after gen=${chartData.value}`)
  }
  updateDevEuiList = async (newDevEui: string) => {
    console.log('Add new devEui!')
    console.log(`newDevEui=${newDevEui}`)
    console.log(`this.devEui=${this.devEui}`)
    this.devEui.push(newDevEui)
  }
  handleAddNewNode = async (newDevEui: string) => {
    await this.updateDevEuiList(newDevEui)
    await new Promise(r => setTimeout(r, 500))
    await this.refresh()
  }
  updateUrl = async (url: string) => {
    this.url = url
    console.log('image url returned.')
  }
  openImageUrl = () => {
    let newTab = window.open()
    newTab!.document.body.innerHTML = `<img src="${this.url}">`;
  }
}

const chartObjectList = ref<Array<ChartDataObject>>([])

// chartObjectList.value.push(new ChartDataObject(data, options, 0, '009569000000F51D'))
// chartObjectList.value.push(new ChartDataObject(data, options, 2, '009569000000F51D'))
// chartObjectList.value.push(new ChartDataObject(data, options, 1, '009569000000F51D'))
// chartObjectList.value.push(new ChartDataObject(data, options, 3, '009569000000F51D'))

const autoRefresh = ref(false)

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

function autoRefreshSwitch(this: any) {
  autoRefresh.value = !autoRefresh.value
  console.log(autoRefresh.value);
  if (!autoRefresh.value) {
    clearInterval(this.autoRefreshInterval);
    console.log("Auto refresh disabled");
  } else {
    this.autoRefreshInterval = setInterval(() => {
      refresh();
    }, 5000);
    console.log("Auto refresh enabled");
  }
}

async function refresh() {
  for (let i of chartObjectList.value) {
    i.refresh()
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
  // chartTypeList.value.push(typeVal.value)
  // let data = ref<Array<any>>([])
  // chartDataList.value.push(data)
  let chartDataObject = new ChartDataObject(new Array<any>(), options, typeVal.value, devEui.value, chartKeyId)
  chartKeyId++
  chartObjectList.value.push(chartDataObject)

}

async function handleAddButtonClick() {
  await addChart()
  await refresh()
  // await handleTest()
  // await test()
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
  <fe-grid-group :gap="1" justify="center" alignItems="center">
    <fe-grid :md="4" :xs="6"><span style="font-weight: bold; font-size: 25px">图表汇总</span></fe-grid>
    <fe-grid :md="5" :xs="18">
      <fe-slider v-model="dataNum" :max="300" @click="refresh" />
    </fe-grid>
    <!-- <fe-spacer :x=2 /> -->
    <fe-grid :md="1.5" :xs="12">
      <fe-button auto type="success" @click="handleRefreshButtonClick">刷新</fe-button>
    </fe-grid>
    <fe-grid :md="1.5" :xs="12">
      <fe-button auto load-type="cube" :loading="autoRefresh" @click="autoRefreshSwitch">自动刷新</fe-button>
    </fe-grid>
    <fe-grid :md="2" justify="flex-end" :xs="4">
      <span>devEui</span>
    </fe-grid>
    <fe-grid :md="2" :xs="10">
      <fe-input placeholder="devEui" v-model="devEui" />
    </fe-grid>
    <fe-grid :md="3" :xs="10">
      <fe-select width="5" :value="typeVal" @change="changeHandler">
        <fe-option label="光照" :value="0"></fe-option>
        <fe-option label="气压" :value="1"></fe-option>
        <fe-option label="温度" :value="2"></fe-option>
        <fe-option label="湿度" :value="3"></fe-option>
      </fe-select>
    </fe-grid>
    <!-- <fe-spacer :x=3 /> -->
    <fe-grid :md="1" :xs="24">
      <fe-button auto style="margin-top:2px" type="success" size="small" ghost @click="handleAddButtonClick">添加
      </fe-button>
    </fe-grid>
  </fe-grid-group>
  <fe-grid-group :gap="2" justify="flex-start">
    <fe-grid v-for="(i, index) in chartObjectList" :xs="24" :md="12">
      <fe-card class="chart" shadow>
        <LineChart :data="i.data" :options="i.options" :type="i.type" :key="i.id"
          @close="chartObjectList.splice(index, 1)" @add-new-node="i.handleAddNewNode" @return-url="i.updateUrl"
          @open-chart-image="i.openImageUrl" />
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
