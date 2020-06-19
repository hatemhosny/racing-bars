(() => {
  globalThis.data = {
    population: loadData('/data/population.json'),
    covid19: loadData('/data/covid-19.json'),
  };

  async function loadData(url) {
    const resp = await fetch(url);
    return resp.json();
  }
})();
