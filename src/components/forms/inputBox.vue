<script setup>
  const props = defineProps({
    modelValue: String,
    placeholderSentence: String
  })
  const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="event => emit('update:modelValue', event.target.value)"
    class="border-2 rounded-md pl-1 w-full lg:max-w-[80%] bg-white text-sm "
    :placeholder="props.placeholderSentence"
  />
</template>