<script setup>
  const props = defineProps({
    modelValue:String,
    targetArray:{
      type:Array,
      required:true
    }
  });
  const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <select 
    :value="props.modelValue" 
    @change="event => emit('update:modelValue',event.target.value)"
    class="pl-1 lg:w-[40%] border-2 bg-gray-50 rounded-md">
    <option 
      v-for="(cmbTarget,idx_cmb) in props.targetArray" :key="idx_cmb"
      :value="cmbTarget"
      >
      {{ cmbTarget }}
    </option>
  </select>
</template>
