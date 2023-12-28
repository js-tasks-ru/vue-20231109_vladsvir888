# UiPanes-JSX

👷🏻 _Задача нормальной сложности_\
⭐ _Дополнительная задача_

<!--start_statement-->

Реализован небольшой компонент `UiPanes`, в котором выводятся три панели с кнопками **Up** и **Down**. Нажатие на кнопку
перемешает панель вверх или вниз.

В текущей реализации для использования компонента требуется передать содержимое панелей в три пронумерованных слота,
например:

```html
<UiPanes>
  <template #pane-0>
    <div>Content of Pane-0</div>
  </template>
  <template #pane-1>
    <div>Content of Pane-1</div>
  </template>
  <template #pane-2>
    <div>Content of Pane-2</div>
  </template>
</UiPanes>
```

Требуется изменить реализацию компонента таким образом, чтобы можно было передать любое количество элементов в
единственный слот по умолчанию.

```html
<UiPanes>
  <div>Content of Pane-1</div>
  <div>Content of Pane-2</div>
  <div>Content of Pane-3</div>
  <div>Content of Pane-4</div>
</UiPanes>
```

<img src="https://i.imgur.com/ammMC0g.gif" alt="Example" />

Поддерживать изменение количества панелей не требуется.

_Примечание: есть и другие способы решить эту задачу, в том числе на основе CSS. Здесь предлагается решить с
использованием render-функции для практики такого подхода._

<!--end_statement-->

---

### Инструкция

📝 Для решения задачи отредактируйте файл: `components/UiPanes.vue`.

🚀 Команда запуска для ручного тестирования: `npm run serve`;\
приложение будет доступно на [http://localhost:8080/09-rendering/03-UiPanes-JSX/](http://localhost:8080/09-rendering/03-UiPanes-JSX/).

✅ Доступно автоматическое тестирование: `npm test UiPanes-JSX`.
