<template>
  <div class="padlock" :class="rootClasses">
    <arch class="arch" />
    <square class="square" />
  </div>
</template>

<script>
import Square from '~/assets/svg/lock-square.svg';
import Arch from '~/assets/svg/lock-arch.svg';

const INIT = 1;
const LOCK = 2;
const SUCCESS = 3;

export default {
  components: {
    Square,
    Arch,
  },
  props: {
    status: {
      type: Number,
      default: 2,
    },
  },
  data: () => {
    return {
      INIT,
      LOCK,
      SUCCESS,
    };
  },
  computed: {
    rootClasses() {
      return {
        init: this.status === 1,
        locked: this.status === 2,
        success: this.status === 3,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.padlock {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  .square,
  .arch {
    fill: white;
  }

  .arch {
    position: absolute;
    width: 40px;
    height: 46px;
    top: -26px;
  }

  .square {
    width: 56px;
    height: 58px;
  }
}

.init {
  animation: minimize 3s;

  .arch {
    animation: lock 3s;
  }
}

.locked {
  transform: scale(1);
}

@keyframes lock {
  0% {
    transform: translateY(-18px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes minimize {
  0% {
    transform: scale(1.4);
  }

  70% {
    transform: scale(1.4);
  }

  100% {
    transform: scale(1);
  }
}
</style>
