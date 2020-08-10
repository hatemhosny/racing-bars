import RacingBars from '../../dist/vue/index.js';

const callback = function (racer, data) {
  // console.log(racer);
  // console.log(data);
  racer.play();
  // setTimeout(racer.pause, 3000);
  setTimeout(() => {
    this.name = 'Hatem';
  }, 1000);
};

export default {
  name: 'app',
  components: { RacingBars },
  props: ['name'],
  created() {
    // this.name = 'Bob';
  },
  updated() {
    console.log('app updated');
  },
  methods: { callback },
  template: `
  <racing-bars
    element-id="hi-vue"
    loading-content="Loading (from vue!)..."
    data-url="../data/population.csv"
    data-type="csv"
    :title="name"
    height="600"
    width="600"
    :autorun="false"
    :callback="this.callback"
  />`,
};
