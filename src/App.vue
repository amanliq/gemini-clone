<template>
  <div>
    <div
      @click="toggle"
      class="absolute z-20 flex items-center justify-center rounded-[100%] cursor-pointer hover:bg-custom-muted h-[40px] w-[40px] left-[12px] top-[11px]"
    >
      <IconMenu />
    </div>
    <div class="flex w-full">
      <Sidebar
        :isSending="isSending"
        @selectChat="selectChat"
        @new-chat="startNewChat"
        :isOpen="state"
        :class="state ? 'md:w-[308px] w-full' : 'md:w-[72px] w-0'"
        :recentChats="recentChats ?? []"
      />

      <div class="w-full flex-1">
        <div class="p-[10px] md:ml-0 ml-[50px] h-[80px]">
          <div class="text-[#575b5f] font-medium text-[1.25rem]">Gemini</div>
          <div
            class="bg-[#f0f4f9] w-fit px-[8px] text-[0.875rem] font-medium text-[#575b5f] rounded-[16px]"
          >
            2.5 Flash
          </div>
        </div>
        <div
          class="p-[10px] relative flex flex-col h-[calc(100vh-80px)] overflow-y-auto"
        >
          <div class="md:p-[28px] flex-1 overflow-y-auto">
            <ChatMessages
              ref="chatMessagesRef"
              :messages="chatMessages"
              :isSending="isSending"
            />
          </div>
          <div class="flex justify-center">
            <ChatInput
              :isSending="isSending"
              :isNewChat="isNewChat"
              @send-message="sendMessage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconMenu from "./components/icons/IconMenu.vue";
import ChatInput from "./components/ChatInput.vue";
import Sidebar from "./components/Sidebar.vue";
import { useToggle } from "./composables/use-toggle";
import { useChat } from "./composables/use-chat";
import ChatMessages from "./components/ChatMessages.vue";
const { state, toggle } = useToggle();

const {
  chatMessages,
  isSending,
  isNewChat,
  sendMessage,
  chatMessagesRef,
  recentChats,
  startNewChat,
  selectChat,
} = useChat();
</script>
