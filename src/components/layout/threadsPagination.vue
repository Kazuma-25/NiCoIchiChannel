<template>
  <div class="flex mt-5 mb-5 justify-center">
    <PaginationButton v-for="idx_pagination in 5"
      :key="idx_pagination"
      :pageNum="idx_pagination"
      @click="testClick"
    />
  </div>
</template>

<script setup>
  import PaginationButton from '../common/paginationButton.vue';
  function testClick(){
    alert("ここにページを指定して飛ぶ処理書く");
  }
</script>