// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useRef, useState } from 'react';
import { race, generateId, type Race, type Data, type WideData } from '.';
import { processProps, type Props } from './shared';

export default function RacingBars(props: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [racer, setRacer] = useState<Race | undefined>(undefined);
  const [className, setClassName] = useState<string>('');

  useEffect(() => {
    if (!containerRef.current) return;
    if (!racer) {
      containerRef.current.id = props.elementId || generateId();
      const {
        dataPromise,
        options,
        callback,
        className: _className,
      } = processProps(props, containerRef.current.id);
      setClassName(_className);
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

    return () => {
      racer?.destroy();
    };
  }, [props]);

  return <div ref={containerRef} className={className}></div>;
}
