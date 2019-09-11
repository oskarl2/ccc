<!--<template>-->
<!--  <positioner-->
<!--    v-model="isDropdownVisible"-->
<!--    :top="false"-->
<!--    bottom-->
<!--    :trigger-click="!disabled && !loading"-->
<!--  >-->
<!--    <div-->
<!--      ref="control"-->
<!--      class="rs-select-control-wrapper"-->
<!--      :class="{ error }"-->
<!--      @keydown.stop.prevent.up="hoverTopOption"-->
<!--      @keydown.stop.prevent.down="hoverBottomOption"-->
<!--      @keydown.stop.prevent.enter="selectOption"-->
<!--    >-->
<!--      <template-->
<!--        v-if="$scopedSlots.hasOwnProperty('target') || $slots.hasOwnProperty('target')"-->
<!--      >-->
<!--        <slot-->
<!--          name="target"-->
<!--          :visible="isDropdownVisible"-->
<!--          :display-value="displayValue"-->
<!--        />-->
<!--      </template>-->

<!--      <rs-button-->
<!--        type="default"-->
<!--        :size="size"-->
<!--        :disabled="disabled"-->
<!--        :loading="loading"-->
<!--        :width="width"-->
<!--        v-else-->
<!--      >-->
<!--        <div class="rs-selection-control">-->
<!--          <div-->
<!--            class="rs-selected-text"-->
<!--            :class="{'rs-select-text-empty': !displayValue}"-->
<!--            v-html="displayValue"-->
<!--          />-->
<!--          <div-->
<!--            class="rs-select-chevron"-->
<!--            :class="{ display: loading ? 'none' : 'block' }"-->
<!--          >-->
<!--&lt;!&ndash;            <rs-icon :name="isDropdownVisible ? 'chevron-up' : 'chevron-down'" />&ndash;&gt;-->
<!--          </div>-->
<!--        </div>-->
<!--      </rs-button>-->
<!--    </div>-->

<!--    <div-->
<!--      slot="content"-->
<!--      ref="options"-->
<!--      class="rs-select-options"-->
<!--      :style="{ minWidth: getMinDropdownWidth() }"-->
<!--    >-->
<!--      <div class="rs-select-options-holder">-->
<!--        <slot></slot>-->
<!--      </div>-->
<!--    </div>-->
<!--  </positioner>-->
<!--</template>-->

<!--<script>-->
<!--  import Positioner from '../Positioner/Positioner.vue';-->
<!--  import { inArray } from '../../lib/component/validators';-->

