import { race, generateId } from '..';
import { processProps, defaultProps } from '../shared';

const RacingBarsComponent = {
  name: 'racing-bars',
  template: '<div :id="elementId" v-once><slot /></div>',
  props: [...Object.keys(defaultProps)],
  inheritAttrs: false,
  created() {
    this.elementId = this.elementId || generateId();
  },
  mounted() {
    this.$nextTick(() => {
      this.runRace();
      Object.keys(this.$props).forEach((key) => {
        this.$watch(key, (newVal: any) => {
          this.racer.changeOptions({ [key]: newVal });
        });
      });
    });
  },
  destroyed() {
    this.cleanUp();
  },
  methods: {
    async runRace() {
      this.cleanUp();
      const { dataPromise, options, callback } = processProps(this.$props, this.elementId);
      const data = await dataPromise;
      this.racer = race(data, options);
      callback(this.racer, data);
    },
    cleanUp() {
      if (this.racer) {
        this.racer.destroy();
      }
    },
  },
};

export default RacingBarsComponent;
