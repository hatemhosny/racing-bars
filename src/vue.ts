/* eslint-disable no-duplicate-imports */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-extraneous-dependencies */

// '@vue/runtime-core' is used for generating type definitions,
// and is replaced by external dependency 'vue' during build
import type {
  DefineComponent,
  AllowedComponentProps,
  ComponentCustomProps,
  ComponentOptionsMixin,
  ExtractPropTypes,
  RendererElement,
  RendererNode,
  VNode,
  VNodeProps,
} from '@vue/runtime-core';
import { h, onMounted, onUnmounted, ref, watch } from '@vue/runtime-core';

import { processProps, type Props } from './shared';
import { race, generateId, type Race, type Data, type WideData } from '.';

const props = {
  dataShape: String,
  dataTransform: [Function, Object], // Object for null
  fillDateGapsInterval: [String, Object], // Object for null
  fillDateGapsValue: String,
  valueDecimals: Number,
  makeCumulative: String, // Boolean
  title: String,
  subTitle: String,
  dateCounter: [String, Function],
  startDate: String,
  endDate: String,
  loop: String, // Boolean
  caption: String,
  labelsPosition: String,
  labelsWidth: Number,
  showIcons: String, // Boolean
  colorSeed: [String, Number],
  showGroups: String, // Boolean
  tickDuration: Number,
  topN: Number,
  inputHeight: String,
  inputWidth: String,
  minHeight: Number,
  minWidth: Number,
  height: String,
  width: String,
  marginTop: Number,
  marginRight: Number,
  marginBottom: Number,
  marginLeft: Number,
  mouseControls: String, // Boolean
  keyboardControls: String, // Boolean
  controlButtons: String,
  overlays: String,
  autorun: String, // Boolean
  injectStyles: String, // Boolean
  theme: String,
  colorMap: [Object, Array],
  fixedScale: String, // Boolean
  fixedOrder: Array,
  highlightBars: String, // Boolean
  selectBars: String, // Boolean
  data: Array,
  dataUrl: String,
  dataType: String,
  elementId: String,
  className: String,
  style: Object,
  callback: Function,
} satisfies { [key in keyof Required<Omit<Props, 'selector'>>]: any };

const fixProps = (props: any) => {
  const newProps: Partial<Props> = {};
  Object.keys(props).forEach((key) => {
    if (props[key] !== '' && props[key] !== undefined) {
      (newProps as any)[key] = props[key];
    }
  });
  return newProps;
};

// @ts-ignore
const RacingBars: RacingBarsComponent = {
  props,
  setup(props, { slots }) {
    const containerRef = ref<HTMLElement>();
    let racer: Race | undefined;
    const className = ref('');
    const style = ref({});
    let prevOptions = {};

    onMounted(() => {
      if (!containerRef.value) return;
      containerRef.value.id = props.elementId || generateId();
      const {
        dataPromise,
        options,
        callback,
        style: _style,
        className: _className,
      } = processProps(fixProps(props), containerRef.value.id);
      className.value = _className;
      style.value = _style;
      prevOptions = options;
      dataPromise.then((data: Data[] | WideData[]) => {
        race(data, containerRef.value, options).then((racer) => {
          callback(racer, data);
        });
      });
    });

    watch(props, (newProps) => {
      if (!containerRef.value || !racer) return;
      const { options } = processProps(fixProps(newProps), containerRef.value.id);
      if (JSON.stringify(options) !== JSON.stringify(prevOptions)) {
        racer.changeOptions(options);
      }
      prevOptions = options;
    });

    onUnmounted(() => {
      racer?.destroy();
    });
    return () =>
      h(
        'div',
        {
          ref: containerRef,
          class: className.value,
          style: style.value,
        },
        slots.default?.() || '',
      );
  },
};

export default RacingBars;

// this avoids having to run the vue compiler (thus adding vue as dependency)
// to generate type definitions
type RacingBarsComponent = DefineComponent<
  Props,
  () => VNode<RendererNode, RendererElement, { [key: string]: any }>,
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  VNodeProps & AllowedComponentProps & ComponentCustomProps,
  Readonly<ExtractPropTypes<Props>>,
  {}
>;
