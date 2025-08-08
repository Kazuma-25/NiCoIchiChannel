
<script setup>
  defineProps(['id', 'title', 'summary', 'last', 'resNum'])
  function handleReportThread(threadId){
    emit('report',threadId)
  }
  const emit = defineEmits(['report'])

</script>

<template>
  <div 
    class="bg-blue-100 text-gray-600 rounded-xl shadow-md p-4 hover:shadow-lg transition mt-2 flex justify-between">
    <div>
      <p class="text-sm mb-2">{{ last }}</p>
      <router-link :to="`/read/${id}`" class="text-blue-500 hover:underline text-sm mt-2 inline-block">
        <h3 class="text-lg font-bold mb-2">{{ title }} [{{ resNum }}]</h3>
      </router-link>
      <p class=" text-sm">{{ summary }}</p>
      </div>
      <div>
        <button
        @click="handleReportThread(id)"
        class="text-sm text-blue-500 align-baseline cursor-pointer">通報</button>
      </div>
  </div>
</template>
