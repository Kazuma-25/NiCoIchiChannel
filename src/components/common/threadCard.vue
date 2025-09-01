
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
    <div class="w-[87%]">
      <p class="text-[0.8rem] md:text-sm mb-2">{{ last }}</p>
      <router-link :to="`/read/${id}`" class="text-blue-500 hover:underline mt-2 inline-block">
        <h3 class="text-base md:text-lg font-bold mb-2">{{ title }} [{{ resNum }}]</h3>
      </router-link>
      <p class="text-[0.85rem] md:text-sm">{{ summary }}</p>
    </div>
    <div class="w-[13%]">
      <button
        @click="handleReportThread(id)"
        class="text-sm text-blue-500 align-baseline cursor-pointer">通報
      </button>
    </div>
  </div>
</template>
