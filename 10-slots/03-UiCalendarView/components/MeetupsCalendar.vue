<template>
  <UiCalendarView v-slot="{ cell }">
    <UiCalendarEvent
      v-for="calendarEvent in meetupsByDate[cell.timestamp]"
      :key="calendarEvent.id"
      tag="a"
      :href="`/meetups/${calendarEvent.id}`"
    >
      {{ calendarEvent.title }}
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    meetupsByDate() {
      const result = {};
      for (const meetup of this.meetups) {
        if (!result[meetup.date]) {
          result[meetup.date] = [meetup];
        } else {
          result[meetup.date].push(meetup);
        }
      }

      console.log(result);

      return result;
    },
  },
};
</script>

<style scoped></style>
