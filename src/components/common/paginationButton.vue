<template>
  <button
    v-on="$attrs"
    class="border-2 px-2 mr-5 bg-gray-100 hover:bg-gray-300 transition cursor-pointer rounded"
  >
    {{ pageNum }}
  </button>
</template>

<script setup>
  defineProps({pageNum:Number})
</script>