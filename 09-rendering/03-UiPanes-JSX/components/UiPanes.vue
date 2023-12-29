<script lang="jsx">
import UiButton from './UiButton.vue';

export default {
  name: 'UiPanes',

  data() {
    return {
      slots: this.$slots.default(),
    };
  },

  methods: {
    /**
     * Переместить i-ую панель вверх
     *
     * @param {number} i
     */
    up(i) {
      const temp = this.slots[i];
      this.slots[i] = this.slots[i - 1];
      this.slots[i - 1] = temp;
    },

    /**
     * Переместить i-ую панель вниз
     *
     * @param {number} i
     */
    down(i) {
      const temp = this.slots[i];
      this.slots[i] = this.slots[i + 1];
      this.slots[i + 1] = temp;
    },
  },

  render() {
    return (
      <div class="panes">
        {this.slots.map((slot, index) => (
          <div class="pane">
            <div class="pane__content">{slot}</div>
            <div class="pane__controls">
              <UiButton
                class={index === 0 ? 'pane__disabled-button' : ''}
                variant="secondary"
                block
                onClick={() => this.up(index)}
              >
                Up
              </UiButton>
              <UiButton
                class={index + 1 === this.slots.length ? 'pane__disabled-button' : ''}
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
