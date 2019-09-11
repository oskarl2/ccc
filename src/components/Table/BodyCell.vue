<template>
  <div class="body-cell">
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      isExpand: {
        type: Boolean,
        default() {
          return false;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .body-cell {
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-size: 13px;
    background: inherit;
    border: 1px solid #e8e9ea;

    &:first-child {
      padding-left: 16px;
    }
    &:last-child {
      padding-right: 16px;
    }
  }
</style>
