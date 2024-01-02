import { createApp } from 'vue';
const { router } = require(global.getSolutionPath('router/index.js'));
const { createProgress } = require(global.getSolutionPath('plugins/progress/index.js'));
const App = require(global.getSolutionPath('App')).default;

describe('reusability/ProgressPlugin', () => {
  describe('createProgress', () => {
    beforeEach(async () => {
      document.body.innerHTML = '';
      const container = document.createElement('div');
      container.id = 'container';
      document.body.appendChild(container);
    });

    it('createProgress должен возвращать сущность с методами start, finish, fail', async () => {
      const progress = createProgress({ container: '#container' });
      expect(progress.start).toBeDefined();
      expect(progress.finish).toBeDefined();
      expect(progress.fail).toBeDefined();
    });

    it('createProgress должен монтироваться в container', async () => {
      createProgress({ container: '#container' });
      expect(document.querySelector('#container')?.__vue_app__).toBeDefined();
    });

    it('createProgress должен монтироваться без container', async () => {
      createProgress();
      expect(document.querySelector('body > *:not(#container)')?.__vue_app__).toBeDefined();
    });

    it('createProgress должен возвращать плагин, который провайдит созданную сущность', async () => {
      const progress = createProgress();
      const app = createApp(App).use(router).use(progress).mount('#container');
      expect(app.progress).toBe(progress);
    });
  });

  describe('Интеграция с VueRouter', () => {
    beforeEach(async () => {
      document.body.innerHTML = '';
      const container = document.createElement('div');
      container.id = 'container';
      document.body.appendChild(container);
      const app = document.createElement('div');
      app.id = 'app';
      document.body.appendChild(app);
    });

    it('ProgressPlugin должен интегрироваться с роутером', async () => {
      jest.spyOn(router, 'beforeEach');
      jest.spyOn(router, 'afterEach');
      jest.spyOn(router, 'onError');
      const progress = createProgress({ container: '#container', router });
      createApp(App).use(router).use(progress).mount('#app');
      expect(router.beforeEach).toHaveBeenCalled();
      expect(router.afterEach).toHaveBeenCalled();
      expect(router.onError).toHaveBeenCalled();
    });
  });
});
