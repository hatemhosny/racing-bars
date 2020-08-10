import { race } from '..';
import { generateId, processProps, defaultProps } from '../shared';

const RacingBarsComponent = {
  name: 'racing-bars',
  template: '<div :id="elementId" v-once>{{loadingContent}}</div>',
  props: [...Object.keys(defaultProps)],
  inheritAttrs: false,
  created() {
    this.elementId = this.elementId || generateId();
    this.loadingContent = this.loadingContent ?? 'Loading...';
  },
  mounted() {
    this.$nextTick(() => {
      this.runRace();

      Object.keys(this.$props).forEach((key) => {
        this.$watch(key, (newVal: any) => {
          this.racer.updateOptions({ [key]: newVal });
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
