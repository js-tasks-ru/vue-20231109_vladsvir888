import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  const addDefaultContainer = () => document.body.appendChild(document.createElement('div'));
  const progressInstance = createApp(TheTopProgressBar).mount(container ?? addDefaultContainer());
  const progress = {
    start: progressInstance.start,
    finish: progressInstance.finish,
    fail: progressInstance.fail,
    install(app) {
      app.provide(PROGRESS_KEY, progress);
    }
  };

  if (router) {
    router.beforeEach(() => progress.start());
    router.afterEach(() => progress.finish());
    router.onError(() => progress.fail());
  }

  return progress;
}
