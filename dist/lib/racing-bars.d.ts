import { Data } from './models/data.model';
import { Options } from './models/options.model';
export declare function race(data: Data[], options?: Options): {
    start: () => void;
    stop: () => void;
    rewind: () => void;
    fastforward: () => void;
    loop: () => void;
    inc: (value?: number) => void;
    dec: (value?: number) => void;
    getCurrentDate: () => string;
    getDates: () => any[];
    setDate: (inputDate: string | Date) => void;
    createScroller: () => void;
};
export declare function loadData(URL: string, type?: string): Promise<any>;
