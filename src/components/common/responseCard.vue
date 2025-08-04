
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
  <div class="bg-blue-100 text-gray-600 rounded-xl shadow-md p-4 pt-2 hover:shadow-lg transition mt-2 flex justify-between text-lg">
    <!--レス-->
    <div class="text-left w-[90%]">
      <button
        @click="reportThread(tResObj.id)"
        class="text-sm text-blue-500 align-baseline cursor-pointer">>>
      </button>
      <!--投稿view-->  
      <p>{{ idx }}. 投稿者：{{ tResObj.auther }}</p>
      <p class="pl-5 text-base">{{ tResObj.main }}</p>
    </div>
    <div class="w-[10%] flex flex-col justify-between">
      <!--通報-->
      <button
        @click="reportThread(tResObj.id)"
        class="text-sm text-blue-500 align-baseline cursor-pointer">通報
      </button>
    </div>
  </div>
</template>
