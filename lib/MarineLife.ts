export class MarineLife {
  #name = ''
  #canSwim = true
  #canBite = false

  get className() { return 'MarineLife' }

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
    if (this.isCanBite)
      return 'Bite'
  }

  swim() {
    if (this.isCanSwim)
      return 'Swim'
  }

  static allClasses: Array<typeof MarineLife> = []
}

export class MarineShark extends MarineLife {
  get className() { return 'MarineShark' }

  constructor() {
    super('Shark', true, true)
  }
}

export class MarineTurtle extends MarineLife {
  get className() { return 'MarineTurtle' }

  constructor() {
    super('Turtle', true, true)
  }
}

export class MarineJellyfish extends MarineLife {
  get className() { return 'MarineJellyfish' }

  constructor() {
    super('Jellyfish', true, false)
  }
}

export class MarineStarfish extends MarineLife {
  get className() { return 'MarineStarfish' }

  constructor() {
    super('Starfish', true, false)
  }
}

MarineLife.allClasses.push(
  MarineShark,
  MarineTurtle,
  MarineJellyfish,
  MarineStarfish
)