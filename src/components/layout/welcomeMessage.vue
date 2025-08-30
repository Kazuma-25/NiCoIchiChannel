<template>
  <div class="text-lg w-full bg-white p-8 rounded-2xl shadow-md">
    <div class="mt-4 text-gray-700">
      <p>ようこそ、2-5-1Channelへ。</p>
      <p>機材を語り、機材に騙られ、気づけば財布が空になる。  </p>
      <p>ここは音楽機材沼の住人たちが集う終着点〈トニック〉。  </p>
      <p>そして始まりでもある。  </p>
      <p>これから沼に足を踏み入れるあなたも、心ゆくまで語れる場所です。</p>
      <p>例えば──  </p>
      <p>「この年代の機材が…」  </p>
      <p>「この配線、このパーツを変えたら…」  </p>
      <p>etc... etc... and more...</p>

      <br>
      <p>---</p>
      <br>
      
      <p>この掲示板は、音楽機材に関する情報交換・雑談・質問などを自由に語り合う場です。  </p>
      <p>ギター、ベース、ドラム、エフェクター、改造、DTM、宅録環境まで──  </p>
      <p>機材にまつわるあらゆる話題を歓迎します。初心者もベテランも、どうぞご自由に。</p>

      <br>
      <p>---</p>
      <br>
      
      <p class="font-bold">※ご利用にあたってのお願い</p>
      <p>・誹謗中傷、荒らし、煽り行為は本当に面倒くさいことになるのでやめてください。  </p>
      <p>・機材の好みは人それぞれ。宗教戦争はほどほどに。  </p>
      <p>・個人情報の書き込みは禁止です。  </p>
      <p>・スレッドの趣旨に沿った投稿を心がけましょう。  </p>
      <p>・不適切な投稿は削除対象となる場合があります。</p>
      <p>・購入前には財布と相談を。ご利用は計画的に。  </p>
      <p>・機材は時に個人情報となり得ます。写真の取り扱いには十分ご注意ください。</p>

      <br>
      <p>---</p>
      <br>
      
      <p>音楽機材沼は深く、広く、そして楽しい。  </p>
      <p>あなたの一言が、誰かの音作りを変えるかもしれません。  </p>
      <p>それでは、良い機材沼ライフを──</p>
      <p class="pt-6 text-right font-semibold text-sm text-gray-600">▶ カテゴリを選択してスレッドを探してみましょう！</p>
      <p class="text-white text-sm text-right" @click="adminJump()">kanrigamen</p>
    </div>
  </div>
</template>
<script setup>
  import {useRouter} from 'vue-router'
  const router = useRouter();
  function adminJump(){
    router.push('/administratorReportView')
  }
</script>