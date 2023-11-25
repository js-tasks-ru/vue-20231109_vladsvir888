import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',
  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },
  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      meetup: null,
      error: null,
    };
  },
  watch: {
    meetupId: {
      async handler(newMeetup) {
        try {
          this.meetup = null;
          this.loading = true;
          this.meetup = await fetchMeetupById(newMeetup);
        } catch (error) {
          this.error = error.message;
        } finally {
          this.loading = false;
        }
      },
      immediate: true,
    },
  },
  template: `
    <div class="page-meetup">
      <UiContainer v-if="loading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>
      <MeetupView v-else-if="meetup" :meetup="meetup" />
      <UiContainer v-else="error">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});
