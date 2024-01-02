<template>
  <div class="wrapper">
    <div style="display: flex; flex-direction: row; justify-content: center; gap: 1rem; margin: 1rem">
      <button @click="progress.start('demo1')">Start 1</button>
      <button @click="progress.finish('demo1')">Finish 1</button>
      <button @click="progress.start('demo2')">Start 2</button>
      <button @click="progress.finish('demo2')">Finish 2</button>
      <button @click="progress.fail()">Fail</button>
    </div>
    <MeetupsHeader />
    <main class="main">
      <UiContainer>
        <RouterView />
      </UiContainer>
    </main>
    <MeetupsFooter />
  </div>
</template>

<script>
import MeetupsHeader from './components/MeetupsHeader.vue';
import MeetupsFooter from './components/MeetupsFooter.vue';
import UiContainer from './components/UiContainer.vue';
import { PROGRESS_KEY } from './plugins/progress/index.js';

export default {
  name: 'App',

  components: {
    MeetupsFooter,
    MeetupsHeader,
    UiContainer,
  },

  inject: {
    progress: PROGRESS_KEY,
  },
};
</script>

<style>
@import '@/assets/styles/_fonts.css';
@import '@/assets/styles/_variables.css';
@import '@/assets/styles/_common.css';

.wrapper {
  background-color: var(--grey-light);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 0 auto;
}
</style>
