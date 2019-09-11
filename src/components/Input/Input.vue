<template>
  <div
    class="rs-input-wrapper"
    :class="{ 'flex-fluid': fluid }"
  >
    <input
      class="rs-input"
      :class="classes"
      ref="input"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
    />
  </div>
</template>

<script>
import inputMixin from './inputMixin';
import { inArray } from '../../lib/component/validators.js';

export default {
  mixins: [
    inputMixin
  ],
  props: {
    type: {
      type: String,
      validator: inArray(['text', 'number']),
      default() {
        return 'text';
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import './input';
</style>