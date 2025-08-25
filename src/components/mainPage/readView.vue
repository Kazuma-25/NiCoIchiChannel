<!--
  スレ閲覧画面、
  /read/:スレID
-->

<template>
  <div class="w-[70%] pl-[10%] pr-[10%] bg-white p-8 rounded-2xl shadow-md">
    <div class="mt-4 text-gray-700 text-center text-xl">
      <!--タイトル-->
      <h1 class="font-bold text-3xl mb-5 bg-blue-300 py-3 rounded-xl">{{ threadTitleRef }}</h1>
      <!--ボタン郡-->
      <div class="flex justify-between">
        <div>
          <!--visibleChangeで渡す数値は新着件数-->
          <CommonButton @click="visibleNumChange(shortResponse)" :sent="`新着${shortResponse}件`" />
          <CommonButton @click="visibleNumChange(maxResponse)" sent="全件表示" />
        </div>
        <div>
          <CommonButton @click="browserBack()" sent="スレッド一覧に戻る" />
          <CommonButton @click='windowReload()' sent="↻" />
        </div>
      </div>
      <!--レスカード-->
      <div>
        <!-- 1件目 -->
        <ResponseCard
          v-if="responseData.length > 0"
          :tResObj="responseData[0]"
          :idx="1"
          @reply="setReply"
          @report="reportResponse"
        />
        <ScoreHr v-if="visibleNum !== 1" />

        <!-- 2件目以降 -->
        <ResponseCard
          v-for="(obj, idx_res) in responseData.slice(visibleNum,maxResponse)"
          :key="idx_res"
          :tResObj="obj"
          :idx="idx_res + visibleNum + 1"
          @reply="setReply"
          @report="reportResponse"
        />
        <!-- 打ち止め -->
        <ResponseCard
          v-if="responseData.length > maxResponse-1"
          :tResObj="endMsgJson"
          :idx="maxResponse+1"
          @reply="setReply"
          @report="reportResponse"
        />
      </div>
      <!--レス投稿フォーム-->
      <div
        ref="resInputArea"
        class="bg-blue-200 rounded-xl shadow-md p-4 pr-10 hover:shadow-lg transition mt-2 text-lg space-y-3"
        v-if="responseData.length < maxResponse-1"
        >
        <div class="flex justify-left">
          <p class="w-[20%] text-left">ハンドルネーム：</p>
          <InputBox v-model="handlenameInp" placeholderSentence="名無しの機材厨さん(任意)" />
        </div>
        <!--
        ______________________________________________________\
        不適切な画像投稿があった時に匿名うｐだと消せない＆
        1時間に50枚までの制約があるから一旦画像投稿はやめとく
        ______________________________________________________\
        <div class="flex">
            <p class="w-[20%] text-left">画像添付：</p>
            <input ref="imgFile" class="border-2 rounded-md bg-white px-2" type="file" accept=".jpg,.jpeg,.png">
          </div>
        -->
        <div class="flex">
          <p class="w-[10%] text-left">本文：</p>
          <TextareaBox v-model="mainSentenceInp" placeholderSentence="レス番号上の「>>」を押すことでリプができます！" />
        </div>
        <p class="text-sm text-right">{{ mainSentenceInp.length }}/1500</p>
        <div>
          <CommonButton @click="postResponse()" sent="投稿する" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  //テスト用、実際にはフェッチ処理
  //スレIDに一致するレスデータを取得 → 投稿日時順に並び替えって感じで
  import { baseUrl} from '@/js/utils/constants';
  import CommonButton from '@/components/common/commonButton.vue';
  import ResponseCard from '@/components/common/responseCard.vue';
  import ScoreHr from '@/components/layout/scoreHr.vue';

  import InputBox from '@/components/forms/inputBox.vue';
  import TextareaBox from '@/components/forms/textareaBox.vue';
  import {ref,onMounted} from 'vue';

  const handlenameInp = ref('');
  //const imgFile = ref('');
  const mainSentenceInp = ref ('');
  const resInputArea = ref(null);
  const threadTitleRef = ref('');
  const visibleNum = ref(1);

  const maxResponse = 250;
  const shortResponse = 50;

  const route = useRoute();
  const threadId = route.params.threadId;
  const endMsgJson = {
    threadId:threadId,
    auther_id:'_',
    authauther_name:'システム',
    body:`このスレは${maxResponse}を超えました!\n新しいスレッドを立ててください!`,
    img:''
  
  }
  //レスデータ取得
  const responseData = ref([])
  const fetchResponse = async()=>{
    const responseGetUrl = `${baseUrl}/get/responses/${threadId}`;
    const res = await fetch(responseGetUrl);
    const data = await res.json();
    responseData.value = data;
  }
  //スレデータ取得
  const threadData = ref([]);
  const fetchThread = async()=>{
    const threadGetUrl = `${baseUrl}/search/threads/${threadId}`;
    const res = await fetch(threadGetUrl);
    const data = await res.json();
    threadData.value =data;
    threadTitleRef.value = data[0].thread_title;
  }
  onMounted(async()=>{
    await fetchResponse();
    await fetchThread();
  });
  //表示件数変更
  function visibleNumChange(tNum){
    visibleNum.value=Math.max(1,responseData.value.length - tNum)
    console.log(visibleNum.value)
  }
  //スクロール
  function scrollInpArea(){
    resInputArea.value.scrollIntoView({
      behavior: "smooth",
    });
  }
  //更新
  async function windowReload(){
    await fetchResponse();
    await fetchThread();
  }
  //ブラウザバック
  function browserBack(){
    history.back();
  }
  //リプ
  function setReply(val){
    //1文字目のみ改行しない
    mainSentenceInp.value = mainSentenceInp.value + '\n'.repeat(Math.min(mainSentenceInp.value.length,1)) + val+ '\n';
    scrollInpArea();
  }
  //通報処理
  async function reportResponse(reportId){
    const tResponse = responseData.value.find(responseData => responseData.response_id == reportId);
    const reportText = window.prompt('通報理由を教えてください。')
    if(!reportText){
      alert('キャンセルします。')
      return
    }
    const reportMsg = '以下の内容を通報します。\nよろしいですか？\n\n'
      + '[投稿者]:' + tResponse.auther_name + '\n'
      + '[本文]:' + tResponse.body + '\n'
      + '[通報理由]:' + reportText
    const chkReport = window.confirm(reportMsg);
    //確認
    if(chkReport){
      //ここにpost処理(通報)********************
      const fetchReport = async() =>{
        const hashRes = await fetch(`${baseUrl}/createHashId`);
        const hashId = await hashRes.text();

        const reportResponseRegist = await fetch(`${baseUrl}/post/reportResponse`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body : JSON.stringify({
            responseId:tResponse.response_id,
            reportResponseReason:reportText,
            reporterId:hashId
          })
        })
        const reportData = await reportResponseRegist.json();
        console.log(reportData);
      }
      await fetchReport();
      //***************************************
      alert('通報しました。\nご協力ありがとうございます。')
    }else{
      alert('キャンセルします。')
    }
  }
  //投稿処理
  async function postResponse(){
    //本文の確認
    if(!mainSentenceInp.value){
      alert('本文がありません！');
      return
    }
    const main = mainSentenceInp.value;
    const mainMsg = '[本文]:' + main;

    const autherVal = handlenameInp.value || '名無しの機材厨さん';
    const autherMsg = '[投稿者]:' + autherVal;
    
    //const imgMsg ='[画像]:' + (imgFile.value.files.length? 'あり':'なし');
    //事前確認
    const chkMsg = '以下の内容で投稿します。\nよろしいですか？\n\n'
      + autherMsg + '\n'
      + mainMsg;
    const chkFlag = window.confirm(chkMsg);
    if(chkFlag){
      //ここにpost処理(投稿)***************
      const fetchResponse = async() =>{
        const hashRes = await fetch(`${baseUrl}/createHashId`);
        const hashId = await hashRes.text();
        
        const responseRegist = await fetch(`${baseUrl}/post/response`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          // 送信するデータ
          body: JSON.stringify({
            threadId:threadId,
            autherId:hashId,
            autherName:autherVal,
            body:main,
            img:''//IMGは無し
          })
        })
        const responseData = await responseRegist.json();
        console.log(responseData);
      };
      const patchData = async(threadId) =>{
        console.log(threadId);
        const fetchNewDate = await fetch(`${baseUrl}/patchNewDate/${threadId}`,{
          method:'PATCH'
        });
        if(!fetchNewDate.ok){
          console.log('Error_patchResponse')
        }else{
          console.log('レスのデータを書き換えました。')
        }
      };
      await fetchResponse();
      await patchData(threadId);
      //**********************************
      alert('投稿しました！');
      await windowReload();
        handlenameInp.value = '';
        mainSentenceInp.value = '';
    }else{
      alert('キャンセルします！');
    }
  
  }
  
</script>