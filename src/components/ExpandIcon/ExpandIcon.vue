<template>
  <div
    class="rs-row-expand"
    @click="handleClick"
  >
    {{ hasChildren ? expandSymbol : null }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return [];
      }
    },
    hasChildren: {
      type: Boolean,
      default() {
        return false;
      },
    },
    expanded: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  computed: {
    expandSymbol() {
      return this.expanded ? '-' : '+';
    },
  },
  methods: {
    handleClick() {
      this.$emit('changeExpandStatus', {expandStatus: !this.expanded, item: this.item});
    }
  }
};
</script>

<style lang="less" scoped>
  .rs-row-expand {
    position: absolute;
    cursor:pointer;
    flex: none;
    width: 15px;
    font-size: 14px;
    font-weight: 700;
    color: #0878b4;
  }
</style>
