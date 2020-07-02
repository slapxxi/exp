interface Props {
  phone: string;
  className?: string;
}

let PhoneNumber: React.FunctionComponent<Props> = (props) => {
  let { phone, className } = props;
  let { regionCode, serviceProvider, baseNumber } = parsePhoneNumber(phone);
  return (
    <span className={`text-2xl ${className}`}>
      <span className="text-gray-600">{regionCode}</span>{' '}
      <span className="text-gray-600">({serviceProvider})</span> <span>{baseNumber}</span>
    </span>
  );
};

function parsePhoneNumber(phoneNumber: string) {
  let regex = /(8|\+7)?(\d{3})(\d{3})(\d{2})(\d{2})/;

  if (regex.test(phoneNumber)) {
    let parsed = phoneNumber.split(regex).filter(Boolean);
    let serviceProvider = parsed.length === 4 ? parsed[0] : parsed[1];
    let baseNumber = parsed.length === 4 ? parsed.slice(1).join('-') : parsed.slice(2).join('-');
    return {
      regionCode: '+7',
      serviceProvider,
      baseNumber,
    };
  }

  throw new Error('Error parsing phone number');
}
export default PhoneNumber;
