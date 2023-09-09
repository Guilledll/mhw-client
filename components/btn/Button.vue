<script lang="ts" setup>
import { cva, type VariantProps } from "class-variance-authority";

const btnCva = cva(
  "inline-flex items-center justify-center text-sm rounded min-h-[32px] px-3 py-1 font-semibold focus:outline-none focus:ring-2",
  {
    variants: {
      intent: {
        primary: "bg-black text-white hover:bg-gray-800 focus:ring-gray-300",
        secondary: "bg-sky-500 text-white hover:bg-sky-700 focus:ring-sky-300",
        danger: "bg-red-500 text-white hover:bg-red-700 focus:ring-red-300",
        text: "text-gray-800 hover:bg-gray-100",
      },
      disabled: {
        true: "!bg-gray-100 !text-gray-400 cursor-not-allowed",
      },
      loading: { true: "cursor-wait" },
    },
  }
);

type BtnProps = VariantProps<typeof btnCva>;

const props = defineProps({
  as: {
    type: [String, Object],
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  intent: {
    type: String as PropType<BtnProps["intent"]>,
    default: "secondary",
    validator: (v: string) =>
      ["primary", "secondary", "danger", "text"].includes(v),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const btnClass = computed(() =>
  btnCva({
    intent: props.intent,
    disabled: props.disabled,
    loading: props.loading,
  })
);
const asComponent = computed(() =>
  props.as !== "button" && props.disabled ? "button" : props.as
);
</script>

<template>
  <component :is="asComponent" :disabled="disabled" :class="btnClass">
    <svg
      v-if="loading"
      class="absolute h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <span :class="[loading && 'invisible']">
      <slot />
    </span>
  </component>
</template>
