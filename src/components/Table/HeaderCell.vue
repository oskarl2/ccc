<template>
  <div
    class="header-cell"
    @click="handleClick"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      top: true,
      bottom: false,
      right: false,
      left: false,
    };
  },
  watch: {
    tooltipPosition: {
      immediate: true,
      handler(val) {
        if (val !== 'top') {
          this.top = false;
          this[val] = true;
        }
      },
    },
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="less" scoped>
  .header-cell {
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-size: 13px;
    font-weight: 600;
    background: rgb(255, 255, 255);
    border: 1px solid #e8e9ea;
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    line-height: normal;
  }
</style>
