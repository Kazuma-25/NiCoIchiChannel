<!--
  管理用画面、
  /administratorReportView
-->
<template>
  <div class="w-[70%] flex">
    <div class="w-[100%] bg-white p-8 rounded-2xl shadow-md">
      <div class="mt-4 text-gray-700">
        <div class="flex justify-end">
          <CommonButton sent="↻" @click="windowReload" />
          <CommonButton :sent="manage==1?'スレッド管理へ':'レス管理へ'" @click="manageChange" />
        </div>
        <p class="pb-5 text-3xl text-center font-bold">通報{{manage==0?'スレッド':'レス'}}一覧</p>
        <p class="pb-2 text-xl text-center font-bold">【{{ pgNum }}/3】</p>
        <reportPagination
          @pgChange="pageChange"
        />
        <!--スレッド管理-->
        <div
        v-if="manage==0"
        >
          <reportThreadCard 
            v-for="(threads , idx_thread) in threadData"
            @delete="deleteThread"
            @ignore="deleteReport"
            :key="idx_thread"
            :reportId="threads.report_thread_id"
            :id="threads.thread_id"
            :title="threads.thread_title"
            :summary="threads.summary"
            :reason="threads.report_thread_reason"
            :category="categories[threads.category_id]"
            :last="convertDate(threads.report_thread_at)"
          />
        </div>
        <!--レス管理-->
        <div
        v-if="manage==1"
        >
          <reportResponseCard
            v-for="(responses,idx_response) in responseData"
            @patch="patchResponseRequest"
            @ignore="deleteReportResponse"
            :key="idx_response"
            :reportId="responses.report_response_id"
            :threadId="responses.thread_id"
            :responseId="responses.response_id"
            :date="responses.report_response_at"
            :authorId="responses.auther_id"
            :author="responses.auther_name"
            :body="responses.body"
            :reason="responses.report_response_reason"
          />
        </div>
        <reportPagination />
      </div>
    </div>
  </div>
</template>


