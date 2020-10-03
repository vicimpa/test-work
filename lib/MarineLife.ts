export class MarineLife {
  #name = ''
  #canSwim = true
  #canBite = false

  get name() { return this.#name }

  get isCanSwim() { return this.#canSwim }
  get isCanBite() { return this.#canBite }

  constructor(name = '', swim = false, bite = false) {
    this.#name = name
    this.#canSwim = swim
    this.#canBite = bite
  }

  display() {
    return this.name
  }

  bite() {
    if(this.isCanBite)
      return 'Bite'
  }

  swim() {
    if(this.isCanSwim)
      return 'Swim'
  }
}

export class MarineShark extends MarineLife {
  constructor() {
    super('Shark', true, true)
  }
}

export class MarineTurtle extends MarineLife {
  constructor() {
    super('Turtle', true, true)
  }
}

export class MarineJellyfish extends MarineLife {
  constructor() {
    super('Jellyfish', true, false)
  }
}

export class MarineStarfish extends MarineLife {
  constructor() {
    super('Starfish', true, false)
  }
}