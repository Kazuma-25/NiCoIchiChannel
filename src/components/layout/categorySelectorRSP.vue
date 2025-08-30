<script setup>
  import { categories } from '@/js/utils/constants';
</script>

<template>
  <div class="text-xl w-full bg-white p-5 rounded-2xl shadow-md flex flex-col">
    <p class="text-2xl text-gray-700 text-center mb-3">【カテゴリ一】</p>
    <div class="flex justify-center">
      <ul class="w-[40%]">
        <router-link 
          v-for="(cat,idx_cat) in categories.slice(0,Math.round(categories.length/2))" 
          :key="idx_cat"
          :to="`/thread/${idx_cat}/1`"
          class="cursor-pointer">
          <li class="mt-5">{{ cat }}</li>
        </router-link>
      </ul>
      <ul class="w-[40%]">
        <router-link 
          v-for="(cat,idx_cat) in categories.slice(Math.round(categories.length/2))" 
          :key="idx_cat"
          :to="`/thread/${idx_cat+Math.round(categories.length/2)}/1`"
          class="cursor-pointer">
          <li class="mt-5">{{ cat }}</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>