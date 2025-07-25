<template>
  <div class="w-[90%] flex">
    <CategorySelector />
    <div class="w-[70%] bg-white p-8 rounded-2xl shadow-md">
      <div class="mt-4 text-gray-700">
        <div class="flex justify-end">
          <CommonButton sent="↻" @click="windowReload" />
          <CommonButton sent="スレッド作成" @click="threadCreateJump"/>
        </div>

        <p class="pb-5 text-lg text-center font-bold">【 1/5 】</p>
        <ThreadsPagination />
        
        <ThreadCard v-for="(threads , idx_thread) in testArr" :key="idx_thread"
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
  import CategorySelector from '../layout/categorySelector.vue';
  import CommonButton from '../common/commonButton.vue';
  import ThreadCard from '../common/threadCard.vue';
  import ThreadsPagination from '../layout/threadsPagination.vue';
  function threadCreateJump(){
    alert('ここにスレ立てページに飛ぶ処理を書く');
  }
  function windowReload(){
    window.location.reload();
  }
  const testArr =[
    {id:"1",
      title:"スレタイのテスト",
      summary:"ここは概要欄です。ちゃんと表示されるかの確認用",
      last:"2025-07-22 16:23",
      resNum:Math.floor(Math.random()*1000)
    },
    {id:"2",
      title:"スレタイのテスト2",
      summary:"ここは概要欄です2。ちゃんと表示されるかの確認用",
      last:"2025-07-25 16:34",
      resNum:Math.floor(Math.random()*1000)
    },
    {id:"3",
      title:"スレタイのテスト3",
      summary:"ここは概要欄です3。ちゃんと表示されるかの確認用",
      last:"2025-07-25 16:00",
      resNum:Math.floor(Math.random()*1000)
    },
    {id:"4",
      title:"スレタイのテスト4",
      summary:"ここは概要欄です4。ちゃんと表示されるかの確認用",
      last:"2025-07-25 16:14",
      resNum:Math.floor(Math.random()*1000)
    },
    {id:"5",
      title:"スレタイのテスト5",
      summary:"ここは概要欄です5。ちゃんと表示されるかの確認用",
      last:"2025-07-25 16:20",
      resNum:Math.floor(Math.random()*1000)
    },
    {id:"6",
      title:"スレタイのテスト6",
      summary:"ここは概要欄です6。ちゃんと表示されるかの確認用",
      last:"2025-07-25 16:15",
      resNum:Math.floor(Math.random()*1000)
    },
    {id:"7",
      title:"スレタイのテスト7",
      summary:"ここは概要欄です7。ちゃんと表示されるかの確認用",
      last:"2025-07-25 16:52",
      resNum:Math.floor(Math.random()*1000)
    },
    {id:"8",
      title:"スレタイのテスト8",
      summary:"ここは概要欄です8。ちゃんと表示されるかの確認用",
      last:"2025-07-25 16:32",
      resNum:Math.floor(Math.random()*1000)
    },
    {id:"9",
      title:"スレタイのテスト9",
      summary:"ここは概要欄です9。ちゃんと表示されるかの確認用",
      last:"2025-07-25 16:03",
      resNum:Math.floor(Math.random()*1000)
    },
    {id:"10",
      title:"スレタイのテスト10",
      summary:"ここは概要欄です10。ちゃんと表示されるかの確認用",
      last:"2025-07-25 16:20",
      resNum:Math.floor(Math.random()*1000)
    },
  ]
</script>

