<template>
  <textarea 
    v-model="mainSentence"
    :placeholder="props.placeholderSentence"
    class="pl-1 w-[100%] border-2 rounded-md h-100 text-base"
    >
  </textarea>
</template>

<script setup>
  import {ref} from 'vue'
  const mainSentence = ref('');
  const props = defineProps({
    placeholderSentence:{
      type:String
    }
  })
  defineExpose({
    expMain:mainSentence
  });
</script>