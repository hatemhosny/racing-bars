(() => {
  globalThis.procedures = loadData('/data/procedures.json');

  async function loadData(url) {
    const resp = await fetch(url);
    return resp.json();
  }
})();
