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
  import { useRoute,useRouter } from 'vue-router';
  const route = useRoute();
  const router = useRouter();
  //ページ変更
  function pageChange(pgN){
    const catN = route.params.cat;
    router.push('../${catN}/${pgN}');
    //window.location=`../${catN}/${pgN}`;
  }
</script>