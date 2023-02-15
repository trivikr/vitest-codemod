class Car {
  constructor(model) {
    this.model = model;
  }
  
  start() {
    return this;
  }
  
  drive() {
    return this;
  }
}

test("mockReturnThis", () => {
  const car = new Car("Honda");

  const startSpy = jest.spyOn(car, 'start').mockReturnThis();
  const driveSpy = jest.spyOn(car, 'drive').mockReturnThis();

  expect(car.start().drive()).toBe(car);
  expect(startSpy).toHaveBeenCalledTimes(1);
  expect(driveSpy).toHaveBeenCalledTimes(1);
})