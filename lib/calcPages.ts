export function calcPages(numberOfRecords: number, pageSize: number = 100) {
  if (pageSize === 0) {
    throw new Error('Page size cannot be equal to zero');
  }

  let result = [];
  let numberOfPages =
    Math.ceil(numberOfRecords / pageSize) === 0 ? 1 : Math.ceil(numberOfRecords / pageSize);

  for (let index = 1; index <= numberOfPages; index++) {
    result.push(index);
  }

  return result;
}
