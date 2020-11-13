describe("makeBoard", function () {
  it('should create a matrix based on HEIGHT/WIDTH input', function () {
    expect(makeBoard().length).toEqual(6);
  });

  // it('should create a matrix based on HEIGHT/WIDTH input', function () {
  //   expect(legalMovePlayerMatch([[1, 1], [0, 2], [0, 3], [0, 4]])).toEqual(false);
  // });

  // it('should check for winner', function () {
  //   expect(legalMovePlayerMatch([[0, 0], [0, 2], [0, 3], [0, 4]])).toEqual(false);
  // });

  // it('should check for winner', function () {
  //   expect(legalMovePlayerMatch([[0, 5], [0, 6], [0, 7], [0, 8]])).toEqual(false);
  // });

});
