<template>
  <div class="w-[90%] flex">
    <CategorySelector />
    <div class="w-[70%] bg-white p-8 rounded-2xl shadow-md">
      <div class="mt-4 text-gray-700">
        <div class="flex justify-end">
          <CommonButton sent="↻" @click="windowReload" />
          <CommonButton sent="スレッド作成" @click="threadCreateJump"/>
        </div>
        <p class="pb-5 text-3xl text-center font-bold">{{ categories[catNum] }}_スレッド一覧</p>
        <p class="pb-2 text-xl text-center font-bold">【{{ pgNum }}/5】</p>
        <ThreadsPagination />
        <!--
        実装前に表示する件数に上限を設けるorフィルター処理した配列を作る（こっちの方がよさげ）
        最終更新日時で並べ替え → ページに合わせて絞り込み処理
        が安牌かな？
        -->
        <ThreadCard v-for="(threads , idx_thread) in filteredThreads"
          :key="idx_thread"
          :id="threads.id"
          :title="threads.title"
          :summary="threads.summary"
          :last="threads.last"
          :resNum="threads.resNum"
        />

        <ThreadsPagination />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import { categories } from '@/js/utils/constants';
  import { filteredThreads } from '@/js/utils/constants';
  const route = useRoute();

  const catNum = Number(route.params.cat);
  const pgNum = Number(route.params.pg);

  import CategorySelector from '../layout/categorySelector.vue';
  import CommonButton from '../common/commonButton.vue';
  import ThreadCard from '../common/threadCard.vue';
  import ThreadsPagination from '../layout/threadsPagination.vue';
  function threadCreateJump(){
    window.location="/create";
  }
  function windowReload(){
    window.location.reload();
  }
</script>

