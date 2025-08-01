<template>
  <div class="flex mt-5 mb-5 justify-center">
    <PaginationButton v-for="idx_pagination in 5"
      :key="idx_pagination"
      :pageNum="idx_pagination"
      @click="pageChange(idx_pagination)"
    />
  </div>
</template>

<script setup>
  import PaginationButton from '../common/paginationButton.vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  //ページ変更
  function pageChange(pgN){
    const catN = route.params.cat;
    window.location=`../${catN}/${pgN}`;
  }
</script>