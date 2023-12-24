<template>
  <button @click="localCount += 1">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:count'],
  data() {
    return {
      localCount: this.count,
    };
  },
  watch: {
    localCount: {
      handler(newValue) {
        this.$emit('update:count', newValue);
      },
    },
    count: {
      handler(newValue) {
        this.localCount = newValue;
      },
    },
  },
};
</script>
