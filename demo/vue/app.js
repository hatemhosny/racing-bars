import RacingBars from '../../dist/vue/index.js';

const callback = function (racer, data) {
  // console.log(racer);
  // console.log(data);
  racer.play();
  // setTimeout(racer.pause, 3000);
  setTimeout(() => {
    this.name = 'Hatem';
    this.topN = 5;
  }, 1000);
};

export default {
  name: 'app',
  components: { RacingBars },
  props: ['name', 'topN'],
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
    data-url="../data/population.csv"
    data-type="csv"
    :title="name"
    height="400"
    width="600"
    :autorun="false"
    :callback="this.callback"
    :top-n="topN"
  />`,
};
