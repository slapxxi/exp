import { MessageCircle } from 'react-feather';

interface Props {
  count: number;
  className?: string;
}

export let MessageCount: React.FunctionComponent<Props> = (props) => {
  let { className, count } = props;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <MessageCircle size={18}></MessageCircle>
      <span>{count}</span>
    </div>
  );
};
