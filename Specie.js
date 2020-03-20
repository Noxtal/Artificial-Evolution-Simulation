class Specie{
    constructor(B, D, R, C) {
        this.id = Util.uuidv4()

        this.B = B || 0
        this.D = D || 0
        this.R = R || 0
        this.C = C || 0
    }

    equals(spe){
        return this.id === spe.id
    }

}