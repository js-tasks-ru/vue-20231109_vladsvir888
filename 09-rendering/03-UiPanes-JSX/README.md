# UiPanes-JSX

Для начала перепишем компонент на render-функцию:

- `<slot>` заменяем на `this.$slots`
- `@click` заменяем на `onClick` и не забываем заменить тело обработчика события на функцию

```jsx
export default {
  render() {
    return (
      <div class="panes">
        <div class="pane">
          <div class="pane__content">{this.$slots[`pane-${this.panes[0]}`]?.()}</div>
          <div class="pane__controls">
            <UiButton class="pane__disabled-button" variant="secondary" block onClick={() => this.up(0)}>
              Up
            </UiButton>
            <UiButton variant="danger" block onClick={() => this.down(0)}>
              Down
            </UiButton>
          </div>
        </div>
        <div class="pane">
          <div class="pane__content">{this.$slots[`pane-${this.panes[1]}`]?.()}</div>
          <div class="pane__controls">
            <UiButton variant="secondary" block onClick={() => this.up(1)}>
              Up
            </UiButton>
            <UiButton variant="danger" block onClick={() => this.down(1)}>
              Down
            </UiButton>
          </div>
        </div>
        <div class="pane">
          <div class="pane__content">{this.$slots[`pane-${this.panes[2]}`]?.()}</div>
          <div class="pane__controls">
            <UiButton variant="secondary" block onClick={() => this.up(2)}>
              Up
            </UiButton>
            <UiButton class="pane__disabled-button" variant="danger" block onClick={() => this.down(2)}>
              Down
            </UiButton>
          </div>
        </div>
      </div>
    );
  },
};
```

Заменяем три последовательных блока на вывод с помощью цикла (`map`):

- Основной цикл по `this.panes.map((pane, index))`
- Используем `pane` для номера слота и `index` для обработчиков событий
- Добавляем условия скрытия кнопок классом `pane__disabled-button`

```jsx
export default {
  render() {
    return (
      <div class="panes">
        {this.panes.map((pane, index) => (
          <div class="pane">
            <div class="pane__content">{this.$slots[`pane-${pane}`]?.()}</div>
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
```

Теперь требуется избавиться от именованных слотов.

Получить все переданные узлы в виде массива можно напрямую из слота по умолчанию.

```js
const panesVnodes = this.$slots.default?.();
```

Из него же можно сформировать начальный массив порядка панелей:

```js
if (!this.panes && panesVnodes) {
  this.panes = Array.from(Array(panesVnodes.length), (_, i) => i);
}
```

Остаётся только выводить не слот, а элементы этого массива:

```jsx
export default {
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
```

Полное решение:

```jsx
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
```
