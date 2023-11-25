import { defineComponent } from './vendor/vue.esm-browser.js';
import CounterButton from './CounterButton.js';

export default defineComponent({
  name: 'App',

  components: {
    CounterButton,
  },

  data() {
    return {
      count: 0,
    };
  },

  template: `
    <div class="sample container">
      <p>count = {{ count }}</p>
      <p>
        <CounterButton :count="count" @update:count="(newValue) => count = newValue" />
      </p>
      <p>
        <CounterButton v-model:count="count" />
      </p>
      <p>
        <CounterButton v-model:count="count" />
      </p>
    </div>
  `,
});
