<template>
  <div class="rs-positioner">
    <div ref="trigger" class="rs-positioner-trigger">
      <slot />
    </div>

    <div
      ref="content"
      class="rs-positioner-content"
      :class="{ 'rs-positioner-content-showed' : popupPositioned }"
      :style="{ top: topCoordinate, left: leftCoordinate }"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import {
  getTopPosition,
  getLeftPosition,
  isElementInViewport,
  getHorizontalPosition,
  getVerticalPosition
} from './utils';

const TRIGGERS_PRIORITY = ['triggerHover', 'triggerFocus', 'triggerClick'];
const EVENTS = {
  'mouseenter': 'triggerHover',
  'mouseleave': 'triggerHover',
  'focus': 'triggerFocus',
  'blur': 'triggerFocus',
  'click': 'triggerClick',
};
const POSITIONS_TURN = ['top', 'right', 'left', 'bottom'];
const AXIS_PRESETS = {
  'horizontal': ['middle', 'inside-right', 'inside-left', 'outside-left', 'outside-right'],
  'vertical': ['middle', 'inside-bottom', 'inside-top', 'outside-top', 'outside-bottom'],
};

export default {
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      },
    },
    top: {
      type: Boolean,
      default() {
        return true;
      },
    },
    right: {
      type: Boolean,
      default() {
        return false;
      },
    },
    bottom: {
      type: Boolean,
      default() {
        return false;
      },
    },
    left: {
      type: Boolean,
      default() {
        return true;
      },
    },
    verticalInside: {
      type: Boolean,
      default() {
        return false;
      },
    },
    horizontalInside: {
      type: Boolean,
      default() {
        return true;
      },
    },
    verticalMiddle: {
      type: Boolean,
      default() {
        return false;
      },
    },
    horizontalMiddle: {
      type: Boolean,
      default() {
        return false;
      },
    },
    verticalOffset: {
      type: [String, Number],
      default() {
        return 0;
      },
    },
    horizontalOffset: {
      type: [String, Number],
      default() {
        return 0;
      },
    },
    triggerClick: {
      type: Boolean,
      default() {
        return false;
      },
    },
    triggerFocus: {
      type: Boolean,
      default() {
        return false;
      },
    },
    triggerHover: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  mounted() {
    this.setEventsHandlers();
  },
  beforeDestroy() {
    this.$refs.content.remove();
  },
  data() {
    return {
      internalVisible: false,
      topCoordinate: null,
      leftCoordinate: null,
      lastTrigger: null,
      triggersStack: [],
      currentPosition: null,
      popupPositioned: false,
      currentPreset: null,
      height: 0,
    };
  },
  computed: {
    isAutoPositioning() {
      return !this.top && !this.right && !this.bottom && !this.left;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.internalVisible = val;
      },
    },
    internalVisible: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.setContentPosition();
          document.querySelector('body').addEventListener('click', this.handleClickOutside);
          window.addEventListener('scroll', this.setContentPosition);
          window.addEventListener('resize', this.setContentPosition);

          if (this.$refs.content) {
            this.$refs.content.addEventListener('click', this.setContentPosition);
          }
        } else {
          this.resetContentVisibility();
          document.querySelector('body').removeEventListener('click', this.handleClickOutside);
          window.removeEventListener('scroll', this.setContentPosition);
          window.removeEventListener('resize', this.setContentPosition);
          this.popTriggersStack();

          if (this.$refs.content) {
            this.$refs.content.removeEventListener('click', this.setContentPosition);
          }
          this.height = 0;
        }
      },
    },
    triggerClick(val) {
      if (val) {
        this.setEventsHandlers();
      }
    },
    triggerHover(val) {
      if (val) {
        this.setEventsHandlers();
      }
    },
    triggerFocus(val) {
      if (val) {
        this.setEventsHandlers();
      }
    },
  },
  methods: {
    resetContentVisibility() {
      this.popupPositioned = false;
      this.topCoordinate = '-99999px';
      this.leftCoordinate = '-99999px';
    },
    isHorizontalPosition() {
      return this.currentPosition === 'left' || this.currentPosition === 'right';
    },
    getCurrentAxis() {
      if (this.isHorizontalPosition()) {
        return 'horizontal';
      }

      return 'vertical';
    },
    async startAutopositioning() {
      if (!this.internalVisible) {
        return;
      }

      for (let i = 0; i < POSITIONS_TURN.length; i++) {
        this.currentPosition = POSITIONS_TURN[i];

        await this.startPositioningByAxis();

        if (isElementInViewport(this.$refs.content)) {
          this.popupPositioned = true;
          return;
        }
      }
    },
    async startPositioningByAxis() {
      for (this.currentPreset = 0; this.currentPreset < AXIS_PRESETS[this.getCurrentAxis()].length; this.currentPreset++) {
        await this.dynamicCalculatePosition();

        if (isElementInViewport(this.$refs.content)) {
          this.popupPositioned = true;
          return;
        }
      }
    },
    dynamicCalculatePosition() {
      let verticalPosition = '';
      let horizontalPosition = '';

      if (this.isHorizontalPosition()) {
        verticalPosition = AXIS_PRESETS.vertical[this.currentPreset];
        horizontalPosition = getHorizontalPosition(this.getHorizontalPositionArgs());
      } else {
        verticalPosition = getVerticalPosition(this.getVerticalPositionArgs());
        horizontalPosition = AXIS_PRESETS.horizontal[this.currentPreset];
      }

      this.calculatePosition(verticalPosition, horizontalPosition);
    },
    setEventsHandlers() {
      if (this.triggerClick) {
        this.$refs.trigger.onclick = this.handleEvent;
      }

      if (this.triggerFocus) {
        this.$refs.trigger.firstElementChild.onfocus = this.handleEvent;
        this.$refs.trigger.firstElementChild.onblur = this.handleEvent;
      }

      if (this.triggerHover) {
        this.$refs.trigger.onmouseenter = this.handleEvent;
        this.$refs.trigger.onmouseleave = this.handleEvent;
      }
    },
    handleClickOutside(e) {
      if (!this.$refs.hasOwnProperty('trigger') || !this.$refs.hasOwnProperty('content')) {
        return;
      }

      this.$nextTick(() => {
        const trigger = this.$refs.trigger;
        const content = this.$refs.content;

        if (!trigger || !content || (!trigger.contains(e.target) && !content.contains(e.target))) {
          this.popupPositioned = false;

          setTimeout(() => {
            this.internalVisible = false;
            this.$emit('input', false);
          }, 100);
        }
      });
    },
    setContentPosition(e) {
      if (this.$refs.content && (this.height !== this.$refs.content.clientHeight || e.type === 'scroll')) {
        this.height = this.$refs.content.clientHeight;

        this.$nextTick(() => {
          if (this.isAutoPositioning) {
            this.startAutopositioning();
            return;
          }

          this.calculatePosition();
          this.popupPositioned = true;
        });
      }
    },
    calculatePosition(verticalPosition, horizontalPosition) {
      const targetComponent = this.$slots.default[0];
      const contentComponent = this.$refs.content;
      const targetParams = targetComponent.elm.getBoundingClientRect();
      const contentParams = contentComponent.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || 0;
      const verticalPositionArgs = {
        top: this.top,
        bottom: this.bottom,
        verticalMiddle: this.verticalMiddle,
        verticalInside: this.verticalInside,
      };
      const horizontalPositionArgs = {
        left: this.left,
        right: this.right,
        horizontalMiddle: this.horizontalMiddle,
        horizontalInside: this.horizontalInside,
      };

      this.topCoordinate = `${getTopPosition({
        verticalPosition: verticalPosition || getVerticalPosition(verticalPositionArgs),
        verticalOffset: this.verticalOffset,
        targetParams,
        contentParams,
        scrollTop,
      })}px`;

      this.leftCoordinate = `${getLeftPosition({
        horizontalPosition: horizontalPosition || getHorizontalPosition(horizontalPositionArgs),
        horizontalOffset: this.horizontalOffset,
        targetParams,
        contentParams,
        scrollLeft,
      })}px`;

      document.querySelector('body').appendChild(contentComponent);
    },
    handleEvent(e) {
      e.stopPropagation();
      const currentTrigger = EVENTS[e.type];

      if (!this.lastTrigger) {
        this.toggleContentVisibility();
        this.pushToTriggersStack(currentTrigger);
        return;
      }

      if (this.lastTrigger === currentTrigger) {
        if (this.internalVisible && this.triggersStack.length > 1) {
          this.popTriggersStack();
          return;
        }

        this.toggleContentVisibility();
      }

      if (this.getTriggerPriority(currentTrigger) > this.getTriggerPriority(this.lastTrigger)) {
        this.pushToTriggersStack(currentTrigger);
      }
    },
    pushToTriggersStack(trigger) {
      if (this.triggersStack.indexOf(trigger) !== -1) {
        return;
      }

      this.triggersStack.push(trigger);
      this.lastTrigger = trigger;
    },
    popTriggersStack() {
      this.triggersStack.pop();
      this.lastTrigger = this.triggersStack[this.triggersStack.length - 1];
    },
    toggleContentVisibility() {
      this.internalVisible = !this.internalVisible;
      this.$emit('input', this.internalVisible);
    },
    getTriggerPriority(trigger) {
      return TRIGGERS_PRIORITY.indexOf(trigger);
    },
    getVerticalPositionArgs() {
      return {
        top: this.currentPosition === 'top',
        bottom: this.currentPosition === 'bottom',
        verticalMiddle: this.isHorizontalPosition(),
        verticalInside: this.isHorizontalPosition(),
      };
    },
    getHorizontalPositionArgs() {
      return {
        left: this.currentPosition === 'left',
        right: this.currentPosition === 'right',
        horizontalMiddle: !this.isHorizontalPosition(),
        horizontalInside: !this.isHorizontalPosition(),
      };
    },
  },
};
</script>

<style lang="less" scoped>
  .rs-positioner {
    display: inline-flex;
    max-width: 100%;
    &-trigger {
      display: inline-flex;
      max-width: 100%;
    }

    &-content {
      z-index: 10000;
      position: absolute;
      top: 0;
      opacity: 0;
      transition: .1s opacity ease-in;
      width: fit-content;

      &-showed {
        opacity: 1;
      }
    }
  }
</style>
