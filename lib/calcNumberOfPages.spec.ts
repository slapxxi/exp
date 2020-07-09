import { calcPages } from './calcPages';

it('calculates pages based on a number of records', () => {
  expect(calcPages(230)).toEqual([1, 2, 3]);
  expect(calcPages(2)).toEqual([1]);
  expect(calcPages(400)).toEqual([1, 2, 3, 4]);
  expect(calcPages(0)).toEqual([1]);
});

it('calculates pages based on a number of records and page size', () => {
  expect(calcPages(17, 5)).toEqual([1, 2, 3, 4]);
  expect(calcPages(3, 1)).toEqual([1, 2, 3]);
  expect(calcPages(3, 2)).toEqual([1, 2]);
});

it('throws when page size is zero', () => {
  expect(() => calcPages(10, 0)).toThrow('Page size cannot be equal to zero');
});
