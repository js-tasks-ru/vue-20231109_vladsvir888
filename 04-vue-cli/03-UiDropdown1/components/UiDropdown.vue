<template>
  <div class="dropdown" :class="{ dropdown_opened: open }">
    <button
      @click.stop="open = !open"
      @blur="hideDropdown"
      :class="{ dropdown__toggle_icon: classNameIcon }"
      class="dropdown__toggle"
      type="button"
    >
      <UiIcon v-if="selectedOption.icon" :icon="selectedOption.icon" class="dropdown__icon" />
      <span>{{ selectedOption.text || selectedOption }}</span>
    </button>

    <Transition name="fade">
      <div class="dropdown__menu" role="listbox" v-show="open">
        <button
          v-for="option in options"
          @click="handleClickOption"
          :key="option.value"
          :value="option.value"
          :class="{ dropdown__item_icon: classNameIcon }"
          class="dropdown__item"
          role="option"
          type="button"
        >
          <UiIcon v-if="option.icon" :icon="option.icon" class="dropdown__icon" />
          {{ option.text }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiDropdown',
  components: { UiIcon },
  props: {
    options: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      open: false,
    };
  },
  methods: {
    hideDropdown() {
      this.open = false;
    },
    handleClickOption(event) {
      this.$emit('update:modelValue', event.target.value);
      this.hideDropdown();
    },
  },
  computed: {
    classNameIcon() {
      return this.options.find((option) => option.icon);
    },
    selectedOption() {
      if (!this.modelValue) return this.title;

      return this.options.find((option) => option.value === this.modelValue);
    },
  },
  mounted() {
    document.addEventListener('click', this.hideDropdown);
  },
  unmounted() {
    document.removeEventListener('click', this.hideDropdown);
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown__toggle {
  display: inline-block;
  background-color: var(--white);
  background-position: calc(100% - 10px) calc(100% - 10px);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 10px 56px 10px 24px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  transition-duration: 0.3s;
  transition-property: background-color, fill, color, border-color;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  text-decoration: none;
}

.dropdown__toggle:after {
  content: '';
  position: absolute;
  top: 15px;
  right: 16px;
  transform: none;
  background: url('@/assets/icons/icon-chevron-down.svg') no-repeat;
  background-size: cover;
  display: block;
  width: 24px;
  height: 24px;
  transition: 0.2s transform;
}

.dropdown__toggle_icon {
  padding-left: 56px;
}

.dropdown_opened .dropdown__toggle {
  border-color: var(--blue);
  border-bottom-color: transparent;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.dropdown_opened .dropdown__toggle:after {
  transform: rotate(180deg);
}

.dropdown__menu {
  background-clip: padding-box;
  border-radius: 0 0 8px 8px;
  border: 2px solid var(--blue);
  border-top: none;
  bottom: auto;
  display: flex;
  flex-direction: column;
  left: 0;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  right: auto;
  top: -1px;
  transform: translate3d(0px, 52px, 0px);
  width: 100%;
  will-change: transform;
  z-index: 95;
}

.dropdown__item {
  padding: 8px 16px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  background-color: var(--white);
  box-shadow: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  text-decoration: none;
}

.dropdown__item:hover,
.dropdown__item:focus {
  background-color: var(--grey-light);
}

.dropdown__item_icon {
  padding-left: 56px;
  position: relative;
}

.dropdown__item_icon .dropdown__icon,
.dropdown__toggle_icon .dropdown__icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate(0, -50%);
}
</style>
