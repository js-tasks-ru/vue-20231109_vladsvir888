<template>
  <div class="toasts">
    <UIToast
      v-for="toast in toasts"
      :key="toast.id"
      :id="toast.id"
      :class="toast.className"
      :message="toast.message"
      :icon="toast.icon"
      :closable="toast.closable"
      @close="removeToast"
    ></UIToast>
  </div>
</template>

<script>
import UIToast from './UIToast.vue';

export default {
  name: 'TheToaster',
  components: {
    UIToast,
  },
  data() {
    return {
      toasts: [],
    };
  },
  methods: {
    success(message) {
      this.addToast({
        id: Date.now(),
        className: 'toast_success',
        message,
        icon: {
          name: 'check-circle',
        },
        duration: 5000,
      });
    },
    error(message) {
      this.addToast({
        id: Date.now(),
        className: 'toast_error',
        message,
        icon: {
          name: 'alert-circle',
        },
        duration: 5000,
        closable: true,
      });
    },
    addToast(toast) {
      this.toasts.push(toast);

      if (!toast.duration) return;

      setTimeout(() => {
        this.removeToast(toast.id);
      }, toast.duration);
    },
    removeToast(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
