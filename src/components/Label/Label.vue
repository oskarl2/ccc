<template>
  <div class="label-wrapper" :style="{backgroundColor: this.backgroundColor}">
    <span class="label-text" :style="{color: this.textColor}">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    textColor: {
      type: String,
      default() {
        return '#fff';
      },
    },
    backgroundColor: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.label-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 3px 8px 1px 8px;
  border-radius: 4px;
}
.label-text {
  font-family: PT Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 1px;
}
</style>
