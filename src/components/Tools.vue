<template>
  <div>
    <button
      class="gap-1 px-4 h-[40px] min-w-[64px] rounded-[30px] text-[0.875rem] font-medium text-[#575b5f] cursor-pointer hover:bg-custom-muted flex items-center justify-center"
      :disabled="isSending"
      @click="send"
    >
      <IconPageInfo />
      Tools
    </button>
  </div>
</template>

<script setup>
import IconPageInfo from "./icons/IconPageInfo.vue";
</script>

<style lang="scss" scoped></style>
