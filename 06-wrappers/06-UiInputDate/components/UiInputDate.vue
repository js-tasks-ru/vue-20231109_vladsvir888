<template>
  <UiInput :type="type" :model-value="model" @input="model = $event.target.valueAsNumber">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export default {
  name: 'UiInputDate',
  components: { UiInput },
  props: {
    type: {
      type: String,
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
      default: 'date',
    },
    modelValue: {
      type: Number,
    },
    step: {
      type: Number,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    model: {
      get() {
        // date - yyyy-mm-dd
        // time - hh:mm
        // datetime-local - yyyy-mm-ddThh:mm
        if (!this.modelValue) return null;

        const date = new Date(this.modelValue);
        const year = date.getUTCFullYear();
        const month = padTo2Digits(date.getUTCMonth() + 1);
        const day = padTo2Digits(date.getUTCDate());
        const hours = padTo2Digits(date.getUTCHours());
        const minutes = padTo2Digits(date.getUTCMinutes());
        let value;

        switch (this.type) {
          case 'time':
            value = `${hours}:${minutes}`;
            break;
          case 'datetime-local':
            value = `${year}-${month}-${day}T${hours}:${minutes}`;
            break;
          default:
            value = `${year}-${month}-${day}`;
            break;
        }

        return value;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>
