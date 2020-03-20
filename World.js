class World {
  constructor(defaultN, firstReplicatorSpecie) {
    this.populations = []

    this.populations.push(new Population(defaultN, firstReplicatorSpecie))
  }

  getN(specie){
    if(specie){
      let pop = this.getPopulationBySpecie(specie)
      if(pop) return pop.getN()
      else throw "Specie of id "+ specie.id + " not found!" 
    }
    else{ 
    return this.populations.reduce((t, p) => t+p.getN(), 0)
    }
  }

  add(ind){
    let pop = this.getPopulationBySpecie(ind.specie)
    if(pop){
      pop.add(ind)
    }
    else{
      this.populations.push(new Population(0, ind.specie).add(ind))
    }
    return this
  }

  update(){
    this.populations.forEach(pop => {
      pop.update(this)
      if(Math.random() <= pop.specie.B){
        pop.add(new Individual(pop.specie))
      }
    })
    return this
  }

  getPopulationBySpecie(specie){
    return this.populations.filter(p => p.specie.equals(specie))[0]
  }
}