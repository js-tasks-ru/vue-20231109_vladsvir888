<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
      :style="localPreview && `--bg-url: url('${localPreview}')`"
    >
      <span class="image-uploader__text">{{ text }}</span>
      <input
        ref="inputFile"
        @click="handleFileClick"
        @change="handleFileChange"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },
  emits: ['select', 'upload', 'error', 'remove'],
  data() {
    return {
      loading: false,
      selectedFile: '',
      localPreview: this.preview,
    };
  },
  computed: {
    text() {
      if (!this.localPreview && !this.selectedFile) {
        return 'Загрузить изображение';
      } else if (this.loading) {
        return 'Загрузка...';
      }
      return 'Удалить изображение';
    },
  },
  methods: {
    async handleFileChange() {
      const ref = this.$refs.inputFile;
      const file = ref.files[0];

      if (!file) return;

      try {
        this.localPreview = this.selectedFile = URL.createObjectURL(file);

        if (!this.uploader) return;

        this.loading = true;
        const response = await this.uploader(file);
        this.$emit('upload', response);
      } catch (error) {
        ref.value = '';
        this.selectedFile = '';
        this.localPreview = '';
        this.$emit('error', error);
      } finally {
        this.loading = false;
        this.$emit('select', file);
      }
    },
    handleFileClick(event) {
      const ref = this.$refs.inputFile;

      if ((!ref.value && !this.localPreview) || this.loading) return;

      event.preventDefault();
      ref.value = '';
      this.selectedFile = '';
      this.localPreview = '';
      this.$emit('remove');
    },
  },
};
</script>

<style scoped>
.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
