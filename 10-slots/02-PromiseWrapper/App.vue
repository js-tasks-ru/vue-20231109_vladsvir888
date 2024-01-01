<template>
  <div class="sample container">
    <select v-model="meetupId">
      <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
    </select>

    <PromiseWrapper v-if="fetchMeetupPromise" :promise="fetchMeetupPromise">
      <template #pending>
        <UiAlert>Loading...</UiAlert>
      </template>

      <template #rejected="{ error }">
        <UiAlert>{{ error.message }}</UiAlert>
      </template>

      <template #fulfilled="{ result }">
        <MeetupCard :meetup="result" />
      </template>
    </PromiseWrapper>
  </div>
</template>

<script>
import MeetupCard from './components/MeetupCard.vue';
import PromiseWrapper from './components/PromiseWrapper.vue';
import UiAlert from './components/UiAlert.vue';
import { fetchMeetupById } from './meetupService.js';

export default {
  name: 'App',

  components: { UiAlert, PromiseWrapper, MeetupCard },

  data() {
    return {
      meetupId: undefined,
      fetchMeetupPromise: undefined,
    };
  },

  watch: {
    meetupId() {
      if (this.meetupId) {
        this.fetchMeetupPromise = fetchMeetupById(this.meetupId);
      }
    },
  },
};
</script>

<style></style>
