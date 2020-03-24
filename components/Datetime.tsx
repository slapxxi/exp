import styles from '@self/styles/datetime.module.scss';
import { format } from 'date-fns';

interface Props {
  date: string | Date;
}

let Datetime: React.FunctionComponent<Props> = (props) => {
  let { date } = props;

  return (
    <time dateTime={date as string} className={styles.time}>
      {format(new Date(date), 'dd MMMM yyyy')}
    </time>
  );
};

export default Datetime;
