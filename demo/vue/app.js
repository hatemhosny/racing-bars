import RacingBars from '../../dist/vue/racing-bars.esm.js';

export default {
  name: 'app',
  components: { RacingBars },
  template: `
  <racing-bars
    element-id="hi-vue"
    data-url="../data/population.csv"
    data-type="csv"
    title="Hello from vue!"
    height="600"
    width="600"
    v-bind:autorun="false"
  />`,
};
