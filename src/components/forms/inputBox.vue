<script setup>
  import { ref } from 'vue'
  const props = defineProps({
    placeholderSentence:{
      type:String
    }
  })
  const inputValue = ref('')
  defineExpose({
    inp:inputValue
  })
</script>

<template>
  <input
    v-model="inputValue"
    class="border-2 rounded-md pl-1 w-[80%]"
    :placeholder="props.placeholderSentence"
  />
</template>