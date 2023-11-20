import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',
  props: {
    count: Number,
  },
  emits: ['update:count'],
  template: `<button @click="$emit('update:count', count + 1)" type="button">{{ count || '0' }}</button>`,
});
