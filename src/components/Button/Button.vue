<template>
  <button
    class="rs-button"
    :class="classes"
    :style="{ width: typeof width === 'string' ? width : `${width}px` }"
    @click="handleClick"
  >
    <slot></slot>
    <span class="rs-button-loader">
      <rs-preloader
        v-if="loading"
        :size="15"
        :icon-width="3"
      />
    </span>
  </button>
</template>

<script>
  import { inArray } from '../../lib/component/validators';

  export default {
    props: {
      type: {
        type: String,
        validator: inArray(['default', 'primary', 'danger', 'light']),
        default() {
          return 'primary';
        },
      },
      size: {
        type: String,
        validator: inArray(['small', 'medium', 'large', 'extra-large', 'massive']),
        default() {
          return 'medium';
        },
      },
      disabled: {
        type: Boolean,
        default() {
          return false;
        },
      },
      active: {
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
      loading: {
        type: Boolean,
        default() {
          return false;
        },
      },
      focus: {
        type: Boolean,
        default() {
          return false;
        },
      },
    },
    computed: {
      sizeClass() {
        return `size-${this.size}`;
      },
      classes() {
        return Object.assign(
          {
            [this.sizeClass]: true,
            [this.type]: true,
            disabled: this.disabled || this.loading,
            active: this.active,
            focus: this.focus,
          }, {}
        );
      },
    },
    methods: {
      handleClick(e) {
        if (!this.disabled && !this.loading) {
          this.$emit('click', e);
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .rs-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    border: none;
    outline: none;
    padding: 6px 12px;
    border-radius: 4px;

    font-size: 14px;
    line-height: 18px;
    cursor: pointer;
    box-shadow: inset 0 -1px 0 0 rgba(27, 42, 48, 0.35);

    &.focus {
      box-shadow: 0px 0px 2px rgba(0, 132, 212, 0.8) !important;
    }

    &.primary {
      color: #fff;
      background: linear-gradient(to top, rgb(0,159,101) 0%, rgb(1,171,109) 100%);

      &:hover {
        background: linear-gradient(to top, rgb(0,151,96) 0%, rgb(1,162,103) 100%);
      }

      &:active, &.active {
        background: linear-gradient(to top, rgb(0,151,96) 0%, rgb(1,162,103) 100%);
        box-shadow: inset 0 2px 0 0 rgba(27, 42, 48, 0.1),
        inset 0 -1px 0 0 #b4bdc0,
        inset 1px 1px 0 0 #c6cbce,
          inset -1px 0 0 0 #c6cbce;
      }
    }
    &.default {
      color: rgba(27,42,48,0.8);
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F2F3 100%);
      box-shadow: inset 0px 1px 0px rgba(27, 42, 48, 0.1),
      inset 0px -1px 0px rgba(27, 42, 48, 0.2),
        inset -1px 0px 0px rgba(27, 42, 48, 0.1),
      inset 1px 0px 0px rgba(27, 42, 48, 0.1);


      &:hover {
        background: linear-gradient(to top, rgb(237,238,239) 0%, rgb(247,248,249) 100%);
      }

      &:active, &.active {
        background: linear-gradient(to top, rgb(237,238,239) 0%, rgb(247,248,249) 100%);
        box-shadow: inset 0 2px 0 0 rgba(27, 42, 48, 0.1),
        inset 0 -1px 0 0 #b4bdc0,
        inset 1px 1px 0 0 #c6cbce,
          inset -1px 0 0 0 #c6cbce;
      }
    }
    &.danger {
      color: #fff;
      background: linear-gradient( 90deg, rgb(207,73,13) 0%, rgb(224,87,26) 100%);
      box-shadow: inset 0px -1px 0px 0px rgba(27, 42, 48, 0.35);

      &:hover {
        background: linear-gradient( 90deg, rgb(196,69,12) 0%, rgb(213,83,25) 100%);
      }

      &:active, &.active {
        background: linear-gradient( 90deg, rgb(186,66,12) 0%, rgb(201,78,23) 100%);
        box-shadow: inset 0px -1px 0px 0px rgba(27, 42, 48, 0.35);
      }
    }
    &.light {
      background: #fff;
      color: #0084D4;
      border: 1px solid #c3cacd;
      box-shadow: none;

      &:hover {
        background: #f7f7f7;
      }

      &:active, &.active {
        color: rgba(27, 42, 48, 0.8);
        background-color: #F3FBFF;
        border-color: #26A4F0;
        cursor: default;
        border-right-width: 1px;
      }

      &:active + &, &.active + & {
        border-left-width: 0;
      }
    }

    &.size {
      &-massive {
        font-size: 16px;
        line-height: 20px;
        padding: 0 24px;
        height: 44px;
        min-width: 44px;
      }

      &-extra-large {
        padding: 6px 12px;
        height: 36px;
        min-width: 36px;
      }

      &-large {
        padding: 4px 8px;
        height: 32px;
        min-width: 32px;
      }

      &-medium {
        padding: 2px 8px;
        height: 28px;
        min-width: 28px;
      }

      &-small {
        font-size: 13px;
        padding: 0 8px;
        height: 24px;
        min-width: 24px;
      }
    }

    &.disabled {
      cursor: default;
      color: #8f989c;
      background: #e8e9ea;
      border: 1px solid #c3cacd;
      box-shadow: none;

      &:hover {
        cursor: default;
        border: 1px solid #c3cacd;
        box-shadow: none;
        background: #e8e9ea;
      }

      &:active {
        cursor: default;
        border: 1px solid #c3cacd;
        box-shadow: none;
        background: #e8e9ea;
      }
    }

    &-loader {
      display: flex;
      margin-left: 5px;
    }
  }
</style>