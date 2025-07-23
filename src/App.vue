<template>
  <baseLayout>
    <template #mainBody>
      <!--各種ビュー-->
      <!--<homeView />-->
      <router-view />
    </template>
  </baseLayout>
</template>

<script setup>
  import baseLayout from './components/layout/baseLayout.vue';
</script>

<style>
</style>
