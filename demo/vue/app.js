import RacingBars from '../../dist/vue/index.js';

const callback = (racer, data) => {
  console.log(racer);
  console.log(data);
  racer.play();
  setTimeout(racer.pause, 3000);
};

export default {
  name: 'app',
  components: { RacingBars },
  methods: { callback },
  template: `
  <racing-bars
    element-id="hi-vue"
    loading-content="Loading (from vue!)..."
    data-url="../data/population.csv"
    data-type="csv"
    title="Hello from vue!"
    height="600"
    width="600"
    v-bind:autorun="false"
    v-bind:callback="this.callback"
  />`,
};
