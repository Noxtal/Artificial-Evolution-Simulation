class Evolution {
  static expectedChange(B, D, R, C, N){
    return B + (R-D-C*N) * N
  }
}