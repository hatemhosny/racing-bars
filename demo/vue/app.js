import { RacingBarsComponent as RacingBars, racingBars } from '../../dist/vue/racing-bars.esm.js';

export default {
  name: 'app',
  components: { RacingBars },
  methods: {
    getData() {
      return racingBars.loadData('../data/procedures.json');
    },
  },
  template: `
  <racing-bars
    data-url="../data/procedures.json"
    title="Hello from vue!"
    height="600"
    width="600"
    v-bind:autorun="false"
  />`,
};
