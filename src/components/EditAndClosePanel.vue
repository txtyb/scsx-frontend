<script setup lang="ts">
import { ref } from 'vue'
import '@fect-ui/themes'
import { Button, ButtonGroup, Modal } from '@fect-ui/vue'
import { Edit3, X, Save } from '@fect-ui/vue-icons'

const emit = defineEmits(['close', 'addNewNode', 'openChartImage'])

const show = ref(false)
const handlerClick = () => (show.value = true)
const formValue = ref({
  type: 0,
  devEui: '',
})

</script>

<template>
  <ButtonGroup style="position:absolute; right:-15px; top:-15px" size="small">
    <Button auto @click="handlerClick">
      <template #icon>
        <Edit3 />
      </template>
    </Button>
    <Button auto @click="$emit('openChartImage')">
      <template #icon>
        <Save />
      </template>
    </Button>
    <Button auto @click="$emit('close')">
      <template #icon>
        <X />
      </template>
    </Button>
  </ButtonGroup>
  <fe-modal :model="formValue" v-model:visible="show" width="500px" cancel="取消" done="确认" title="编辑图表">
    <fe-form label-position="left">
      <fe-form-item label="类型" disabled>
        <fe-select :value="formValue.type" width="5">
          <fe-option label="光照" :value="0"></fe-option>
          <fe-option label="气压" :value="1"></fe-option>
          <fe-option label="温度" :value="2"></fe-option>
          <fe-option label="湿度" :value="3"></fe-option>
        </fe-select>
      </fe-form-item>
      <fe-form-item label="添加新的节点">
        <fe-input v-model="formValue.devEui" placeholder="devEui"></fe-input>
        <fe-spacer inline :x="1" />
        <Button auto type="success" size="mini" @click="$emit('addNewNode', formValue.devEui)">
          添加
        </Button>
      </fe-form-item>
    </fe-form>
    <!-- <template #action>确认</template> -->
  </fe-modal>
</template>