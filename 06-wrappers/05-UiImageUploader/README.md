# UiImageUploader

Для получения изображения требуется обработать событие `@change` у поля ввода. Файл с выбранным изображением можно найти
в `$event.target.files[0]`.

Ещё одна проблема может быть, если при удалении изображения не сбрасывать значения поля ввода. Для удаления выбранного
изображения можно, например, установить falsy значение в качестве значения.

При клике на "Удалить изображение" важно также вызывать `$event.preventDefault();`, чтобы не открыть диалог выбора
файла.

В остальном сложность задачи сводится к реализации его состояний и перехода между ними.

```html
<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': state === $options.States.LOADING }"
      :style="state !== $options.States.EMPTY && `--bg-url: url('${imageSrc}')`"
    >
      <span class="image-uploader__text">{{ stateText }}</span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @change="handleFileSelect"
        @click="handleClick"
      />
    </label>
  </div>
</template>

<script>
  const States = {
    EMPTY: 'EMPTY',
    LOADING: 'LOADING',
    FILLED: 'FILLED',
  };

  export default {
    name: 'UiImageUploader',
    inheritAttrs: false,

    States,

    props: {
      uploader: {
        type: Function,
      },

      preview: {
        type: String,
      },
    },

    emits: ['upload', 'select', 'error', 'remove'],

    data() {
      return {
        // Храним текущее состояние
        // Начальное состояние зависит от того, передан ли preview
        state: this.preview ? States.FILLED : States.EMPTY,
        // Текущее изображение тоже храним локально
        localPreview: null,
      };
    },

    computed: {
      stateText() {
        return {
          [States.EMPTY]: 'Загрузить изображение',
          [States.LOADING]: 'Загрузка...',
          [States.FILLED]: 'Удалить изображение',
        }[this.state];
      },

      imageSrc() {
        // Текущее изображение - либо уже выбранное локальное, либо изначальное превью
        // Для удалённого изображения здесь будет ссылка на preview, но не будет выводиться
        return this.localPreview ?? this.preview;
      },
    },

    beforeUnmount() {
      // Чистим созданный идентификатор на изображение компонента
      if (this.localPreview) {
        URL.revokeObjectURL(this.localPreview);
      }
    },

    methods: {
      async handleFileSelect($event) {
        // Достаём файл их события (инпута) и отдаём с событием родителю
        const file = $event.target.files[0];
        this.$emit('select', file);
        // Создаём ссылку на текущий файл для отображения
        this.localPreview = URL.createObjectURL(file);
        // Если нет загрузчика, работа с файлом завершена
        if (!this.uploader) {
          this.state = States.FILLED;
          return;
        }
        // Загружаем файл
        return await this.upload(file);
      },

      async upload(file) {
        this.state = States.LOADING;
        try {
          const result = await this.uploader(file);
          this.$emit('upload', result);
          this.state = States.FILLED;
        } catch (error) {
          this.$emit('error', error);
          this.state = States.EMPTY;
          // Не забываем сбросить файл в случае не успешной загрузки
          // Иначе нельзя будет выбрать тот же файл
          this.removeFile();
        }
      },

      handleClick($event) {
        if (this.state === States.LOADING) {
          // Игнорируем клик во время загрузки
          $event.preventDefault();
        } else if (this.state === States.FILLED) {
          $event.preventDefault();
          this.removeFile();
          this.state = States.EMPTY;
          this.$emit('remove');
        }
        // Когда ничего не выбрано, клик обрабатывается по умолчанию, открывая диалог выбора файла
      },

      removeFile() {
        // Файл нельзя удалить нормальным Vue-way способом, нужно напрямую менять DOM
        this.$refs.input.value = '';
        this.localPreview = null;
      },
    },
  };
</script>
```
