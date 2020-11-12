describe("legalMovePlayerMatch", function () {
  it('should check for winner', function () {
    expect(legalMovePlayerMatch([[0, 1], [0, 2], [0, 3], [0, 4]])).toEqual(false);
  });

  it('should check for winner', function () {
    expect(legalMovePlayerMatch([[1, 1], [0, 2], [0, 3], [0, 4]])).toEqual(false);
  });

  it('should check for winner', function () {
    expect(legalMovePlayerMatch([[0, 0], [0, 2], [0, 3], [0, 4]])).toEqual(false);
  });

  it('should check for winner', function () {
    expect(legalMovePlayerMatch([[0, 5], [0, 6], [0, 7], [0, 8]])).toEqual(false);
  });

});
