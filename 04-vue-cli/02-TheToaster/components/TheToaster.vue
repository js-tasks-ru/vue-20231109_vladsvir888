<template>
  <div class="toasts">
    <UIToast
      v-for="toast in toasts"
      :key="toast.id"
      :id="toast.id"
      :variant="toast.variant"
      :message="toast.message"
      :closable="toast.closable"
      @close="removeToast(toast.id)"
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
        id: Math.random(),
        variant: 'success',
        message,
        duration: 5000,
      });
    },
    error(message) {
      this.addToast({
        id: Math.random(),
        variant: 'error',
        message,
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
