export class Counter {
  #data: {[key: string]: number} = {}

  add(key = 'd') {
    this.reset(key)
    return this.#data[key]++
  }

  get(key = 'd') {
    let d = this.#data[key] || 0
    return d
  }

  set(key = 'd', val = 0) {
    return this.#data[key] = val
  }

  reset(key = 'd') {
    return this.set(key, this.get(key))
  }
}