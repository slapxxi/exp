import Link from 'next/link';
import React from 'react';

interface Props {}

interface ButtonProps {
  href: string;
  as: string;
  active?: boolean;
}

interface Composite extends React.FC<Props> {
  First?: React.FC<{}>;
  Button?: React.FC<ButtonProps>;
  Last?: React.FC<{}>;
}

let Pagination: Composite = (props) => {
  let { children } = props;
  return <ul className="flex cursor-pointer">{children}</ul>;
};

Pagination.First = (props) => {
  let { children } = props;
  return <li className="pagination-btn rounded-bl rounded-tl">{children}</li>;
};

Pagination.Button = (props) => {
  let { active, href, as, children } = props;
  return (
    <li className={`pagination-btn hover:bg-blue-100 ${active && 'bg-blue-200'}`}>
      <Link href={href} as={as}>
        <a className="inline-flex justify-center items-center p-4 w-2 h-2">{children}</a>
      </Link>
    </li>
  );
};

Pagination.Last = (props) => {
  let { children } = props;
  return <li className="pagination-btn border-r rounded-br rounded-tr">{children}</li>;
};

export default Pagination;
