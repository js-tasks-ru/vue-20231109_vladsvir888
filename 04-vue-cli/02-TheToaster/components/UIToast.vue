<template>
  <div class="toast" :class="className">
    <UiIcon :icon="iconName" class="toast__icon" />
    <span class="toast__text">{{ message }}</span>
    <button v-if="closable" @click="$emit('close')" class="toast__close" aria-label="Close">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path
          d="M15.6209 14.5011C14.0122 12.8785 12.3723 11.2371 10.7823 9.65199L9.36065 8.22909C9.31076 8.17916 9.26088 8.123 9.20477 8.06059C9.18606 8.03563 9.16112 8.01066 9.13618 7.9857C9.16112 7.96074 9.18606 7.94201 9.211 7.92329C9.27335 7.86712 9.32947 7.8172 9.38559 7.76103C11.4432 5.70157 13.5009 3.64211 15.5647 1.57641C15.5834 1.55769 15.6084 1.53897 15.6271 1.51401C15.6957 1.44536 15.7643 1.37671 15.8266 1.30182C16.0324 1.02098 16.0573 0.721426 15.889 0.421868C15.7144 0.109829 15.3714 -0.064913 15.0722 0.022458C14.8726 0.0786251 14.6606 0.203441 14.4923 0.371942C12.8711 1.98206 11.225 3.62963 9.64123 5.22103L8.22583 6.63769C8.17594 6.68762 8.11983 6.73754 8.05747 6.79371C8.03253 6.81867 8.00136 6.84364 7.97642 6.8686C7.95771 6.84364 7.93277 6.81867 7.91406 6.79371C7.86418 6.72506 7.8143 6.66889 7.75818 6.61273C5.68807 4.54079 3.61796 2.47509 1.55409 0.409387C1.53538 0.390664 1.51667 0.371942 1.49797 0.35322C1.43562 0.290812 1.37326 0.222163 1.30467 0.172237C1.02409 -0.0337091 0.724794 -0.0524314 0.425501 0.109829C0.107502 0.27833 -0.0608501 0.621573 0.0202084 0.921131C0.0763259 1.12084 0.201031 1.33926 0.369384 1.50152C2.29608 3.44241 4.26019 5.40201 6.15572 7.30545L6.60466 7.75479C6.66077 7.81096 6.71689 7.85464 6.79171 7.91081C6.82289 7.93577 6.85407 7.96074 6.89148 7.9857C6.85407 8.0169 6.81666 8.04811 6.78548 8.07931C6.71689 8.14172 6.65454 8.19165 6.60466 8.24157C4.54078 10.3073 2.47067 12.3792 0.406795 14.4449C0.38809 14.4636 0.375619 14.4761 0.356913 14.4948C0.29456 14.5572 0.225972 14.6259 0.169855 14.6945C0.00150263 14.9317 -0.035909 15.225 0.0638554 15.4871C0.16362 15.7492 0.38809 15.9365 0.662441 15.9864C1.03656 16.055 1.29844 15.8491 1.49173 15.6619C3.28749 13.8583 5.12066 12.0235 6.89148 10.2511L7.77689 9.36491C7.82677 9.31499 7.88289 9.26506 7.94524 9.20889C7.97018 9.18393 7.99512 9.16521 8.02006 9.14024C8.045 9.16521 8.06371 9.19017 8.08242 9.21513C8.13853 9.27754 8.18842 9.33995 8.2383 9.38988C10.3022 11.4618 12.3723 13.5275 14.4362 15.5932C14.4549 15.6119 14.4673 15.6307 14.486 15.6431C14.5484 15.7055 14.6107 15.7742 14.6856 15.8304C14.8352 15.9427 15.0036 15.9989 15.1719 15.9989C15.3153 15.9989 15.4587 15.9552 15.5959 15.8741C15.9077 15.6743 16.0449 15.3873 15.97 15.0752C15.9264 14.888 15.7954 14.6758 15.6209 14.5011Z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

const toast = {
  success: {
    className: 'toast_success',
    iconName: 'check-circle',
  },
  error: {
    className: 'toast_error',
    iconName: 'alert-circle',
  },
};

export default {
  components: {
    UiIcon,
  },
  props: {
    id: {
      type: Number,
    },
    variant: {
      type: String,
      required: true,
      validator(value) {
        return ['success', 'error'].includes(value);
      },
    },
    message: {
      type: String,
      required: true,
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  computed: {
    className() {
      return toast[this.variant]?.className;
    },
    iconName() {
      return toast[this.variant]?.iconName;
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

.toast__close {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-left: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
