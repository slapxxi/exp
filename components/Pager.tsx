import Pagination from '@self/components/Pagination';

interface Props {
  pages: number[];
  currentPage: number;
}

let Pager: React.FunctionComponent<Props> = (props) => {
  let { pages, currentPage } = props;

  return (
    pages.length > 1 &&
    (pages.length > 10 ? (
      <Pagination>
        {pages.slice(0, 7).map((p) => (
          <Pagination.Button
            key={p}
            active={p === currentPage}
            href="/browse/[pageNumber]"
            as={`/browse/${p}`}
          >
            {p}
          </Pagination.Button>
        ))}
        <Pagination.Dots />
        {pages.slice(-3).map((p) => (
          <Pagination.Button
            key={p}
            active={p === currentPage}
            href="/browse/[pageNumber]"
            as={`/browse/${p}`}
          >
            {p}
          </Pagination.Button>
        ))}
      </Pagination>
    ) : (
      <Pagination>
        {pages.map((p) => (
          <Pagination.Button
            key={p}
            active={p === currentPage}
            href="/browse/[pageNumber]"
            as={`/browse/${p}`}
          >
            {p}
          </Pagination.Button>
        ))}
      </Pagination>
    ))
  );
};

export default Pager;
