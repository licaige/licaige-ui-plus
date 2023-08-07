<template>
  <button class="ea-button" :class="buttonStyle">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import './style/index.scss';
import { computed } from 'vue';
defineOptions({
  name: 'ea-button'
});
type ButtonProps = {
  type?: string;
  size?: string;
};
const buttonProps = defineProps<ButtonProps>();

const buttonStyle = computed(() => {
  console.log('buttonProps', {
    [`ea-button-${buttonProps.type}`]: buttonProps.type
  });
  return { [`ea-button-${buttonProps.type}`]: buttonProps.type };
});
</script>
