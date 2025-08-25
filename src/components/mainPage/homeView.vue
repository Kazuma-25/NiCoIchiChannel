<!--
  ホーム画面
  /
-->
<template>
  <div class="w-[90%] flex">
    <categorySelector />
    <welcome-message />
  </div>
</template>

<script setup>
  import categorySelector from '@/components/layout/categorySelector.vue';
  import welcomeMessage from '@/components/layout/welcomeMessage.vue';
</script>

