<template>
  <my-circle
    ref="numberButton"
    size="medium"
    class="number-button"
    :class="rootClasses"
  >
    <button class="button" @click="handleClick()">
      {{ text }}
    </button>
  </my-circle>
</template>

<script>
import MyCircle from '../../atoms/MyCircle';

export default {
  components: {
    MyCircle,
  },
  props: {
    text: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      buttonState: 0,
    };
  },
  computed: {
    keyCode() {
      return parseInt(this.text) + 96;
    },
    rootClasses() {
      return {
        'button-disabled': this.disabled,
        unfilled: this.text === 'Borrar',
        'animation--enter': this.buttonState === 1,
        'animation--leave': this.buttonState === 2,
      };
    },
  },
  mounted() {
    if (this.text === 'Borrar') {
      window.addEventListener('keydown', (e) => {
        if (this.disabled === false) {
          if (e.key === 'Backspace') this.handleClick(e.key);
        }
      });
    } else {
      window.addEventListener('keyup', (e) => {
        if (this.disabled === false) {
          if (e.key === this.text) this.handleClick(e.key);
        }
      });
    }
  },
  methods: {
    handleClick() {
      let result;

      this.animateClick();

      if (this.text === 'Borrar') {
        if (this.value) {
          result = this.value.slice(0, -1);
          this.$emit('input', result);
        }
      } else {
        result = this.value + this.text;
        this.$emit('input', result);
      }
    },
    animateClick() {
      if (this.text !== 'Borrar') {
        this.buttonState = 1;

        setTimeout(() => {
          this.buttonState = 2;
          setTimeout(() => {
            this.buttonState = 0;
          }, 300);
        }, 300);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$click-transition: 0.3s;

.number-button {
  transition: $click-transition;

  &::before {
    content: '';
    position: absolute;
    width: 101%;
    height: 101%;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 100px;
  }

  &:hover {
    transition: $click-transition;
    background-color: rgba(255, 255, 255, 0.6);
  }

  .button {
    width: 100%;
    height: 100%;
    border-radius: 100px;
    cursor: pointer;
    position: relative;
    z-index: 2;
    background: transparent;
  }
}

.button-disabled {
  pointer-events: none;
}

.unfilled {
  border: none;
  font-size: 20px;

  &::before {
    background-color: transparent !important;
  }

  &:hover {
    transition: $click-transition;
    background-color: transparent;
  }
}

.animation {
  &--enter {
    background-color: rgba(255, 255, 255, 0.6);
  }

  &--leave {
    background-color: transparent;
  }
}
</style>
