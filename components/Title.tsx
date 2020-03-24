import styles from '@self/styles/title.module.scss';

interface Props {
  level: number;
  className?: string;
}

let Title: React.FunctionComponent<Props> = (props) => {
  let { level, children, className } = props;
  let Elem: any = `h${level}`;

  return <Elem className={[styles.title, className].join(' ')}>{children}</Elem>;
};

export default Title;
