// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { useEffect, useRef, useState } from 'react';
import { processProps, type Props } from './shared';
import { race, generateId, type Race, type Data, type WideData } from '.';

/**
 * React component for the racing-bars chart.
 *
 * Renders a racing bar chart inside a `<div>` element and exposes the chart's
 * {@link Race} API via the `callback` prop.
 *
 * @param props - Component props extending {@link Props} with optional React children.
 * When props change, the chart options are updated via {@link Race.changeOptions}.
 * @returns A `<div>` containing the racing bar chart.
 *
 * @example
 * ```tsx
 * import RacingBars from 'racing-bars/react';
 * function App() {
 *   return (
 *     <RacingBars
 *       dataUrl="/data/population.csv"
 *       dataType="csv"
 *       title="World Population"
 *     />
 *   );
 * }
 * ```
 *
 * @see https://racing-bars.hatemhosny.dev/documentation/api
 */
export default function RacingBars(props: Props & { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [racer, setRacer] = useState<Race | undefined>(undefined);
  const [className, setClassName] = useState<string>('');
  const [style, setStyle] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!containerRef.current) return;
    if (!racer) {
      containerRef.current.id = props.elementId || generateId();
      const {
        dataPromise,
        options,
        callback,
        className: _className,
        style: _style,
      } = processProps(props, containerRef.current.id);
      setClassName(_className);
      setStyle(_style);
      dataPromise.then((data: Data[] | WideData[]) => {
        race(data, containerRef.current!, options).then((api: Race) => {
          setRacer(api);
          callback(api, data);
        });
      });
    } else {
      // TODO: do not download data
      const { options } = processProps(props, containerRef.current.id);
      racer.changeOptions(options);
    }
  }, [props]);

  useEffect(
    () => () => {
      racer?.destroy();
    },
    [],
  );

  return (
    <div ref={containerRef} className={className} style={style}>
      {props.children || ''}
    </div>
  );
}
