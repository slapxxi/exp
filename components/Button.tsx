import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

let Button: React.FunctionComponent<Props> = (props) => {
  let { children, className, ...rest } = props;
  return (
    <button
      className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-600 ${className}`}
      {...rest}
    >
      Submit
    </button>
  );
};

export default Button;
