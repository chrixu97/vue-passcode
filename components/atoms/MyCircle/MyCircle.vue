<template>
  <div class="my-circle" :class="rootClasses">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value),
    },
    filled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    rootClasses() {
      return {
        [`${this.size}-size`]: this.size,
        filled: this.filled,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.my-circle {
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.small-size {
  border: 2px solid $acid-white;
  width: 20px;
  height: 20px;
}
.medium-size {
  position: relative;
  width: 80px;
  height: 80px;
  font-size: 28px;
  font-weight: 500;
  color: $acid-white;
}
.large-size {
  border: 6px solid $acid-white;
  width: 200px;
  height: 200px;
}
</style>
