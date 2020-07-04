import { race } from '..';
import { generateId, getDataPromiseAndOptions, Props } from '../shared';

export const RacingBarsComponent = {
  name: 'racing-bars',
  inheritAttrs: false,
  created() {
    this.elementId = this.$attrs['element-id'] || generateId();
  },
  render(createElement: any) {
    return createElement('div', { domProps: { id: this.elementId } });
  },
  mounted() {
    this.$nextTick(() => {
      this.runRace();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.runRace();
    });
  },
  destroyed() {
    this.cleanUp();
  },
  methods: {
    async runRace() {
      function toCamelCase(attrs: any) {
        const camelize = (s: string) => s.replace(/-./g, (x) => x.toUpperCase()[1]);
        return Object.assign(
          {},
          ...Object.keys(attrs).map((key) => ({ [camelize(key)]: attrs[key] })),
        );
      }

      this.cleanUp();
      const attrs: Props = toCamelCase(this.$attrs);
      const { dataPromise, options } = getDataPromiseAndOptions(attrs, this.elementId);
      const data = await dataPromise;
      this.racer = race(data, options);
    },
    cleanUp() {
      if (this.racer) {
        this.racer.destroy();
      }
    },
  },
};
