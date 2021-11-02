<template>
  <div class="passcode-label">
    <number-circle :number="getNumber(0)" :state="getState(0)"></number-circle>
    <number-circle :number="getNumber(1)" :state="getState(1)"></number-circle>
    <number-circle :number="getNumber(2)" :state="getState(2)"></number-circle>
    <number-circle :number="getNumber(3)" :state="getState(3)"></number-circle>
  </div>
</template>

<script>
import NumberCircle from '../../molecules/NumberCircle';

export default {
  components: {
    NumberCircle,
  },
  props: {
    passcode: {
      type: String,
      default: '',
    },
  },
  methods: {
    getNumber(index) {
      return this.passcode[index] ? this.passcode[index] : '';
    },
    getState(index) {
      if (this.passcode.length === index + 1) {
        return 2;
      } else if (this.passcode.length > index + 1) {
        return 3;
      }

      return 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.passcode-label {
  min-height: 40px;
  width: 100%;
  max-width: 172px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .number-circle {
    min-height: 40px;
    min-width: 30px;
    color: white;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
