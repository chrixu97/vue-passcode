<template>
  <div class="passcode-pad" :class="rootClasses">
    <transition name="fade" mode="out-in">
      <countdown
        v-if="showCountdown"
        v-model="showCountdown"
        :time="countdownSecs"
      />

      <div v-else class="pad">
        <padlock :status="lockStatus" />
        <h2 class="title">Introduce el código de desbloqueo</h2>
        <passcode-label :passcode="passcode"></passcode-label>
        <number-pad
          ref="numberPad"
          v-model="passcode"
          :disabled="disabledButtons"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import NumberPad from '../NumberPad/NumberPad';
import PasscodeLabel from '../PasscodeLabel';
import Countdown from '../../molecules/Countdown';
import Padlock from '../../molecules/Padlock';

import {
  OK_CODE,
  KO_CODE,
  BLOCK_CODE,
  checkPasscode,
} from '../../../services/AuthenticationService';

const countdownSecs = 30;

export default {
  components: {
    NumberPad,
    PasscodeLabel,
    Countdown,
    Padlock,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data: () => {
    return {
      passcode: '',
      disabledButtons: true,
      password: process.env.passCode,
      status: '',
      animationStatus: '',
      countdownSecs,
      showCountdown: false,
      lockStatus: 1,
      OK_CODE,
      KO_CODE,
      BLOCK_CODE,
    };
  },
  computed: {
    rootClasses() {
      return {
        'success--enter': this.animationStatus === OK_CODE,
        'success--leave': this.animationStatus === OK_CODE + 1,
        'error--enter':
          this.animationStatus === KO_CODE ||
          this.animationStatus === BLOCK_CODE,
        'error--leave':
          this.animationStatus === KO_CODE + 1 ||
          this.animationStatus === BLOCK_CODE + 1,
      };
    },
  },
  watch: {
    passcode() {
      if (this.passcode.length >= 4) this.setFrontFromResponse();
    },
    showCountdown() {
      this.disabledButtons = this.showCountdown;
    },
  },
  mounted() {
    setTimeout(() => {
      this.lockStatus = 2;
      this.disabledButtons = false;
    }, 3000);
  },
  methods: {
    initializePasscode() {
      this.animationStatus = 0;
      this.passcode = '';
      if (this.$refs.numberPad) this.$refs.numberPad.initializePasscode();
    },
    async setFrontFromResponse() {
      this.disabledButtons = true;
      const data = await checkPasscode(this.passcode);
      this.$emit('input', data.status.toString());
      const animationSecs = data.status === OK_CODE ? 3000 : 1000;

      this.fireAnimation(data.status, animationSecs);

      setTimeout(() => {
        this.initializePasscode();

        if (data.status === OK_CODE || data.status === KO_CODE) {
          this.disabledButtons = false;
        }
      }, animationSecs);
    },
    fireAnimation(status, seconds) {
      this.animationStatus = status;

      setTimeout(() => {
        this.animationStatus = status + 1;
      }, seconds - seconds / 3);

      if (status === BLOCK_CODE) {
        this.showCountdown = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.padlock {
  margin-bottom: 28px;
}

.passcode-pad {
  display: flex;
  align-items: center;
  flex-direction: column;

  .pad {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 320px;

    .title {
      color: $acid-white;
      font-weight: normal;
      text-align: center;
      font-size: 20px;
    }
    .passcode-label {
      margin-top: 22px;
      margin-bottom: 32px;
    }
  }
}

// ANIMATIONS
$error-transition: 0.5s;
$sucess-transition: 1s;

.error {
  &--enter {
    ::v-deep .padlock {
      animation: shake $error-transition;
    }

    ::v-deep .passcode-label {
      animation: shake $error-transition;
    }

    ::v-deep .number-button {
      &::before {
        transition: $error-transition;
        background: rgba(255, 32, 32, 0.3);
      }
    }
  }

  &--leave {
    ::v-deep .number-button {
      &::before {
        transition: $error-transition;
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}

.success {
  &--enter {
    ::v-deep .padlock {
      transition: $sucess-transition;
      transform: scale(1.4);

      svg {
        transition: $sucess-transition;
        fill: #6dff48;
      }

      .arch {
        top: -42px;
      }
    }

    ::v-deep .number-button {
      &::before {
        transition: $sucess-transition;
        background: rgba(63, 255, 57, 0.3);
      }
    }
  }

  &--leave {
    ::v-deep .padlock {
      transition: $sucess-transition;
      transform: scale(1);

      svg {
        transition: $sucess-transition;
        fill: $acid-white;
      }
    }

    ::v-deep .number-button {
      &::before {
        transition: $sucess-transition;
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
