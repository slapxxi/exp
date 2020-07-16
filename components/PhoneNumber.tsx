import { parsePhoneNumber } from '@self/lib/parsePhoneNumber';

interface Props {
  phone: string;
  className?: string;
}

let PhoneNumber: React.FunctionComponent<Props> = (props) => {
  let { phone, className } = props;
  let { regionCode, serviceProvider, baseNumber } = parsePhoneNumber(phone);
  return (
    <span className={`text-2xl ${className}`} data-testid="phone">
      <span className="text-gray-600">{regionCode}</span>{' '}
      <span className="text-gray-600">({serviceProvider})</span> <span>{baseNumber}</span>
    </span>
  );
};

export default PhoneNumber;
