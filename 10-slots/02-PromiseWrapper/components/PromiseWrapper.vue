<template>
  <slot v-if="result" name="fulfilled" :result="result" />
  <slot v-else-if="error" name="rejected" :error="error" />
  <slot v-else name="pending" />
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      result: null,
      error: null,
    };
  },

  watch: {
    promise: {
      handler(newValue) {
        this.result = null;
        this.error = null;

        newValue
          .then((result) => {
            this.result = result;
          })
          .catch((error) => {
            this.error = error;
          });
      },
      immediate: true,
    },
  },
};
</script>
