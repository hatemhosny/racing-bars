import { loadData, race } from '../src/index';

    const options = {
      // dataShape: "wide",
      // fillDateGaps: "months",
      // fillDateGapsValue: "zero",
      title: "A Tale of 11 Years",
      subTitle: "Top 10 Surgical Procedures",
      dateCounterFormat: "MM/YYYY",
      caption: "Aswan Heart Centre",
      // startDate: "2009-1-1",
      // endDate: "2010-12-31",
      // loop: true,
      // tickDuration: 500,
      // top_n: 10,
      // height: "window*0.85",
      // width: "window*0.9",
      // disableClickEvents: true,
      // disableKeyboardEvents: true,
      // showControls: "play",
      autorun: false,
      // colorSeed: "asdfs",
      // labelsOnBars: false,
      // labelsWidth: 250,
    };
    loadData("data/procedures.json").then((data) => {
      race(data, options);
    });

