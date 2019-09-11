import { inArray } from '../../lib/component/validators';

export default {
  props: {
    value: [
      String,
      Number
    ],
    placeholder: String,
    size: {
      type: String,
      validator: inArray(['small', 'medium', 'large']),
      default() {
        return 'meduim';
      }
    },
    error: {
      type: Boolean,
      default() {
        return false;
      },
    },
    fluid: {
      type: Boolean,
      default() {
        return false;
      },
    }
  },
  computed: {
    classes() {
      return Object.assign(
        {
          [this.size]: true,
          error: this.error,
          fluid: this.fluid
        }
      );
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    }
  }
};