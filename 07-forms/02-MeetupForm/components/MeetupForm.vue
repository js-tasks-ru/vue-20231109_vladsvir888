<template>
  <pre>
    {{ meetup }}
  </pre>
  <pre>
    {{ localMeetup }}
  </pre>
  <form @submit.prevent="submit" class="meetup-form">
    <div class="meetup-form__content">
      <fieldset class="meetup-form__section">
        <UiFormGroup label="Название">
          <UiInput name="title" v-model="localMeetup.title" />
        </UiFormGroup>
        <UiFormGroup label="Дата">
          <UiInputDate name="date" v-model="localMeetup.date" />
        </UiFormGroup>
        <UiFormGroup label="Место">
          <UiInput name="place" v-model="localMeetup.place" />
        </UiFormGroup>
        <UiFormGroup label="Описание">
          <UiInput multiline rows="3" name="description" v-model="localMeetup.description" />
        </UiFormGroup>
        <UiFormGroup label="Изображение">
          <UiImageUploader
            name="image"
            :preview="localMeetup.image"
            @select="localMeetup.imageToUpload = $event"
            @remove="localMeetup.imageToUpload = null"
          />
        </UiFormGroup>
      </fieldset>
      <h3 class="meetup-form__agenda-title">Программа</h3>
      <!--
        @update:agendaItem="(newValue) => (localMeetup.agenda[index] = newValue)"
        :agenda-item="agendaItem"
      -->
      <MeetupAgendaItemForm
        v-for="(agendaItem, index) in localMeetup.agenda"
        :key="agendaItem.id"
        v-model:agenda-item="localMeetup.agenda[index]"
        @remove="removeAgendaItem(index)"
        class="meetup-form__agenda-item"
      ></MeetupAgendaItemForm>
      <div class="meetup-form__append">
        <button @click="addAgendaItem" class="meetup-form__append-button" type="button" data-test="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>
    <div class="meetup-form__aside">
      <div class="meetup-form__aside-stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <ui-button
          @click="$emit('cancel')"
          variant="secondary"
          block
          class="meetup-form__aside-button"
          data-test="cancel"
          >Отмена</ui-button
        >
        <ui-button variant="primary" block class="meetup-form__aside-button" data-test="submit" type="submit">
          {{ submitText }}
        </ui-button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import UiButton from './UiButton.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiImageUploader from '../../../06-wrappers/05-UiImageUploader/components/UiImageUploader.vue';
import UiInput from './UiInput.vue';
import UiInputDate from '../../../06-wrappers/06-UiInputDate/components/UiInputDate.vue';
import { createAgendaItem } from '../meetupService.js';
import { klona } from 'klona';

export default {
  name: 'MeetupForm',
  components: {
    MeetupAgendaItemForm,
    UiButton,
    UiFormGroup,
    UiImageUploader,
    UiInput,
    UiInputDate,
  },
  props: {
    meetup: {
      type: Object,
      required: true,
    },

    submitText: {
      type: String,
      default: '',
    },
  },
  emits: ['cancel', 'submit'],
  data() {
    return {
      localMeetup: klona(this.meetup),
    };
  },
  methods: {
    addAgendaItem() {
      let agendaItem = createAgendaItem();
      const agenda = this.localMeetup.agenda;
      const numberAgendaItems = agenda.length;
      if (numberAgendaItems > 0) {
        agendaItem = {
          ...agendaItem,
          startsAt: agenda[numberAgendaItems - 1].endsAt,
        };
      }
      agenda.push(agendaItem);
    },
    removeAgendaItem(index) {
      this.localMeetup.agenda.splice(index, 1);
    },
    submit() {
      this.$emit('submit', klona(this.localMeetup));
    },
  },
};
</script>

<style scoped>
.meetup-form__section {
  border: none;
}

.meetup-form__agenda-title {
  font-weight: 700;
  font-size: 28px;
  line-height: 150%;
  color: var(--body-color);
  margin: 0 0 24px 0;
}

.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside-button {
  margin: 0 0 12px 0;
}

.meetup-form__agenda-item + .meetup-form__agenda-item {
  margin-top: 24px;
}

.meetup-form__append {
  margin-top: 24px;
}

.meetup-form__append-button {
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
}

.meetup-form__append-button:hover {
  text-decoration: underline;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside-stick {
    position: sticky;
    top: 32px;
  }
}
</style>
