class prng {
  constructor(seed) {
    if (typeof seed !== "number") seed = 1238473661;
    this._seed = seed % 2147483647;
    if (this._seed <= 0) {
      this._seed += 2147483646;
    }
  }
  next(a, b) {
    this._seed = (this._seed * 48271) % 2147483647;
    if (arguments.length === 0) {
      return this._seed / 2147483647;
    } else if (arguments.length === 1) {
      return (this._seed / 2147483647) * a;
    } else {
      return (this._seed / 2147483647) * (b - a) + a;
    }
  }
}

export { prng };
