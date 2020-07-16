import Link from 'next/link';
import React from 'react';

interface Props {}

interface ButtonProps {
  href: string;
  as: string;
  active?: boolean;
}

interface FirstProps {
  href: string;
  as: string;
}

interface LastProps {
  href: string;
  as: string;
}

interface DotsProps {}

interface Composite extends React.FC<Props> {
  First?: React.FC<FirstProps>;
  Button?: React.FC<ButtonProps>;
  Last?: React.FC<LastProps>;
  Dots?: React.FC<DotsProps>;
}

let Pagination: Composite = (props) => {
  let { children } = props;
  return <ul className="flex cursor-pointer">{children}</ul>;
};

Pagination.First = (props) => {
  let { href, as, children } = props;

  return (
    <li className={`pagination-btn hover:bg-blue-100`}>
      <Link href={href} as={as}>
        <a className="inline-flex justify-center items-center p-4 w-2 h-2">{children}</a>
      </Link>
    </li>
  );
};

Pagination.Last = (props) => {
  let { href, as, children } = props;

  return (
    <li className={`pagination-btn hover:bg-blue-100`}>
      <Link href={href} as={as}>
        <a className="inline-flex justify-center items-center p-4 w-2 h-2">{children}</a>
      </Link>
    </li>
  );
};

Pagination.Button = (props) => {
  let { active, href, as, children } = props;

  return (
    <li className={`pagination-btn hover:bg-blue-100 ${active && 'bg-blue-200'}`}>
      <Link href={href} as={as}>
        <a className="inline-flex justify-center items-center p-4 h-2">{children}</a>
      </Link>
    </li>
  );
};

Pagination.Dots = (props) => {
  let { children } = props;

  return (
    <li className={`pagination-btn`}>
      <div className="inline-flex justify-center items-center p-4 w-2 h-2">...</div>
    </li>
  );
};

export default Pagination;
