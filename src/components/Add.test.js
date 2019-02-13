import * as add from './Add'

test('Expect that the random integer is between 1 and 10.', () => {
  expect(add.getRandomInteger()).toBeGreaterThanOrEqual(0)
  expect(add.getRandomInteger()).toBeLessThan(10)
})
