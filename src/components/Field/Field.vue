<template>
  <div
    class="rs-field"
    :class="{ 'field-horizontal': isLabelFieldHorizontal, 'field-vertical': !isLabelFieldHorizontal }"
  >
    <template v-if="isLabelBefore">
      <template v-if="$slots.hasOwnProperty('label')">
        <slot name="label" />
      </template>

      <div
        v-else
        class="rs-field-label"
        :style="{
          marginBottom: this.labelPosition === 'top' ? '8px' : 0,
          marginRight: this.labelPosition === 'left' ? '8px' : 0
        }"
        @click="handleToggle"
      >
        {{ label }}
      </div>
    </template>

    <div class="rs-input">
      <slot></slot>
    </div>

    <template v-if="!isLabelBefore">
      <template v-if="$slots.hasOwnProperty('label')">
        <slot name="label" />
      </template>

      <div
        v-else
        class="rs-field-label"
        :style="{
          marginTop: this.labelPosition === 'bottom' ? '8px' : 0,
          marginLeft: this.labelPosition === 'right' ? '8px' : 0
        }"
        @click="handleToggle"
      >
        {{ label }}
      </div>
    </template>
  </div>
</template>

<script>
import { inArray } from '../../lib/component/validators';

export default {
  props: {
    label: {
      type: String,
      default() {
        return '';
      },
    },
    labelPosition: {
      type: String,
      validator: inArray(['top', 'right', 'bottom', 'left']),
      default() {
        return 'top';
      },
    },
  },
  computed: {
    isLabelBefore() {
      return this.labelPosition === 'top' || this.labelPosition === 'left';
    },
    isLabelFieldHorizontal() {
      return this.labelPosition === 'left' || this.labelPosition === 'right';
    },
  },
  methods: {
    handleToggle() {
      this.$emit('toggle');
    },
  },
};
</script>

<style lang="less" scoped>
  .rs-field {
    display: flex;
    width: 100%;
    justify-content: space-between;
    &.field-horizontal {
      align-items: center;
      flex-direction: row;

      .rs-input {
        align-items: center;
      }
    }
    &.field-vertical {
      flex-direction: column;
      align-items: stretch;
    }
  }
  .rs-field-label {
    font-size: 13px;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  }
  .rs-input {
    display: flex;
    align-items: stretch;
  }
</style>
