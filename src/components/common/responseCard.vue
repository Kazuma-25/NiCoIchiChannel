
<script setup>
  defineProps(
    {
    tResObj:Object,
    idx:Number
    }
  )
  function reportThread(threadId){
    alert(threadId + 'ここに通報するときの処理を書く');
  }
</script>

<template>
  <div class="bg-blue-100 text-gray-600 rounded-xl shadow-md p-4 hover:shadow-lg transition mt-2 flex justify-between text-lg">
    <div class="text-left space-y-3 w-[90%]">
      <p>{{ idx }}. 投稿者：{{ tResObj.auther }}</p>
      <p class="pl-5 text-base">{{ tResObj.main }}</p>
    </div>
    <div class="w-[10%]">
      <button
      @click="reportThread(tResObj.id)"
      class="text-sm text-blue-500 align-baseline cursor-pointer">通報</button>
    </div>
  </div>
</template>
