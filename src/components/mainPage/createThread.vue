<!--
  スレ立て画面
  /create
-->
<template>
  <div class="w-[70%] pl-[10%] pr-[10%] bg-white p-8 rounded-2xl shadow-md">
    <div class="mt-4 text-gray-700 text-center text-xl">
      <p class="text-red-500 font-bold text-2xl pb-10">！スレッド作成時の注意事項！</p>
      <p>スレッド作成時には以下の注意事項を遵守してください！</p>
      <ol class="text-left space-y-7 whitespace-break-spaces pt-10">
        <li v-for="( caution , idx_caution ) in cautionArr" :key="idx_caution">
          {{ idx_caution +1 }}.{{ caution }}
        </li>
      </ol>
      <p class="text-left pt-10">
        この掲示板は、参加者ひとりひとりの投稿によって成り立っています。
        すべての利用者が気持ちよく交流できる場となるようご協力をお願いいたします。
        ご不明点や提案があれば、お気軽に運営までお知らせください。
      </p>
      <p class="pt-10 font-bold pb-15">それでは、良き音楽ライフを！</p>
      <!--五線譜的な-->
      <div class="pt-2 opacity-50 border-gray-500" v-for="(_,idx_hr) in 5" :key="idx_hr">
        <hr />
      </div>
      
      <!--投稿フォーム-->
      <p class="pt-10 pb-10">【投稿フォーム】</p>
      <div class="text-left space-y-10">
        <div class="flex">
          <p>カテゴリ：</p>
          <CmbBox v-model="cmbCat" :targetArray="cmbCategories" />
        </div>
        <div class="flex">
          <p class="w-[20%]">スレッドタイトル：</p>
          <InputBox v-model="threadTitleInp" placeholderSentence="空白禁止！" />
        </div>
        <div class="flex">
          <p class="w-[20%]">簡単な説明文：</p>
          <InputBox v-model="summaryInp" placeholderSentence="空白禁止！" />
        </div>
        <div class="flex">
          <p class="w-[20%]">ハンドルネーム：</p>
          <InputBox v-model="handlenameInp" placeholderSentence="名無しの機材厨さん" />
        </div>
        <div>
          <p class="w-[20%]">初回投稿：</p>
          <TextareaBox 
            v-model="firstSentenceTxt"
            placeholderSentence="初回書き込み。利用規約などはテンプレートも用意していますのでご利用ください！"
          />
          <p class="text-right text-sm">{{ firstSentenceTxt.length }}/1500</p>
        </div>
      </div>
      <div class="flex justify-between mt-15">
        <div>
          <CommonButton @click="browserback()" sent="スレ一覧に戻る"/>
          <CommonButton @click="allClear()" sent="入力内容をリセット"/>
        </div>
        <div>
          <CommonButton @click="temptateSentence()" sent="テンプレート入力"/>
          <CommonButton @click="nextPreCheck()" sent="作成"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref,onMounted } from 'vue';
  import CmbBox from '../forms/cmbBox.vue';
  import InputBox from '../forms/inputBox.vue';
  import CommonButton from '../common/commonButton.vue';
  import TextareaBox from '../forms/textareaBox.vue';
  import { cmbCategories } from '@/js/utils/constants';

  const cmbCat = ref('');
  const threadTitleInp = ref('');
  const summaryInp = ref('');
  const handlenameInp = ref('');
  const firstSentenceTxt =ref('')
  //状態保持
  function saveToSession() {
    sessionStorage.setItem('category', cmbCat.value);
    sessionStorage.setItem('threadTitle', threadTitleInp.value);
    sessionStorage.setItem('summary', summaryInp.value);
    sessionStorage.setItem('handlenameThread', handlenameInp.value);
    sessionStorage.setItem('firstSentence', firstSentenceTxt.value);
  }
  //状態復元
  onMounted(() => {
      const chkArr = [
        sessionStorage.getItem('category'),
        sessionStorage.getItem('threadTitle'),
        sessionStorage.getItem('summary'),
        sessionStorage.getItem('firstSentence')
      ]
      let i_sessStrage = 0
      chkArr.forEach((vl)=>{
        if(!vl){
          i_sessStrage++;
          console.log(vl);
        }
      })
      console.log('空白は' + i_sessStrage)
      if(i_sessStrage==0){
        console.log('復元します。')
        cmbCat.value = sessionStorage.getItem('category') || '';
        threadTitleInp.value = sessionStorage.getItem('threadTitle') || '';
        summaryInp.value = sessionStorage.getItem('summary') || '';
        handlenameInp.value = sessionStorage.getItem('handlenameThread') || '';
        firstSentenceTxt.value = sessionStorage.getItem('firstSentence') || '';
      }
  });
  //テスト用_入力取得
  function nextPreCheck(){
    const paramArr = [
      encodeURIComponent(cmbCat.value),
      encodeURIComponent(threadTitleInp.value),
      encodeURIComponent(summaryInp.value),
      encodeURIComponent(handlenameInp.value),
      encodeURIComponent(firstSentenceTxt.value),
    ]
    //入力チェック
    let i_inpCheck = 0
    const arrCat =['カテゴリ','スレタイ','サマリー','ハンネ','本文']
    paramArr.forEach((vl,idx_inpCheck) => {
      if(vl=='' && arrCat[idx_inpCheck]!=='ハンネ'){
        console.log(`error:empty=>${arrCat[idx_inpCheck]}`);
        i_inpCheck++;
      }else{
        console.log(arrCat[idx_inpCheck] + ':' + vl);
      }
    });
    if(i_inpCheck!==0){
      alert(`未入力箇所が${i_inpCheck}箇所あります！\nハンネ以外は必須事項です!`);
    }else{
      saveToSession();
      window.location=`/preCheckThread?category=${paramArr[0]}&threadTitle=${paramArr[1]}&summary=${paramArr[2]}&handlename=${paramArr[3]}&firstSentence=${paramArr[4]}`;
    }
  }
  //初回投稿のテンプレ入力
  async function temptateSentence(){
    const tmplPath = new URL('../others/createThreadTemplate.txt', import.meta.url).href
    try{
      const response = await fetch(tmplPath);
      if(!response.ok) throw new Error;

      const tmpl = await response.text()
      firstSentenceTxt.value = tmpl
    }catch(error){
      console.log(error)
    }
  }
  //ブラウザバック
  function browserback(){
    history.back();
  }
  //削除
  function allClear(){
    cmbCat.value = '';
    threadTitleInp.value = '';
    summaryInp.value = '';
    handlenameInp.value = '';
    firstSentenceTxt.value = '';
  }

  //注意書き
  const cautionArr = [
    "スレッドの目的を明確に定義すること。\n  投稿者が取り上げたいテーマ、話題の範囲を具体的に記載してください。\n  曖昧な主旨は議論の混乱を招く可能性があります。",
    "重複スレッドの有無を事前に確認すること。\n  類似したスレッドが既に存在する場合は、そちらへの参加を優先してください。\n  無秩序なスレッド乱立は掲示板の可読性を損ないます。",
    "参加者の多様性に配慮すること。初心者から熟練者まで幅広い層が閲覧・参加するため、\n  専門用語の使用には適切な注釈を付けるなど配慮をお願いします。",
    "感情的・衝動的なスレッド立てを控えること。一時の感情や興奮に任せた投稿は、\n  後のトラブルの原因となる場合があります。冷静に検討したうえでスレッドを立ててください。",
    "機材等情報の投稿に際しては、精度と正確性を最優先してください。\n  誤情報の拡散は掲示板の信頼性を損なう恐れがあります。",
    "過度な自己主張や宣伝行為は慎むこと。自作品や製品への言及はOKですが、\n  商用目的や一方的な宣伝と受け取られかねない内容は避けましょう。",
    "公序良俗に反する表現、過激な内容、またはカテゴリの趣旨と無関係なタイトル\n  （例：性的表現、無関係な話題 等）は削除の対象となる場合があります。"
  ];
</script>