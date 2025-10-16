<template>
  <div
    class="h-screen text-[#1b1c1d] bg-[#f0f4f9] border-r border-[#f0f4f9] flex transition-all duration-300 ease-in-out md:relative absolute z-10"
  >
    <div class="pt-[80px] w-full flex flex-col">
      <div class="w-full justify-start mx-[12px] flex">
        <button
          @click="isSending ? null : $emit('new-chat')"
          class="flex gap-3 cursor-pointer items-center hover:bg-custom-muted h-[40px] text-[#575b5f]"
          :class="
            isOpen
              ? 'w-[calc(100%-54px)] px-[10px] rounded-[30px]'
              : 'w-[40px] rounded-[100%] justify-center'
          "
        >
          <IconEditSquare class="md:block hidden" />

          <span v-show="isOpen">New chat</span>
        </button>
      </div>
      <div v-show="isOpen" class="mt-[16px] px-[12px]">
        <h1 class="text-[#727676] leading-[24px] p-[8px] text-[1rem] font-400">
          Recent
        </h1>

        <div class="overflow-y-auto h-[calc(100vh-200px)]">
          <div
            class="hover:bg-custom-muted cursor-pointer rounded-[30px] h-[40px] w-full p-[8px] text-[#575b5f]"
            v-for="(chat, index) in recentChats"
            @click="onSelectChat(chat, index)"
            :key="index"
            :class="
              index == selectedChatIndex ? '!text-[#0842a0] bg-[#d3e3fd]' : ''
            "
          >
            <div class="leading-[20px] text-[0.875rem] font-medium">
              {{ chat.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import IconEditSquare from "./icons/IconEditSquare.vue";

defineProps(["isOpen", "recentChats", "isSending"]);
const emits = defineEmits(["selectChat"]);
const selectedChatIndex = ref();
const onSelectChat = (chat, index) => {
  selectedChatIndex.value = index;
  emits("selectChat", chat);
};
</script>

<style scoped></style>
