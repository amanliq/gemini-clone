<template>
  <div v-if="messages">
    <div>
      <div
        class="w-full pb-[24px] flex text-[1rem] font-400 fade-on-scroll transition-opacity duration-500 ease-in-out"
        :class="message.role == 'user' ? 'justify-end ' : ''"
        v-for="(message, index) in messages"
        :key="index"
      >
        <span
          v-if="message.role == 'user'"
          class="text-[#1b1c1d] bg-[#e9eef6] rounded-[24px_4px_24px_24px] px-[16px] py-[12px]"
        >
          {{ message.text }}</span
        >
        <span
          v-else
          class="text-[#1b1c1d] w-full px-[16px] py-[12px] flex md:flex-row flex-col gap-2 md:gap-7"
        >
          <span class="flex"
            ><template v-if="isSending && messages.length == index + 1"
              ><IconGeminiLoader
            /></template>
            <IconGemini v-else
          /></span>
          <span v-html="aiResponseToHTML(message.text)"></span>
        </span>
      </div>
      <div class="my-10 py-10" ref="chatMessagesRef"></div>
    </div>
  </div>
</template>

<script setup>
import IconGeminiLoader from "./icons/IconGeminiLoader.vue";
import IconGemini from "./icons/IconGemini.vue";
import { aiResponseToHTML } from "../utils/chat";
import { ref } from "vue";
defineProps(["messages", "isSending"]);

const chatMessagesRef = ref();

defineExpose({ chatMessagesRef });
</script>

<style scoped></style>
