<!--
  スレ立て確認画面、
  /preCheckThread
-->
<template>
  <div class="w-[95%] md:w-[80%] px-[10%] py-8 bg-white rounded-2xl shadow-md">
    <div class="mt-4 text-gray-700 text-left text-sm md:text-xl space-y-5">
      <p class="text-center font-bold text-2xl">【 確認 】</p>
      <hr class="pt-2 opacity-50 border-gray-500" />
      <!--PC-->
      <div class="space-y-5 hidden md:block">
        <div class="flex whitespace-break-spaces">
          <p class="w-[17%]">カテゴリ</p>  
          <p class="w-[3%]">：</p>
          <p class="w-[80%]">{{ category }}</p>
        </div>
        
        <div class="flex whitespace-break-spaces">
          <p class="w-[17%]">スレタイ</p>
          <p class="w-[3%]">：</p>
          <p class="w-[80%]">{{ threadTitle }}</p>
        </div>
        
        <div class="flex whitespace-break-spaces">
          <p class="w-[17%]">サマリー</p>
          <p class="w-[3%]">：</p>  
          <p class="w-[80%]">{{ summary }}</p>
        </div>

        <div class="flex whitespace-break-spaces">
          <p class="w-[17%]">ハンドルネーム</p>
          <p class="w-[3%]">：</p>
          <p class="w-[80%]">{{ handlename }}</p>
        </div>

        <div class="flex whitespace-break-spaces">
          <p class="w-[17%]">初回投稿</p>
          <p class="w-[3%]">：</p>
          <p class="w-[80%]">{{ firstSentence }}</p>
        </div>
      </div>
      <!--モバイル用-->
      <div class="space-y-5 lg:hidden">
        <div>
          <p>[カテゴリ]</p>
          <p>{{ category }}</p>
        </div>
        

        <div>
          <p>[スレタイ]</p>
          <p>{{ threadTitle }}</p>
        </div>
        

        <div>
          <p>[サマリー]</p>
          <p>{{ summary }}</p>
        </div>
        

        <div>
          <p>[ハンドルネーム]</p>
          <p>{{ handlename }}</p>
        </div>
        <div>
          <p>[初回投稿]</p>
          <p class="whitespace-break-spaces">{{ firstSentence }}</p>
        </div>
      </div>
      <hr class="pt-2 opacity-50 border-gray-500" />
      <p class="text-center">以上の内容でスレ立てしますか？</p>
      <div class="flex justify-center">
        <CommonButton @click="browserback()" sent="←戻る"/>
        <p class="w-[10%]"></p>
        <CommonButton @click="postThread()" sent="投稿→" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import CommonButton from '@/components/common/commonButton.vue';
  import {cmbCategories} from '@/js/utils/constants.js';
  import { baseUrl } from '@/js/utils/constants.js';
  import { useRouter } from 'vue-router';
  //定数
  const defaultHandlename = '名無しの機材厨さん';
  //
  const params = new URLSearchParams(window.location.search);
  const router = useRouter();
  const category = params.get('category');
  const threadTitle = params.get('threadTitle');
  const summary =  params.get('summary');
  const handlename =  params.get('handlename')||defaultHandlename;
  const firstSentence =  params.get('firstSentence');
  //ブラウザバック
  function browserback(){
    history.back();
  }
  //投稿
  async function postThread(){
    const hashRes = await fetch(`${baseUrl}/createHashId`);
    const hashId = await hashRes.text();
    //スレッド投稿
    const threadRegist = await fetch(`${baseUrl}/post/threads`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' // JSON データを送る場合はこれを指定
      },
      // 送信するデータ
      body: JSON.stringify({
        categoryId:cmbCategories.indexOf(category)-1,
        threadsTitle:threadTitle,
        summary:summary,
        autherHash:hashId,
        auther_name:handlename
      })
    })
    
    const threadData = await threadRegist.json();
    const threadId = threadData.threadId;
    console.log(threadData)

    //レス投稿
    const responseRegist = await fetch(`${baseUrl}/post/response`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // JSON データを送る場合はこれを指定
      },
      // 送信するデータ
      body: JSON.stringify({
        threadId:threadId,
        autherId:hashId,
        autherName:handlename,
        body:firstSentence,
        img:''
      })
    })
    
    const responseData = await responseRegist.json();
    console.log(responseData);
    alert('スレ立てしました！');
    //sessionStorage開放
    sessionStorage.clear();
    console.log('sessionStrage_Cleared!');
    //スレ一覧へ
    const jumpCat = cmbCategories.indexOf(category) -1;
    console.log(cmbCategories[jumpCat]);
    router.push(`/thread/${jumpCat}/1`)
  }

  
</script>