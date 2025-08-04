<template>
  <div class="w-[70%] pl-[10%] pr-[10%] bg-white p-8 rounded-2xl shadow-md">
    <div class="mt-4 text-gray-700 text-center text-xl">
      <h1 class="font-bold text-3xl pb-5">{{ filteredThreads[threadId].title }}</h1>
      <div class="flex justify-between">
        <div>
          <CommonButton sent="新着50件" />
          <CommonButton sent="新着100件" />
          <CommonButton sent="全件表示" />
        </div>
        <CommonButton @click='windowReload()' sent="↻" />
      </div>
      
      <div>
        <ResponseCard
        v-for="(obj,idx_res) in responses" :key="idx_res" 
        :tResObj=obj 
        :idx='idx_res + 1'
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { filteredThreads,responses } from '@/js/utils/constants';
  import CommonButton from '../common/commonButton.vue';
  import ResponseCard from '../common/responseCard.vue';

  const route = useRoute();
  const threadId = route.params.threadId;
  
  function windowReload(){
    window.location.reload();
  }
</script>