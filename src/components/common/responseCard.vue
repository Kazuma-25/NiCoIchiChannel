
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
        投稿者：{{ tResObj.auther_name }}
        （{{ convertDate(tResObj.posted_at) }}）
      </p>
      <p class="pt-5 pl-5 text-base whitespace-break-spaces" v-html='tResObj.body'></p>
      <p class="text-sm text-right pt-3">ID:[{{ omitId(tResObj.auther_id) }}]</p>
    </div>
    <div class="w-[10%] flex flex-col justify-between">
      <!--通報-->
      <button
        @click="reportThread(tResObj.response_id)"
        class="text-sm text-blue-500 align-baseline cursor-pointer">通報
      </button>
    </div>
  </div>
</template>
