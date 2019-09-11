<template>
  <div
    ref="modal"
    class="rs-modal-overlay"
    :class="{ 'rs-modal-overlay-showed': visible }"
    :style="{ top: `${topPosition}px`, bottom: `${bottomPosition}px` }"
    @click.self="close"
  >
    <div class="rs-modal">
      <div class="rs-modal-close" @click="close">
        <rs-close-icon />
      </div>

      <div v-if="$slots.hasOwnProperty('header')" class="rs-modal-header">
        <slot name="header" />
      </div>

      <div class="rs-modal-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      visible: false,
      topPosition: 0,
      bottomPosition: 0,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.visible = val;
      },
    },
    visible: {
      handler(val) {
        const modal = this.$refs.modal;
        this.$emit('input', val);

        if (val) {
          document.body.appendChild(modal);
          document.body.style.overflowY = 'hidden';

          this.setPosition();
        } else {
          document.body.style.overflowY = 'unset';

          modal.remove();
        }
      },
    },
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit('changeShown', false);
    },
    setPosition() {
      const pageYOffset = window.pageYOffset;

      this.topPosition = pageYOffset;
      this.bottomPosition = -pageYOffset;
    },
  },
};
</script>

<style lang="less" scoped>
  .rs-modal {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 6px 24px rgba(114, 125, 129, .75);

    &-overlay {
      background: rgba(0, 0, 0, 0.35);
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2000;

      display: none;
      align-items: center;
      justify-content: center;

      &-showed {
        display: flex;
      }
    }

    &-header {
      height: 40px;
      border-bottom: 1px solid #d7d8d9;
      padding: 0 40px 0 20px;
      left: 0;

      display: flex;
      align-items: center;
    }

    &-body {
      padding: 10px 20px;
    }

    &-close {
      position: absolute;
      top: 0; right: 0;
      padding: 12px;
      z-index: 1000;
    }
  }
</style>
