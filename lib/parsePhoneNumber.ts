export function parsePhoneNumber(phoneNumber: string) {
  let regex = /(8|\+?7)?(\d{3})(\d{3})-?(\d{2})-?(\d{2})/;
  let normalized = phoneNumber.replace(/\D/g, '');

  if (regex.test(normalized)) {
    let parsed = normalized.split(regex).filter(Boolean);
    let serviceProvider = parsed.length === 4 ? parsed[0] : parsed[1];
    let baseNumber =
      parsed.length === 4 ? parsed.slice(1).join(' - ') : parsed.slice(2).join(' - ');
    return {
      regionCode: '+7',
      serviceProvider,
      baseNumber,
      normalized:
        normalized.length === 11
          ? normalized.startsWith('7')
            ? normalized.replace(/^7/, '8')
            : normalized
          : `8${normalized}`,
    };
  }

  throw new Error('Error parsing phone number');
}
