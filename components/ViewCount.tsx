import { Eye } from 'react-feather';

interface Props {
  count: number;
  className?: string;
}

export let ViewCount: React.FunctionComponent<Props> = (props) => {
  let { className, count } = props;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Eye size={18}></Eye>
      <span>{count}</span>
    </div>
  );
};
