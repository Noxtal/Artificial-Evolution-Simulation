class Individual {
  constructor(specie) {
    this.id = Util.uuidv4()

    this.specie = specie
  }

  update(world, pop){
    if(Math.random() <= (this.specie.D + this.specie.C * world.getN(this.specie))){
      pop.kill(this)
    }

    if(Math.random() <= this.specie.R) {
      world.add(this.replicate())
    }
    return this
  }

  create(){
    return new Individual(this.specie)
  }

  replicate(){
    let copy = this.create();

    //MUTATION!

    return copy
  }

  equals(ind){
    return this.id === ind.id
  }

  sameSpecie(ind){
    return this.specie.equals(ind.specie)
  }
} 