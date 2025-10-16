<template>
  <editor-content :editor="editor" :class="isEmpty ? 'empty' : ''" />
</template>

<script setup>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { ref, onMounted, onUnmounted } from "vue";

import BulletList from "@tiptap/extension-bullet-list";

const emits = defineEmits(["send"]);

const clearContent = () => {
  if (editor.value) {
    editor.value.commands.clearContent();
  }
};
const CustomBulletList = BulletList.extend({
  addKeyboardShortcuts() {
    return {
      Enter: (e) => {
        emits("send", e.editor.getText());

        return true;
      },
    };
  },
});

const isEmpty = ref(true);

const editor = ref(null);
onMounted(() => {
  editor.value = new Editor({
    content: "",
    extensions: [StarterKit, CustomBulletList],
    onUpdate(d) {
      isEmpty.value = d.editor.isEmpty;
    },
  });
});

const getText = () => {
  if (editor.value) {
    return editor.value.getText();
  }

  return "";
};

onUnmounted(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
defineExpose({ isEmpty, getText, clearContent });
</script>

<style>
.tiptap {
  outline: none;
  font-size: 1rem;
  font-weight: 400;
  position: relative;
  max-height: calc(24px * 7);
  overflow-y: auto;
}
.empty .tiptap::before {
  content: "Ask Gemini";
  left: 0px;
  right: 15px;
  position: absolute;
  pointer-events: none;
  color: #5f6368;
}
</style>
