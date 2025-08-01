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
  <div class="text-xl w-[29%] mr-[1%] bg-white p-8 rounded-2xl shadow-md flex flex-col">
    <p class="text-2xl mt-4 text-gray-700">【カテゴリ一】</p>
    <ul class=" pt-5 pl-3">
      <router-link 
      v-for="(cat,idx_cat) in categories" 
      :key="idx_cat"
      :to="`/thread/${idx_cat}/1`"
      class="cursor-pointer">
        <li class="mt-5">{{ cat }}</li>
      </router-link>
    </ul>
  </div>
</template>