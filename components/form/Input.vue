<script lang="ts" setup>
import { cva } from "class-variance-authority";

const inputCva = cva(
  "text-sm placeholder:text-gray-400 border-1 border-gray-400 w-full text-gray-900 rounded px-1.5 h-8 hover:bg-gray-50 focus:border-blue-500 focus:ring-2 focus:bg-white",
  {
    variants: {
      disabled: {
        true: "!bg-gray-100 !text-gray-400 cursor-default",
      },
      invalid: {
        true: "!border-red-500 focus:ring-red-500",
      },
    },
  }
);

defineEmits(["update:modelValue"]);
const { disabled, error } = defineProps({
  id: { type: String, required: true },
  modelValue: [String, Number],
  disabled: Boolean,
  label: String,
  type: { type: String, default: "text" },
  error: { type: String, default: null },
});

const inputClass = computed(() =>
  inputCva({ disabled, invalid: !!(error && error !== "") })
);
</script>

<template>
  <div>
    <label
      :class="[
        'text-sm font-medium text-gray-600 inline-block mb-1',
        { 'sr-only': !label },
      ]"
      :for="id"
    >
      {{ label ?? id }}
    </label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      :id="id"
      :type="type"
      :disabled="disabled"
      :class="inputClass"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <p v-if="error" class="text-red-500 text-sm mt-1">
      {{ error }}
    </p>
  </div>
</template>

<style scoped></style>
