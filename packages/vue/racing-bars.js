import { loadData, race } from '../../dist/racing-bars.esm';

export default {
  name: 'racing-bars',
  inheritAttrs: false,
  props: ['dataUrl'],
  template: '<div id="race" class="race"></div>',
  mounted() {
    this.$nextTick(() => {
      const options = this.$attrs;
      loadData(this.dataUrl).then((data) => {
        race(data, options);
      });
    });
  },
};
