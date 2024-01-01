<template>
  <div class="button-group" role="group">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'UiButtonGroup',

  props: {
    modelValue: {
      required: true,
    },
  },

  emits: ['update:modelValue'],

  methods: {
    update(type) {
      this.$emit('update:modelValue', type);
    },
  },
};
</script>

<style scoped>
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
