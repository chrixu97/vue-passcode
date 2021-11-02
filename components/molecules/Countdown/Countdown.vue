<template>
  <div class="countdown">
    <div class="message">
      <p>Se ha superado el número máximo de intentos</p>
      <p>Por favor, espere</p>
    </div>

    <p class="seconds">00:{{ seconds }}</p>
  </div>
</template>

<script>
let interval;

export default {
  props: {
    time: {
      type: Number,
      default: 0,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      countdown: '',
      interval,
    };
  },
  computed: {
    seconds() {
      return this.countdown.toString().padStart(2, '0');
    },
  },
  watch: {
    countdown() {
      if (this.countdown <= 0) {
        clearInterval(interval);
        this.$emit('input', false);
      }
    },
  },
  mounted() {
    this.countdown = this.time;

    interval = setInterval(() => {
      this.countdown--;
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.countdown {
  color: $acid-white;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .message {
    font-size: 20px;
    text-align: center;

    :first-child {
      margin-bottom: 8px;
    }
  }

  .seconds {
    font-size: 70px;
    margin: 0 auto;
  }
}
</style>
