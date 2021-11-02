<template>
  <div class="number-pad">
    <div class="row">
      <number-button v-model="passcode" text="1" :disabled="disabled" />
      <number-button v-model="passcode" text="2" :disabled="disabled" />
      <number-button v-model="passcode" text="3" :disabled="disabled" />
    </div>
    <div class="row">
      <number-button v-model="passcode" text="4" :disabled="disabled" />
      <number-button v-model="passcode" text="5" :disabled="disabled" />
      <number-button v-model="passcode" text="6" :disabled="disabled" />
    </div>
    <div class="row">
      <number-button v-model="passcode" text="7" :disabled="disabled" />
      <number-button v-model="passcode" text="8" :disabled="disabled" />
      <number-button v-model="passcode" text="9" :disabled="disabled" />
    </div>
    <div class="row">
      <number-button v-model="passcode" text="0" :disabled="disabled" />
      <number-button v-model="passcode" text="Borrar" :disabled="disabled" />
    </div>
  </div>
</template>

<script>
import NumberButton from '~/components/molecules/NumberButton';

export default {
  components: { NumberButton },
  props: {
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
      passcode: '',
    };
  },
  watch: {
    passcode() {
      this.$emit('input', this.passcode);
    },
  },
  methods: {
    initializePasscode() {
      this.passcode = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.number-pad {
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 12px;

    &:last-child {
      justify-content: flex-end;
    }

    .number-button {
      margin-right: 12px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
