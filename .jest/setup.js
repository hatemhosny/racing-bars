// @ts-ignore
class Worker {
  constructor(stringUrl) {
    this.url = stringUrl;
    this.onmessage = () => {};
  }

  postMessage(msg) {
    // @ts-ignore
    this.onmessage(msg);
  }
}

window.Worker = Worker;
