<template>
  <div
    class="max-w-[760px] w-full p-[10px]"
    :class="isNewChat ? 'bottom-[50%]' : 'bottom-[15%]'"
  >
    <div
      class="rounded-[24px] w-full shadow-custom-soft border border-solid border-[#c4c7c5] text-[#1b1c1d] p-[8px] bg-white"
    >
      <div class="px-[12px] py-[calc((42px-24px)/2)] mb-[8px]">
        <TipTap ref="textInput" @send="send" />
      </div>

      <div class="flex w-full justify-between">
        <div class="flex">
          <button
            class="w-[40px] h-[40px] rounded-[100%] cursor-pointer hover:bg-custom-muted flex items-center justify-center"
          >
            <IconAdd2 />
          </button>

          <Tools />
        </div>
        <div>
          <button
            @click="send(textInput.getText())"
            :class="textInput?.isEmpty ? '' : 'bg-[#f0f4f9]'"
            class="w-[40px] h-[40px] rounded-[100%] cursor-pointer hover:bg-custom-muted flex items-center justify-center"
          >
            <IconMic v-if="textInput?.isEmpty" />
            <IconSend v-else />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TipTap from "./TipTap.vue";
import IconAdd2 from "./icons/IconAdd2.vue";
import IconMic from "./icons/IconMic.vue";
import Tools from "./Tools.vue";
import IconSend from "./icons/IconSend.vue";

const props = defineProps(["isNewChat", "isSending"]);
const textInput = ref();
const emit = defineEmits(["sendMessage"]);

function send(text) {
  if (textInput.value.isEmpty) {
    return;
  }

  if (props.isSending) {
    return;
  }

  emit("sendMessage", text);
  textInput.value?.clearContent();
}
</script>

<style scoped></style>
