<template>
  <baseLayout>
    <template #mainBody>
      <!--各種ビュー-->
      <!--<homeView />-->
      <router-view :key="$route.fullPath" />
    </template>
  </baseLayout>
</template>

<script setup>
  import baseLayout from './components/layout/baseLayout.vue';
</script>

<style>
</style>
