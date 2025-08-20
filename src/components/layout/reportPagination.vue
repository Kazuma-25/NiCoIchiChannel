<template>
  <div class="flex mt-5 mb-5 justify-center">
    <PaginationButton v-for="idx_pagination in 3"
      :key="idx_pagination"
      :pageNum="idx_pagination"
      @click="handlePgChange(idx_pagination)"
    />
  </div>
</template>

<script setup>
  import PaginationButton from '../common/paginationButton.vue';
  const emit = defineEmits(['pgChange'])
  function handlePgChange(pg){
    emit('pgChange',pg)
  }
</script>