<template>
  <div id="index">
    <div class="container">
      <passcode-pad v-model="status" />
    </div>
  </div>
</template>

<script>
import PasscodePad from '../components/organism/PasscodePad';

export default {
  components: {
    PasscodePad,
  },
  data: () => {
    return {
      status: '',
    };
  },
};
</script>

<style lang="scss">
#index {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  background-image: url('../assets/img/background.png');
  background-color: #1f1f1f;
  background-repeat: no-repeat;
  background-size: cover;
}

.container {
  width: 800px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  fill: green;
}
</style>
