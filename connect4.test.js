describe("makeBoard", function () {
  it('should create a matrix with columns based on WIDTH input', function () {
    expect(makeBoard()[0].length).toEqual(WIDTH);
  });

  it('should create a matrix with rows based on HEIGHT input', function () {
    expect(makeBoard().length).toEqual(HEIGHT);
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
