# AdvancedUiTabs-JSX

```jsx
export default {
  render() {
    // Получаем переданные вкладки из слота по умолчанию - массив из vnode
    const content = this.$slots.default();
    // Фильтруем узлы по type, оставляя только UiTab
    const tabs = content.filter((item) => item.type === UiTab);
    // Находим активную вкладку, проверяя значение name входных параметров
    const activeTab = tabs.find((tab) => tab.props.name === this.active);

    // Рендерим вкладки:
    // - Ссылки - по параметрам переданных UiTabs
    // - Контент - непосредственно активную вкладку
    return (
      <div class="tabs">
        <div class="tabs__nav" role="tablist">
          {tabs.map((tab) => (
            <a
              class={['tabs__tab', tab.props.name === this.active ? 'tabs__tab_active' : '']}
              role="tab"
              onClick={() => this.setActive(tab.props.name)}
            >
              {tab.props.title}
            </a>
          ))}
        </div>
        <div class="tabs__content">{activeTab}</div>
      </div>
    );
  },
};
```
