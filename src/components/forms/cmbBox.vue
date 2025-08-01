<script setup>
  import { ref } from 'vue'
  const props = defineProps({
    targetArray:{
      type:Array,
      required:true
    }
  });
  const exposeSentence = ref('');
  defineExpose({
    expCmb:exposeSentence
  })
</script>

<template>
  <select v-model="exposeSentence" class="pl-1 w-[40%] border-2 bg-gray-50 rounded-md">
    <option v-for="(cmbTarget,idx_cmb) in props.targetArray" :key="idx_cmb">
      {{ cmbTarget }}
    </option>
  </select>
</template>
