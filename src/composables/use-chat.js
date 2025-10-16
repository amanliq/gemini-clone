import { ref, nextTick } from "vue";
import { useMutation } from "@tanstack/vue-query";

export function useChat() {
  const chatMessages = ref([]);
  const userPrompt = ref("");
  const isNewChat = ref(true);
  const activeChatTitle = ref("");
  const recentChats = ref([]);
  const chatMessagesRef = ref();

  const formatMessagesForGemini = () => {
    return chatMessages.value.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));
  };

  const saveOrUpdateChat = (prompt, aiText) => {
    if (!aiText) return;

    if (isNewChat.value) {
      const title = prompt.length > 30 ? `${prompt.slice(0, 30)}...` : prompt;
      activeChatTitle.value = title;

      recentChats.value.unshift({
        title,
        messages: [...chatMessages.value],
      });

      isNewChat.value = false;
      scrollToBottom();
    } else {
      const index = recentChats.value.findIndex(
        (chat) => chat.title === activeChatTitle.value
      );
      if (index !== -1) {
        recentChats.value[index].messages = [...chatMessages.value];
      }
      scrollToBottom();
    }
  };

  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: async (message) => {
      const prompt = message.trim();
      if (!prompt) return;

      chatMessages.value.push({ role: "user", text: prompt });

      const aiMessage = { role: "model", text: "" };
      chatMessages.value.push(aiMessage);
      scrollToBottom();

      const response = await fetch(import.meta.env.VITE_APP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: formatMessagesForGemini() }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        const lastMsg = chatMessages.value.at(-1);

        if (lastMsg?.role === "model") {
          lastMsg.text = `Error: Could not get response. (${errorText})`;
        }
        console.error("API Error:", errorText);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        aiMessage.text += chunk;
        await nextTick();
      }

      saveOrUpdateChat(prompt, aiMessage.text);
    },

    onError: (error) => {
      console.error("Gemini error:", error);

      const lastMsg = chatMessages.value.at(-1);
      if (lastMsg?.role === "model") {
        lastMsg.text = `Error: Could not get response. (${error.message})`;
      }
    },
  });

  function startNewChat() {
    isNewChat.value = true;
    activeChatTitle.value = "";
    chatMessages.value = [];
  }

  function selectChat(chat) {
    isNewChat.value = false;
    activeChatTitle.value = chat.title;
    chatMessages.value = [...chat.messages];
  }

  function scrollToBottom() {
    if (chatMessagesRef.value.chatMessagesRef) {
      if (chatMessagesRef.value.chatMessagesRef) {
        chatMessagesRef.value.chatMessagesRef.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }

  return {
    chatMessages,
    userPrompt,
    isSending,
    isNewChat,
    activeChatTitle,
    recentChats,
    sendMessage,
    startNewChat,
    selectChat,
    isNewChat,
    chatMessagesRef,
    scrollToBottom,
  };
}
