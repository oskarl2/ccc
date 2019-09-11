<template>
  <div class="rs-close-cross" @click="$emit('click')">
    <svg xmlns="http://www.w3.org/2000/svg" :width='size' :height='size' viewBox="0 0 16 16">
      <path fill='none' :stroke='color' d="M3.5 3.5l8 8m0-8l-8 8"/>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default() {
        return '#727d81';
      },
    },
    size: {
      type: Number,
      default() {
        return 16;
      },
    },
  },
};
</script>

<style lang="less" scoped>
  .rs-close-cross {
    display: inline-flex;
    cursor: pointer;
  }
</style>
