<template>
  <div class="number-circle">
    <transition name="fade" mode="out-in">
      <my-circle v-if="state === 1" size="small" />
      <p v-else-if="state === 2">{{ number }}</p>
      <my-circle v-else size="small" :filled="true" />
    </transition>
  </div>
</template>

<script>
import MyCircle from '../../atoms/MyCircle';

export default {
  components: {
    MyCircle,
  },
  props: {
    number: {
      type: String,
      default: '',
    },
    state: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped>
.number-circle {
  border-radius: 100px;
  color: $acid-white;
  font-size: 28px;
}

.filled {
  background-color: $acid-white;
}

// Animation
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.05s;
}
.fade-enter,
.fade-leave-to {
  opacity: 40%;
}
</style>
