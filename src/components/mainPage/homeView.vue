<!--
  ホーム画面
  /
-->
<template>
  <div class="w-[90%] lg:flex">
    <categorySelectorRSP class="mb-2 lg:hidden" />
    <categorySelector class="hidden lg:block" />
    <welcome-message />
  </div>
</template>

<script setup>
  import categorySelectorRSP from '@/components/layout/categorySelectorRSP.vue';
  import categorySelector from '@/components/layout/categorySelector.vue';
  import welcomeMessage from '@/components/layout/welcomeMessage.vue';
</script>

