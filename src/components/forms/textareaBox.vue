<template>
  <textarea 
    :value="props.modelValue"
    @input="event => emit('update:modelValue', event.target.value)"
    :placeholder="props.placeholderSentence"
    class="pl-1 w-[100%] border-2 rounded-md h-60 md:h-100 text-sm md:text-base bg-white"
    maxlength="1500"
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