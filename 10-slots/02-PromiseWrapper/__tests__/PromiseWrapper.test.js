import { flushPromises, mount } from '@vue/test-utils';
import { h } from 'vue';
const PromiseWrapper = require(global.getSolutionPath('components/PromiseWrapper.vue')).default;

describe('slots/PromiseWrapper', () => {
  describe('PromiseWrapper', () => {
    let wrapper;
    let promiseMock;

    const PENDING_TEXT = 'TestPending';
    const RESOLVED_TEXT = 'ResolvedPromise';
    const REJECTED_TEXT = 'RejectedPromise';
    const PENDING_CONTENT = `<div>${PENDING_TEXT}</div>`;
    const RESOLVED_CONTENT = `<div>${RESOLVED_TEXT}</div>`;
    const REJECTED_CONTENT = `<div>${REJECTED_TEXT}</div>`;

    const createPromiseMock = () => {
      let doResolve;
      let doReject;
      const promise = new Promise((resolve, reject) => {
        doResolve = resolve;
        doReject = reject;
      });
      return { doResolve, doReject, promise };
    };

    beforeEach(() => {
      promiseMock = createPromiseMock();

      wrapper = mount(PromiseWrapper, {
        props: { promise: promiseMock.promise },
        slots: {
          pending: () => h('div', PENDING_TEXT),
          fulfilled: ({ result }) => h('div', result.text),
          rejected: ({ error }) => h('div', error.message),
        },
      });
    });

    afterEach(() => {
      promiseMock = undefined;
    });

    it('PromiseWrapper должен рендерить #pending слот, когда promise находится в состоянии pending', async () => {
      expect(wrapper.html()).toContain(PENDING_CONTENT);
      expect(wrapper.html()).not.toContain(RESOLVED_CONTENT);
      expect(wrapper.html()).not.toContain(REJECTED_CONTENT);
    });

    it('PromiseWrapper должен рендерить #fulfilled слот с результатом промиса в параметре result, когда promise успешно завершился', async () => {
      promiseMock.doResolve({ text: RESOLVED_TEXT });
      await flushPromises();
      expect(wrapper.html()).not.toContain(PENDING_CONTENT);
      expect(wrapper.html()).toContain(RESOLVED_CONTENT);
      expect(wrapper.html()).not.toContain(REJECTED_CONTENT);
    });

    it('PromiseWrapper должен рендерить #rejected слот с исключением промиса в параметре error, когда promise отклонён', async () => {
      promiseMock.doReject(new Error(REJECTED_TEXT));
      await flushPromises();
      expect(wrapper.html()).not.toContain(PENDING_CONTENT);
      expect(wrapper.html()).not.toContain(RESOLVED_CONTENT);
      expect(wrapper.html()).toContain(REJECTED_CONTENT);
    });

    it('PromiseWrapper должен рендерить #pending слот после обновления промиса в параметре promise на новый незавершённый', async () => {
      promiseMock.doResolve({});
      await flushPromises();
      promiseMock = createPromiseMock();
      await wrapper.setProps({ promise: promiseMock.promise });
      expect(wrapper.html()).toContain(PENDING_CONTENT);
      expect(wrapper.html()).not.toContain(RESOLVED_CONTENT);
      expect(wrapper.html()).not.toContain(REJECTED_CONTENT);
    });

    it('PromiseWrapper должен рендерить #pending слот после обновления промиса в параметре promise на новый незавершённый', async () => {
      promiseMock.doResolve({});
      await flushPromises();
      await wrapper.setProps({});
      promiseMock = createPromiseMock();
      await wrapper.setProps({ promise: promiseMock.promise });
      promiseMock.doResolve({ text: 'NewPromise' });
      await flushPromises();
      expect(wrapper.html()).toContain('<div>NewPromise</div>');
      expect(wrapper.html()).not.toContain(PENDING_CONTENT);
      expect(wrapper.html()).not.toContain(RESOLVED_CONTENT);
      expect(wrapper.html()).not.toContain(REJECTED_CONTENT);
    });
  });
});
