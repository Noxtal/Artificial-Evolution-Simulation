class Population {
  constructor(defaultN, specie) {
    this.id = Util.uuidv4();

    this.specie = specie;

    this.individuals = Array(defaultN).fill().map(() => new Individual(specie));
  }

  getN() {
    return this.individuals.length;
  }

  add(ind) {
    this.individuals.push(ind);
    return this
  }

  kill(ind){
    this.individuals = this.individuals.filter(v => !v.equals(ind))
    return this
  }

  update(world) {
    this.individuals.forEach(ind => ind.update(world, this));
    return this
  }

  equals(ind) {
    return this.id === ind.id;
  }
}
