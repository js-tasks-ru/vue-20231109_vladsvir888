<template>
  <div class="sample container">
    <p><b>Model Value:</b> {{ date }}</p>
    <p><b>Date:</b> {{ new Date(date).toDateString() }}</p>
    <p><b>Time:</b> {{ new Date(date).toTimeString() }}</p>

    <UiFormGroup label="[type=date]">
      <UiInputDate v-model="date" />
    </UiFormGroup>

    <UiFormGroup label="[type=time]">
      <UiInputDate v-model="date" type="time" />
    </UiFormGroup>

    <UiFormGroup label="[type=time][step=30]">
      <UiInputDate v-model="date" type="time" step="30" />
    </UiFormGroup>

    <UiFormGroup label="[type=datetime-local]">
      <UiInputDate v-model="date" type="datetime-local" />
    </UiFormGroup>

    <UiFormGroup label="With Icons">
      <button @click="showIcons = !showIcons">Toggle Icons</button>
      <UiInputDate v-model="date">
        <template v-if="showIcons" #left-icon>
          <UiIcon icon="search" />
        </template>
        <template v-if="showIcons" #right-icon>
          <UiIcon icon="pen-tool" />
        </template>
      </UiInputDate>
    </UiFormGroup>
  </div>
</template>

<script>
import UiIcon from './components/UiIcon.vue';
import UiInputDate from './components/UiInputDate.vue';
import UiFormGroup from './components/UiFormGroup.vue';

export default {
  name: 'App',

  components: { UiFormGroup, UiIcon, UiInputDate },

  data() {
    return {
      date: Date.UTC(2013, 11, 11, 14, 15, 16),
      showIcons: true,
    };
  },
};
</script>

<style>
@import '@/assets/styles/_container.css';
</style>
