<script lang="jsx">
// Предлагается решать задачу с использованием JSX, но вы можете использовать и чистые рендер-функции

import UiButton from './UiButton.vue';

export default {
  name: 'UiPanes',

  data() {
    return {
      /**
       * Массив с текущим порядком номеров моделей, например
       * [0, 1, 2]
       * @type {number[]|null}
       */
      panes: null,
    };
  },

  methods: {
    /**
     * Переместить i-ую панель вверх
     *
     * @param {number} i
     */
    up(i) {
      const temp = this.panes[i];
      this.panes[i] = this.panes[i - 1];
      this.panes[i - 1] = temp;
    },

    /**
     * Переместить i-ую панель вниз
     *
     * @param {number} i
     */
    down(i) {
      const temp = this.panes[i];
      this.panes[i] = this.panes[i + 1];
      this.panes[i + 1] = temp;
    },
  },

  render() {
    // Получаем массив переданных узлов (vnodes)
    const panesVnodes = this.$slots.default?.();

    // При первом рендеринге генерируем начальный массив с порядком панелей
    if (!this.panes && panesVnodes) {
      this.panes = Array.from(Array(panesVnodes.length), (_, i) => i);
    }

    return (
      <div class="panes">
        {this.panes?.map((pane, index) => (
          <div key={pane} class="pane">
            <div class="pane__content">{panesVnodes[pane]}</div>
            <div class="pane__controls">
              <UiButton
                class={{ 'pane__disabled-button': index === 0 }}
                variant="secondary"
                block
                onClick={() => this.up(index)}
              >
                Up
              </UiButton>
              <UiButton
                class={{ 'pane__disabled-button': index === this.panes.length - 1 }}
                variant="danger"
                block
                onClick={() => this.down(index)}
              >
                Down
              </UiButton>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
</script>

<style scoped>
.panes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pane {
  display: flex;
  flex-direction: row;
  border: 3px solid var(--blue-light);
}

.pane__content {
  border-right: 3px solid var(--blue-light);
  padding: 8px;
  flex: 1 0;
}

.pane__controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  width: min-content;
}

.pane__disabled-button {
  visibility: hidden;
}
</style>
