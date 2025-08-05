<template>
  <div class="w-[70%] pl-[10%] pr-[10%] bg-white p-8 rounded-2xl shadow-md">
    <div class="mt-4 text-gray-700 text-center text-xl">
      <!--タイトル-->
      <h1 class="font-bold text-3xl pb-5">{{ filteredThreads[threadId].title }}</h1>
      <!--ボタン郡-->
      <div class="flex justify-between">
        <div>
          <CommonButton sent="新着50件" />
          <CommonButton sent="新着100件" />
          <CommonButton sent="全件表示" />
        </div>
        <CommonButton @click='windowReload()' sent="↻" />
      </div>
      <!--レスカード-->
      <div>
        <ResponseCard
          v-for="(obj,idx_res) in responses" :key="idx_res" 
          @reply="setReply"
          @report="reportResponse"
          :tResObj=obj 
          :idx='idx_res + 1'
        />
      </div>
      <!--レス投稿フォーム-->
      <div ref="resInputArea" class="bg-blue-200 rounded-xl shadow-md p-4 pr-10 hover:shadow-lg transition mt-2 text-lg space-y-3">
        <div class="flex justify-left">
          <p class="w-[20%] text-left">ハンドルネーム：</p>
          <InputBox v-model="handlenameInp" placeholderSentence="名無しの機材厨さん(任意)" />
        </div>
        <div class="flex">
          <p class="w-[20%] text-left">画像添付：</p>
          <input ref="imgFile" class="border-2 rounded-md bg-white px-2" type="file" accept=".jpg,.jpeg,.png">
        </div>
        <div class="flex">
          <p class="w-[10%] text-left">本文：</p>
          <TextareaBox v-model="mainSentenceInp" placeholderSentence="誹謗中傷はしないでください！" />
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
  import { filteredThreads,responses } from '@/js/utils/constants';
  import CommonButton from '../common/commonButton.vue';
  import ResponseCard from '../common/responseCard.vue';

  import InputBox from '../forms/inputBox.vue';
  import TextareaBox from '../forms/textareaBox.vue';
  import {ref} from 'vue';

  const handlenameInp = ref('');
  const imgFile = ref('');
  const mainSentenceInp = ref ('');
  const resInputArea = ref(null);

  const route = useRoute();
  const threadId = route.params.threadId;
  
  //スクロール
  function scrollInpArea(){
    resInputArea.value.scrollIntoView({
      behavior: "smooth",
    });
  }
  //更新
  function windowReload(){
    window.location.reload();
  }
  //リプ
  function setReply(val){
    //1文字目のみ改行しない
    mainSentenceInp.value = mainSentenceInp.value + '\n'.repeat(Math.min(mainSentenceInp.value.length,1)) + val+ '\n';
    scrollInpArea();
  }
  //通報処理
  function reportResponse(reportId){
    const tResponse = responses.find(responses => responses.responseId == reportId);
    const reportMsg = '以下の内容を通報します。\nよろしいですか？\n\n'
      + '[投稿者]:' + tResponse.auther + '\n'
      + '[本文]:' + tResponse.main
    const chkReport = window.confirm(reportMsg);
    //確認
    if(chkReport){
      //ここにpost処理(通報)********************

      //***************************************
      alert('通報しました。\nご協力ありがとうございます。')
    }else{
      alert('キャンセルします。')
    }
  }
  //投稿処理
  function postResponse(){
    //本文の確認
    if(!mainSentenceInp.value){
      alert('本文がありません！');
      return
    }
    const main = '[本文]:' + mainSentenceInp.value;
    const autherVal = '[投稿者]:' + handlenameInp.value || '名無しの機材厨さん';
    const imgMsg ='[画像]:' + (imgFile.value.files.length? 'あり':'なし');
    //事前確認
    const chkMsg = '以下の内容で投稿します。\nよろしいですか？\n\n'
      + autherVal + '\n'
      + imgMsg + '\n'
      + main;
    const chkFlag = window.confirm(chkMsg);
    if(chkFlag){
      //ここにpost処理(投稿)***************
      
      //**********************************
      alert('投稿しました！');
      windowReload();
    }else{
      alert('キャンセルします！');
    }
  
  }
  
</script>