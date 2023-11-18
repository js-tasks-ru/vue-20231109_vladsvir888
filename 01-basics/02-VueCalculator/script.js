import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      calculator: {
        input1: '',
        input2: '',
        operation: '',
      },
    };
  },
  methods: {
    sum() {
      return this.calculator.input1 + this.calculator.input2;
    },
    subtract() {
      return this.calculator.input1 - this.calculator.input2;
    },
    multiply() {
      return this.calculator.input1 * this.calculator.input2;
    },
    divide() {
      return this.calculator.input1 / this.calculator.input2;
    },
  },
  computed: {
    calculationResult() {
      if (this.calculator.operation === '' || this.calculator.input1 === '' || this.calculator.input2 === '') return 0;

      const result = this[this.calculator.operation]();

      if (!isFinite(result)) return 'Деление на ноль невозможно.';

      return result;
    },
  },
});

app.mount('#app');
