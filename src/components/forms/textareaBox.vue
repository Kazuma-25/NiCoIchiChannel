<template>
  <textarea 
    :value="props.modelValue"
    @input="event => emit('update:modelValue', event.target.value)"
    :placeholder="props.placeholderSentence"
    class="pl-1 w-[100%] border-2 rounded-md h-100 text-base"
  >
  </textarea>
</template>

<script setup>
  const props = defineProps({
    modelValue:String,
    placeholderSentence:String
  })
  const emit = defineEmits(['update:modelValue'])
</script>