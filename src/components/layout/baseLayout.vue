<template>
  <div class="pb-5 pt-5 min-h-screen bg-blue-200 flex flex-col justify-start items-center">
    <!--logo-->
    <a href="/" class="w-[90%] md:w-full mb-6 mt-1 flex justify-center" >
      <img class="rounded-2xl" src="../../assets/logo.png" />
    </a>
    <!--本文-->
    <slot name="mainBody"></slot>
  </div>  
</template>