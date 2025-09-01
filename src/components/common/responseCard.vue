
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
  //日本の時間に修正
  function convertDate(targetDate){
    const date = new Date(targetDate);
    return date.toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }
  //IDの省略、先頭5文字+末尾5文字
  function omitId(tId){
    return tId.substr(0,5)+tId.substr(tId.length-5)
  }
</script>

<template>
  <div class="bg-blue-100 text-gray-600 rounded-xl shadow-md p-2 md:p-4 hover:shadow-lg transition mt-2 ">
    <!--レス-->
    <div class="text-left w-[100%] flex flex-col items-center">
      <div class="w-full flex justify-between">
        <button
          @click="handleReply(idx)"
          class="text-sm text-blue-500 align-baseline cursor-pointer">>>
        </button>
        <!--通報-->
        <button
          @click="reportThread(tResObj.response_id)"
          class="text-sm text-blue-500 align-baseline cursor-pointer">通報
        </button>
      </div>
      <!--投稿view-->
      <div class="w-full">
        <p class="text-sm md:text-lg text-left">
          {{ idx }}.
          投稿者：{{ tResObj.auther_name }}
          （{{ convertDate(tResObj.posted_at) }}）
        </p>
      </div>
      <p class="w-full pt-3 pl-3 md:pt-5 md:pl-5 text-sm md:text-base whitespace-break-spaces" v-html='tResObj.body'></p>
      <p class="w-full text-sm text-right pt-3">ID:[{{ omitId(tResObj.auther_id) }}]</p>
    </div>
  </div>
</template>
