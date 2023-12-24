# MeetupAgendaItemForm

Задача, аналогично предыдущей, решается путём доделывания решения с вебинара.

### Вывод нужной формы

Пока самое простое решение — выделить три случая и сделать три условия через `<template v-if="">`.

Лучшим решением, конечно, будет описать форму и сгенерировать её на лету. Но на это будет отдельная задача ;)

### Обновление времени окончания при изменении времени начала

Самой сложность частью задачи может оказаться обновление времени окончания. Но основная сложность тут — алгоритмическая.

У нас есть несколько вариантов, как отлавливать момент изменения времени начала: события элемента ввода и отслеживание
через `watch`.

Отслеживание через `watch` проще, нам сразу приходит новое и старое значения, по которым мы можем получить изменение
времени. Имя у этой функции будет содержать весь путь, например, `'localAgendaItem.startsAt'(newValue, oldValue) {}`.

Затем можно распарсить строки, перевести время в минуты, и найти изменение времени начала в минутах. То же самое сделать
с временем окончания и прибавить к нему это изменение.

Сумма может получиться больше, чем 24 часа. Но если
[взять её по модулю](https://ru.wikipedia.org/wiki/Деление_с_остатком) (24 \* 60), то мы получим корректное значение.

Вторая проблема может быть при сильном уменьшении времени, когда сумма получается отрицательная. Но достаточно прибавить
к ней те же 24 \* 60, чтобы вернуться в положительные значения. Это не повлияет на результат для остальных случаев, так
как далее мы берём по этому же модулю. Простыми словами, операция взятия по модулю позволяет держать сумму "циклически"
в некотором диапазоне.

Подобные "алгоритмические" [задачи](https://habr.com/ru/post/278867/) нередко встречаются на собеседованиях.

### Решение

```html
<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown v-model="localAgendaItem.type" title="Тип" :options="$options.agendaItemTypeOptions" name="type" />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput v-model="localAgendaItem.startsAt" type="time" placeholder="00:00" name="startsAt" />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput v-model="localAgendaItem.endsAt" type="time" placeholder="00:00" name="endsAt" />
        </UiFormGroup>
      </div>
    </div>

    <template v-if="localAgendaItem.type === 'talk'">
      <UiFormGroup label="Тема">
        <UiInput v-model.lazy="localAgendaItem.title" name="title" />
      </UiFormGroup>
      <UiFormGroup label="Докладчик">
        <UiInput v-model.lazy="localAgendaItem.speaker" name="speaker" />
      </UiFormGroup>
      <UiFormGroup label="Описание">
        <UiInput v-model.lazy="localAgendaItem.description" multiline name="description" />
      </UiFormGroup>
      <UiFormGroup label="Язык">
        <UiDropdown
          v-model="localAgendaItem.language"
          title="Язык"
          :options="$options.talkLanguageOptions"
          name="language"
        />
      </UiFormGroup>
    </template>

    <template v-else-if="localAgendaItem.type === 'other'">
      <UiFormGroup label="Заголовок">
        <UiInput v-model="localAgendaItem.title" name="title" />
      </UiFormGroup>
      <UiFormGroup label="Описание">
        <UiInput v-model="localAgendaItem.description" multiline name="description" />
      </UiFormGroup>
    </template>

    <template v-else>
      <UiFormGroup label="Нестандартный текст (необязательно)">
        <UiInput v-model="localAgendaItem.title" name="title" />
      </UiFormGroup>
    </template>
  </fieldset>
</template>

<script>
  import UiIcon from './UiIcon.vue';
  import UiFormGroup from './UiFormGroup.vue';
  import UiInput from './UiInput.vue';
  import UiDropdown from './UiDropdown.vue';

  const agendaItemTypeIcons = {
    registration: 'key',
    opening: 'cal-sm',
    talk: 'tv',
    break: 'clock',
    coffee: 'coffee',
    closing: 'key',
    afterparty: 'cal-sm',
    other: 'cal-sm',
  };

  const agendaItemDefaultTitles = {
    registration: 'Регистрация',
    opening: 'Открытие',
    break: 'Перерыв',
    coffee: 'Coffee Break',
    closing: 'Закрытие',
    afterparty: 'Afterparty',
    talk: 'Доклад',
    other: 'Другое',
  };

  const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
    value: type,
    text: title,
    icon: agendaItemTypeIcons[type],
  }));

  const talkLanguageOptions = [
    { value: null, text: 'Не указано' },
    { value: 'RU', text: 'RU' },
    { value: 'EN', text: 'EN' },
  ];

  export default {
    name: 'MeetupAgendaItemForm',

    components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

    agendaItemTypeOptions,
    talkLanguageOptions,

    props: {
      agendaItem: {
        type: Object,
        required: true,
      },
    },

    emits: ['update:agendaItem', 'remove'],

    data() {
      return {
        localAgendaItem: { ...this.agendaItem },
      };
    },

    computed: {
      startsAt() {
        return this.localAgendaItem.startsAt;
      },
    },

    watch: {
      localAgendaItem: {
        deep: true,
        handler() {
          this.$emit('update:agendaItem', { ...this.localAgendaItem });
        },
      },

      startsAt(newValue, oldValue) {
        // Если время не введено или введено не до конца, браузер вернёт пустую строку (при поддержке time)
        // Но Safari не поддерживает input[type=time] :(
        // Придётся проверять
        if (!/([0-1]\d|2[0-3]):[0-5]\d/.test(newValue)) {
          return;
        }
        // Разделяем время на часы и минуты и переводим в минуты
        const timeToMinutes = (time) => {
          const [h, m] = time.split(':').map((x) => parseInt(x, 10));
          return h * 60 + m;
        };
        const newMinutes = timeToMinutes(newValue);
        const oldMinutes = timeToMinutes(oldValue);
        const oldEndsAtMinutes = timeToMinutes(this.localAgendaItem.endsAt);
        // Считаем изменение времени в минутах
        const deltaMinutes = newMinutes - oldMinutes;
        // Считаем новое значение
        const newEndsAtMinutes = (oldEndsAtMinutes + deltaMinutes + 24 * 60) % (24 * 60);
        // Пересчитываем обратно в часы и минуты
        const hours = Math.floor(newEndsAtMinutes / 60)
          .toString()
          .padStart(2, '0');
        const minutes = Math.floor(newEndsAtMinutes % 60)
          .toString()
          .padStart(2, '0');
        this.localAgendaItem.endsAt = `${hours}:${minutes}`;
      },
    },
  };
</script>
```
