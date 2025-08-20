
<script setup>
  defineProps(['id', 'title', 'summary', 'last','reason','category','reportId'])
  function handleDeleteThread(threadId){
    emit('delete',threadId)
  }
  function handleIgnoreThread(reportId){
    emit('ignore',reportId)
  }
  const emit = defineEmits(['delete','ignore'])

</script>

<template>
  <div 
    class="bg-blue-100 text-gray-600 rounded-xl shadow-md p-4 hover:shadow-lg transition mt-2 flex justify-between">
    <div>
      <p class="text-sm mb-2">通報日時 : {{ last }}</p>
      <router-link :to="`/read/${id}`" class="text-blue-500 hover:underline text-sm mt-2 inline-block">
        <h3 class="text-lg font-bold mb-2">{{ title }}</h3>
      </router-link>
      <p class=" text-sm pb-2">summary:{{ summary }}</p>
      <p class=" text-sm pb-2">カテゴリ:{{ category }}</p>
      <p class=" text-base text-red-500">通報理由 : {{ reason }}</p>
      </div>
      <div class="flex flex-col justify-between">
        <button
        @click="handleDeleteThread(id)"
        class="text-xl text-red-500 align-baseline cursor-pointer rounded-xl bg-pink-200 border-2 p-2">スレ削除</button>
        <button
        @click="handleIgnoreThread(reportId)"
        class="text-xl text-blue-500 align-baseline cursor-pointer rounded-xl bg-blue-50 border-2 p-2">許可</button>
      </div>
  </div>
</template>
