import { parsePhoneNumber } from './parsePhoneNumber';

it('parses a valid number', () => {
  let n = '89313518669';
  let parsed = parsePhoneNumber(n);
  expect(parsed).toEqual({
    regionCode: '+7',
    serviceProvider: '931',
    baseNumber: '351 - 86 - 69',
    normalized: '89313518669',
  });
});

it('parses a valid number with punctuation', () => {
  let n = '8 (931) 351 86 69';
  let parsed = parsePhoneNumber(n);
  expect(parsed).toEqual({
    regionCode: '+7',
    serviceProvider: '931',
    baseNumber: '351 - 86 - 69',
    normalized: '89313518669',
  });
});

it('parses a valid number with a leading plus ', () => {
  let n = '+7 (931) 351 86 69';
  let parsed = parsePhoneNumber(n);
  expect(parsed).toEqual({
    regionCode: '+7',
    serviceProvider: '931',
    baseNumber: '351 - 86 - 69',
    normalized: '89313518669',
  });
});

it('parses a valid number without code region', () => {
  let n = '9313518669';
  let parsed = parsePhoneNumber(n);
  expect(parsed).toEqual({
    regionCode: '+7',
    serviceProvider: '931',
    baseNumber: '351 - 86 - 69',
    normalized: '89313518669',
  });
});

it('throws on invalid number provided', () => {
  let n = '351 86 69';
  expect(() => parsePhoneNumber(n)).toThrow('Error parsing phone number');
});
