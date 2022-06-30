<script setup lang="ts">
import '@fect-ui/themes'
import { Button, ButtonGroup } from '@fect-ui/vue'
import { Edit3, X } from '@fect-ui/vue-icons'

</script>

<template>
  <ButtonGroup style="position:absolute; right:-10px; top:-10px" size="small">
    <Button auto>
      <template #icon>
        <Edit3 />
      </template>
    </Button>
    <Button auto @click="$emit('close')">
      <template #icon>
        <X />
      </template>
    </Button>
  </ButtonGroup>
</template>