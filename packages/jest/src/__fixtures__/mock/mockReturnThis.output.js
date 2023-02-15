import { expect, test, vi } from "vitest";
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

  const startSpy = vi.spyOn(car, 'start').mockReturnThis();
  const driveSpy = vi.spyOn(car, 'drive').mockReturnThis();

  expect(car.start().drive()).toBe(car);
  expect(startSpy).toHaveBeenCalledTimes(1);
  expect(driveSpy).toHaveBeenCalledTimes(1);
})