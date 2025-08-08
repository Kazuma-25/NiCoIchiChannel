
<script setup>
  defineProps(
    {
    tResObj:Object,
    idx:Number
    }
  )
  const emit = defineEmits(['reply','report']);
  function handleReply(tIdx){
    emit('reply','>>' +  tIdx );
  }
  function reportThread(responseId){
    emit('report',responseId)
  }
</script>

<template>
  <div class="bg-blue-100 text-gray-600 rounded-xl shadow-md p-4 pt-2 hover:shadow-lg transition mt-2 flex justify-between text-lg">
    <!--レス-->
    <div class="text-left w-[90%]">
      <button
        @click="handleReply(idx)"
        class="text-sm text-blue-500 align-baseline cursor-pointer">>>
      </button>
      <!--投稿view-->  
      <p>
        {{ idx }}.
        投稿者：{{ tResObj.auther }}
        {{ tResObj.postDay }}
      </p>
      <p class="pt-5 pl-5 text-base">{{ tResObj.main }}</p>
      <p class="text-sm text-right pt-3">ID:[{{ tResObj.autherId }}]</p>
    </div>
    <div class="w-[10%] flex flex-col justify-between">
      <!--通報-->
      <button
        @click="reportThread(tResObj.responseId)"
        class="text-sm text-blue-500 align-baseline cursor-pointer">通報
      </button>
    </div>
  </div>
</template>
