<template>
  <div
    v-if="!hidden"
    class="rs-select-option"
    :class="{ 'rs-select-option-active': active, 'rs-select-option-hovered': hovered }"
    @click="handleClick"
  >
    <slot v-if="$slots.default" />

    <div v-else>{{ displayValue }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      value: [String, Number, Boolean],
      label: String,
    },
    created() {
      this.select = this.getSelectComponent();
      this.cacheOption();
    },
    data() {
      return {
        active: false,
        select: null,
        hidden: false,
        hovered: false,
      };
    },
    computed: {
      displayValue() {
        if (this.label) {
          return this.label;
        }

        return this.compactSlotsInnerHtml();
      },
    },
    methods: {
      compactSlotsInnerHtml() {
        let htmlString = '';

        this.$slots.default.forEach((slot) => {
          const hasElem = slot && slot.elm;
          htmlString += hasElem && slot.elm.innerHTML ? slot.elm.innerHTML : slot.text;
        });

        return htmlString;
      },
      getSelectComponent() {
        if (this.$parent) {
          return this.$parent.$parent || null;
        }
      },
      handleClick(e) {
        e.stopPropagation();
        this.select.selectOptionByValue(this.value);
      },
      cacheOption() {
        const filteredCachedOptions = this.select.cachedOptions.filter(o => o.value !== this.value);
        this.select.cachedOptions = [...filteredCachedOptions, this];
      },
    },
  };
</script>

<style lang="less" scoped>
  .rs-select-option {
    display: flex;
    align-items: center;

    padding: 4px 20px;

    cursor: pointer;
    font-size: 14px;
    background: #fff;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &-active {
      background-color: #b0daf1;
    }

    &:not(.rs-select-option-active):hover,
    &-hovered:not(.rs-select-option-active) {
      background: #e5f3fb;
    }
  }
</style>