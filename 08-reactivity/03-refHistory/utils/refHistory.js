import { ref, watch } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Отслеживаемый ref
 * @returns {Object<{ history: Ref<T[]> }>} - История изменения source
 */
export function refHistory(source) {
  const newSource = [];

  watch(
    source,
    (newValue) => {
      newSource.push(newValue);
    },
    {
      immediate: true,
      flush: 'sync',
    },
  );

  const history = ref(newSource);
  // ...
  return { history };
}
