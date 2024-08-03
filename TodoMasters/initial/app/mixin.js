const observerMixin = {
  observers: {},

  addObserver(event, observer) {
    this.observers[event] = this.observers[event]
      ? [...this.observers[event], observer]
      : [observer];
  },
  
  removeObserver(event, obs) {
    this.observers[event].splice(
      this.observers[event].findIndex((observer) => observer === obs),
      1
    );
  },

  notify(event) {
    this.observers[event].forEach((obs) => obs());
  },
};

export default observerMixin;
