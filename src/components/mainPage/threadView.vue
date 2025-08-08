<template>
  <div class="w-[90%] flex">
    <CategorySelector />
    <div class="w-[70%] bg-white p-8 rounded-2xl shadow-md">
      <div class="mt-4 text-gray-700">
        <div class="flex justify-end">
          <CommonButton sent="↻" @click="windowReload" />
          <CommonButton sent="スレッド作成" @click="threadCreateJump"/>
        </div>
        <p class="pb-5 text-3xl text-center font-bold">{{ categories[catNum] }}_スレッド一覧</p>
        <p class="pb-2 text-xl text-center font-bold">【{{ pgNum }}/5】</p>
        <ThreadsPagination />
        <!--
        実装前に表示する件数に上限を設けるorフィルター処理した配列を作る（こっちの方がよさげ）
        最終更新日時で並べ替え → ページに合わせて絞り込み処理
        が安牌かな？
        -->
        <ThreadCard v-for="(threads , idx_thread) in threadData"
          @report="reportThread"
          :key="idx_thread"
          :id="threads.thread_id"
          :title="threads.thread_title"
          :summary="threads.summary"
          :last="convertDate(threads.update_at)"
          :resNum="threads.res_count"
        />
        <ThreadsPagination />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref,onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { categories } from '@/js/utils/constants';
  import { baseUrl } from '@/js/utils/constants';
  const route = useRoute();

  const catNum = Number(route.params.cat);
  const pgNum = Number(route.params.pg);

  import CategorySelector from '../layout/categorySelector.vue';
  import CommonButton from '../common/commonButton.vue';
  import ThreadCard from '../common/threadCard.vue';
  import ThreadsPagination from '../layout/threadsPagination.vue';

  //スレデータ取得
  const threadData = ref([]);
  const fetchThread = async()=>{
    const threadGetUrl = `${baseUrl}/get/threads/${catNum}/${pgNum}`;
    console.log(threadGetUrl);
    const res = await fetch(threadGetUrl);
    const data = await res.json();
    threadData.value =data
  }
  onMounted(fetchThread)

  function threadCreateJump(){
    window.location="/create";
  }
  
  function windowReload(){
    window.location.reload();
  }

  function convertDate(targetDate){
    const date = new Date(targetDate);
    return date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  }
  //通報
  function reportThread(threadId){
    const targetThread = threadData.value.find(threadData=>threadData.thread_id==threadId);
    const reportText = window.prompt('通報理由を教えてください。');
    if(!reportText){
      alert('キャンセルします。')
      return
    }
    const reportMsg = '以下の内容で通報します\nよろしいですか？\n\n'
      + `[スレタイ]:${targetThread.thread_title}\n`
      + `[通報理由]:${reportText}`
    const chkReport = window.confirm(reportMsg);
    if(chkReport){
      //ここにPOST処理(通報)******************************
      
      //*************************************************
      alert('通報しました。\nご協力ありがとうございました。')
    }else{
      alert('キャンセルします。')
    }
  }
</script>

