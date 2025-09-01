<template>
  <button
    v-on="$attrs" 
    class="text-sm md:text-base w-max border-2 px-2 mr-5 bg-gray-100 hover:bg-gray-300 transition cursor-pointer rounded"
  >
    {{ sent }}
  </button>
</template>

<script setup>
  defineProps({sent:String})
</script>