<script setup>
  const categories =[
    "🎸 ギター",
    "🎸 ベース",
    "🥁 ドラム",
    "🎚 エフェクター",
    "🔧 改造・パーツ総合",
    "🎹 シンセ・DTM",
    "🎤 マイク",
    "🧰 小物・アクセサリー総合",
    "🏠 宅録・スタジオ環境"
  ]
</script>

<template>
  <div class="text-lg w-[29%] mr-[1%] bg-white p-8 rounded-2xl shadow-md flex flex-col">
    <p class="text-xl mt-4 text-gray-700">【カテゴリ一】</p>
    <ul class=" pt-5 pl-3">
      <router-link :to="`/thread/${idx_cat}/1`" class="cursor-pointer space-y-5">
        <li v-for="(cat,idx_cat) in categories" :key="idx_cat">{{ cat }}</li>
      </router-link>
    </ul>
  </div>
</template>