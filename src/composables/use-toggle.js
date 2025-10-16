import { ref } from "vue";

export const useToggle = (initialValue = true) => {
  const state = ref(initialValue);
  const toggle = () => {
    state.value = !state.value;
  };
  return { state, toggle };
};