<!--  export default {-->
<!--    components: {-->
<!--      Positioner-->
<!--    },-->
<!--    props: {-->
<!--      size: {-->
<!--        type: String,-->
<!--        validators: inArray(['small', 'medium', 'large']),-->
<!--        default() {-->
<!--          return 'medium';-->
<!--        }-->
<!--      },-->
<!--      value: [String, Number, Boolean],-->
<!--      placeholder: {-->
<!--        type: String,-->
<!--        default() {-->
<!--          return '';-->
<!--        }-->
<!--      },-->
<!--      disabled: {-->
<!--        type: Boolean,-->
<!--        default() {-->
<!--          return false;-->
<!--        }-->
<!--      },-->
<!--      width: {-->
<!--        type: [Number, String],-->
<!--        default() {-->
<!--          return 'auto';-->
<!--        }-->
<!--      },-->
<!--      error: {-->
<!--        type: Boolean,-->
<!--        default() {-->
<!--          return false;-->
<!--        },-->
<!--      },-->
<!--      loading: {-->
<!--        type: Boolean,-->
<!--        default() {-->
<!--          return false;-->
<!--        },-->
<!--      }-->
<!--    },-->
<!--    data() {-->
<!--      return {-->
<!--        isDropdownVisible: false,-->
<!--        cachedOptions: []-->
<!--      }-->
<!--    },-->
<!--    computed: {-->
<!--      currentOption() {-->
<!--        const currentOption = this.getOptionByValue(this.value);-->

<!--        if(!currentOption) {-->
<!--          return {-->
<!--            displayValue: this.placeholder,-->
<!--            isPlaceholder: true-->
<!--          }-->
<!--        }-->

<!--        return currentOption;-->
<!--      },-->
<!--      displayValue() {-->
<!--        return this.currentOption.displayValue;-->
<!--      }-->
<!--    },-->
<!--    watch: {-->
<!--      isDropDownVisible: {-->
<!--        handle(val) {-->
<!--          if (val) {-->
<!--            this.$emit('focus');-->
<!--          } else {-->
<!--            this.$emit('blur');-->
<!--            this.$emit('submit');-->
<!--          }-->
<!--        }-->
<!--      },-->
<!--      value: {-->
<!--        immediate: true,-->
<!--        handler() {-->
<!--          // this.setOptionActive();-->
<!--        }-->
<!--      }-->
<!--    },-->
<!--    getMinDropdownWidth() {-->
<!--      return this.$refs.control ? `${this.$refs.control.offsetWidth}px` : 'auto';-->
<!--    },-->
<!--    selectOptionByValue() {-->
<!--      if (this.disabled) {-->
<!--        this.isDropdownVisible = false;-->

<!--        return;-->
<!--      }-->

<!--      this.$emit('input', val);-->
<!--      this.isDropdownVisible = false;-->
<!--    },-->
<!--    getOptionByValue(value) {-->
<!--      return this.cachedOptions.find(option => option._props.value === value);-->
<!--    },-->
<!--    setOptionActive() {-->
<!--      this.cachedOptions.forEach(option => option.active = option.value === this.value);-->
<!--    },-->
<!--    selectOption() {-->
<!--      if (!this.hoveredOption) {-->
<!--        return;-->
<!--      }-->

<!--      this.selectOptionByValue(this.hoveredOption.value);-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style lang="less" scoped>-->
<!-- @import './select';-->
<!--</style>-->
<template>
  <positioner
      v-model="isDropdownVisible"
      :top="false"
      bottom
      :trigger-click="!disabled && !loading"
  >
    <div
        ref="control"
        class="rs-select-control-wrapper"
        :class="{ error }"
        @keydown.stop.prevent.up="hoverTopOption"
        @keydown.stop.prevent.down="hoverBottomOption"
        @keydown.stop.prevent.enter="selectOption"
    >
      <template v-if="$scopedSlots.hasOwnProperty('target') || $slots.hasOwnProperty('target')">
        <slot name="target" :visible="isDropdownVisible" :display-value="displayValue" />
      </template>

      <rs-button
          type="default"
          :size="size"
          :disabled="disabled"
          :loading="loading"
          :width="width"
          v-else
      >
        <div class="rs-select-control">
          <div class="rs-select-text" :class="{'rs-select-text-empty': !displayValue}" v-html="displayValue" />

          <div class="rs-select-chevron" :style="{ display: loading ? 'none' : 'block' }">
<!--            <rs-icon :name="isDropdownVisible ? 'chevron-up' : 'chevron-down'" />-->
          </div>
        </div>
      </rs-button>
    </div>

    <div
        slot="content"
        ref="options"
        class="rs-select-options"
        :style="{ minWidth: getMinDropdownWidth() }"
    >
      <div v-if="search" class="rs-select-search">
        <rs-input
            v-model="internalSearchValue"
            class="rs-select-search-input"
            :placeholder="searchPlaceholder"
            @input="searchOption"
            fluid
        />
      </div>
      <div class="rs-select-options-holder">
        <slot></slot>
      </div>
    </div>
  </positioner>
</template>

<script>
  // import selectHotkeyMixin from '../Select/selectHotkeyMixin';
  // import groupMixin from '../Group/groupMixin';

  import Positioner from '../Positioner/Positioner.vue';
  import { inArray } from '../../lib/component/validators';

  export default {
    // mixins: [
    //   selectHotkeyMixin,
    //   groupMixin,
    // ],
    components: {
      Positioner,
    },
    props: {
      size: {
        type: String,
        validator: inArray(['small', 'medium', 'large']),
        default() {
          return 'medium';
        },
      },
      value: [String, Number, Boolean],
      placeholder: {
        type: String,
        default() {
          return '';
        },
      },
      disabled: {
        type: Boolean,
        default() {
          return false;
        },
      },
      width: {
        type: [Number, String],
        default() {
          return 'auto';
        },
      },
      error: {
        type: Boolean,
        default() {
          return false;
        },
      },
      loading: {
        type: Boolean,
        default() {
          return false;
        },
      },
      search: {
        type: Boolean,
        default() {
          return false;
        },
      },
      searchPlaceholder: {
        type: String,
        default() {
          return 'Поиск';
        },
      },
      searchValue: {
        type: String,
        default() {
          return '';
        },
      },
    },
    data() {
      return {
        isDropdownVisible: false,
        cachedOptions: [],
        internalSearchValue: '',
      };
    },
    computed: {
      currentOption() {
        const currentOption = this.getOptionByValue(this.value);
        if (!currentOption) {
          return { displayValue: this.placeholder, isPlaceholder: true };
        }

        return currentOption;
      },
      displayValue() {
        return this.currentOption.displayValue;
      },
    },
    watch: {
      isDropdownVisible: {
        handler(val) {
          if (val) {
            this.$emit('focus');
          } else {
            this.$emit('blur');
            this.$emit('submit');
          }
        },
      },
      value: {
        immediate: true,
        handler() {
          this.setOptionActive();
        },
      },
      searchValue: {
        immediate: true,
        handler(val) {
          this.internalSearchValue = val;
        },
      },
    },
    methods: {
      getMinDropdownWidth() {
        return this.$refs.control ? `${this.$refs.control.offsetWidth}px` : 'auto';
      },
      selectOptionByValue(val) {
        if (this.disabled) {
          this.isDropdownVisible = false;
          return;
        }

        this.$emit('input', val);
        this.isDropdownVisible = false;
      },
      getOptionByValue(value) {
        return this.cachedOptions.find(option => option._props.value === value);
      },
      setOptionActive() {
        this.cachedOptions.forEach(option => {
          option.active = option.value === this.value;
        });
      },
      searchOption() {
        this.cachedOptions.forEach(option => {
          option.hidden = option.displayValue.toLowerCase().indexOf(this.internalSearchValue.toLowerCase()) === -1;
        });

        this.$emit('search-input', this.internalSearchValue);
      },
      selectOption() {
        if (!this.hoveredOption) {
          return;
        }

        this.selectOptionByValue(this.hoveredOption.value);
      },
    },
  };
</script>

<style lang="less" scoped>
  .rs-select {
    display: inline-flex;
    align-items: stretch;
  }

  .rs-select-control-wrapper {
    display: inline-flex;
  }

  .rs-select-control {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  .rs-select-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &-empty {
      height: 20px;
    }
  }

  .rs-select-chevron {
    font-size: 10px;
    margin-left: 5px;
    position: absolute;
    top: -2px;
    right: -10px;
  }

  .rs-select-options {
    z-index: 2000;

    display: flex;
    flex-direction: column;
    align-items: stretch;

    margin-top: 3px;
    max-height: 280px;
    overflow-y: auto;
    box-shadow: 0 6px 24px rgba(114, 125, 129, .75);

    &-holder {
      overflow-y: auto;
    }
  }

  .rs-select-search {
    padding: .3rem 1rem;
    border-bottom: 1px solid #e8e9ea;
    background: #fff;
  }

  .error {
    box-shadow: 0 0 2px 0 #e0571a, inset 0 0 0 1px rgba(224, 87, 26, 0.6);
  }
</style>