<script setup>
  import { ref,onMounted } from 'vue';
  import { categories } from '@/js/utils/constants';
  import { baseUrl } from '@/js/utils/constants';

  const pgNum = ref(1);
  //0→スレ管理、1→レス管理
  const manage = ref(0);
  let pass = "";

  import CommonButton from '../common/commonButton.vue';
  import reportThreadCard from '../common/reportThreadCard.vue';
  import reportPagination from '../layout/reportPagination.vue';
  import reportResponseCard from '../common/reportResponseCard.vue';
  //通報スレデータ取得
  const threadData = ref([]);
  const fetchThread = async(pass,pg)=>{
    const threadGetUrl = `${baseUrl}/get/reportThread/${pg}/${pass}`;
    console.log(threadGetUrl);
    const res = await fetch(threadGetUrl);
    const data = await res.json();
    threadData.value =data;
  }
  //通報レスデータ取得
  const responseData = ref([]);
  const fetchResponse = async(pass,pg)=>{
    const threadGetUrl = `${baseUrl}/get/reportResponse/${pg}/${pass}`;
    console.log(threadGetUrl);
    const res = await fetch(threadGetUrl);
    const data = await res.json();
    responseData.value =data;
  }
  //Initialize
  onMounted(async()=>{
    pass = prompt('パスワードを入力してください。');
    await fetchThread(pass,pgNum.value);
    await fetchResponse(pass,pgNum.value);
  })
  //更新
  async function windowReload(){
    await fetchThread(pass,pgNum.value);
    await fetchResponse(pass,pgNum.value);
  }
  //管理変更
  function manageChange(){
    if(manage.value===0){
      manage.value = 1;
      fetchResponse(pass,pgNum.value);
    }else{
      manage.value = 0;
      fetchThread(pass,pgNum.value);
    }
    console.log('manage:'+ manage.value)
  }
  //ページ変更
  async function pageChange(jumpPage){
    await fetchThread(pass,jumpPage);
    await fetchResponse(pass,jumpPage);
    pgNum.value = jumpPage;
  }
  //日本の時間に修正
  function convertDate(targetDate){
    const date = new Date(targetDate);
    return date.toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  //スレッド削除
   async function deleteThread(threadId){
    const targetThread = threadData.value.find(threadData=>threadData.thread_id==threadId);
    const reportMsg = '以下のスレッドを削除します\nよろしいですか？\n\n'
      + `[スレタイ]:${targetThread.thread_title}`
    const chkReport = window.confirm(reportMsg);
    if(chkReport){
      //ここにdelete処理(スレ)******************************
      //スレ削除すれば勝手に他のも消えるからおｋ
      const deleteThread = async()=>{
        const deleteThreadReq = await fetch(`${baseUrl}/deleteThread/${pass}/${targetThread.thread_id}`,{
          method:'DELETE'
        });
        if(!deleteThreadReq.ok){
          console.log('Error_deleteThread')
        }else{
          alert('スレッドを削除しました。')
          //データの再度読み込み(後続の処理がないからawait書いてない、この後増えたらそうする)
          fetchThread(pass,pgNum.value)
        }
      };
      await deleteThread();
      //*************************************************
    }else{
      alert('キャンセルします。')
    }
  }

  //スレッド通報のみ削除(ignore)
  async function deleteReport(reportId){
    const targetThread = threadData.value.find(threadData=>threadData.report_thread_id==reportId);
    const reportMsg = '以下の通報内容を削除します\nよろしいですか？\n\n'
      + `[スレタイ]:${targetThread.thread_title}`
    const chkReport = window.confirm(reportMsg);
    if(chkReport){
      //ここにdelete処理(通報)******************************
      const deleteReportThread = async()=>{
        const deleteThreadReq = await fetch(`${baseUrl}/deleteReportThread/${pass}/${targetThread.report_thread_id}`,{
          method:'DELETE'
        });
        if(!deleteThreadReq.ok){
          console.log('Error_deleteReport_thread')
        }else{
          alert('スレッドの通報データを削除しました。')
          //データの再度読み込み(後続の処理がないからawait書いてない、この後増えたらそうする)
          fetchThread(pass,pgNum.value)
        }
      };
      await deleteReportThread();
      //*************************************************
    }else{
      alert('キャンセルします。')
    }
  }

  //レスを書き換える→通報データ削除
  async function patchResponseRequest(resObj){
    const targetResponse = responseData.value.find(responseData=>responseData.report_response_id==resObj.reportId);
    console.log(targetResponse);
    const reportMsg = '以下のレスを書き換えます\nよろしいですか？\n\n'
      + `[投稿者]:${targetResponse.auther_name}\n`
      + `[投稿内容]:${targetResponse.body}`
    const chkReport = window.confirm(reportMsg);
    if(chkReport){
      //ここにpatch処理**********************************
      //レスの内容書き換え
      const patchResponse = async(responseId)=>{
        const deleteResponseReq = await fetch(`${baseUrl}/patchResponse/${pass}/${responseId}`,{
          method:'PATCH'
        });
        if(!deleteResponseReq.ok){
          console.log('Error_patchResponse')
        }else{
          console.log('レスのデータを書き換えました。')
          //通報データ削除
          await deleteReportResponse(resObj.reportId);
        }
      }
      await patchResponse(resObj.responseId);
      //*************************************************
    }else{
      alert('キャンセルします。')
    }
  }

  //通報データの削除
  async function deleteReportResponse(reportId){
    const targetResponse = responseData.value.find(responseData=>responseData.report_response_id==reportId);
    console.log(targetResponse);
    const reportMsg = '以下の通報内容を削除します\nよろしいですか？\n\n'
      + `[投稿者]:${targetResponse.auther_name}\n`
      + `[投稿内容]:${targetResponse.body}`
    const chkReport = window.confirm(reportMsg);
    if(chkReport){
      //ここにdelete処理(通報)******************************
      const deleteReportResponse = async()=>{
        const deleteResponseReq = await fetch(`${baseUrl}/deleteReportResponse/${pass}/${targetResponse.report_response_id}`,{
          method:'DELETE'
        });
        if(!deleteResponseReq.ok){
          console.log('Error_deleteReport_response')
        }else{
          console.log('レスの通報データを削除しました。')
          //データの再度読み込み(後続の処理がないからawait書いてない、この後増えたらそうする)
          fetchResponse(pass,pgNum.value);
        }
      };
      await deleteReportResponse();
      //*************************************************
    }else{
      alert('キャンセルします。')
    }
  }
</script>

