<template>
  <div class="pb-5 pt-5 min-h-screen bg-blue-200 flex flex-col justify-start items-center">
    <!--logo-->
    <a href="/">
      <img class="mb-6 rounded-2xl mt-1" src="../../assets/logo.png" />
    </a>
    <!--本文-->
    <slot name="mainBody"></slot>
  </div>  
</template>