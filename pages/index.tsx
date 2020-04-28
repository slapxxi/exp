import { GetServerSideProps } from 'next';

interface Props {}

let IndexPage: React.FunctionComponent<Props> = (props) => {
  return (
    <div>
      <h1>Index Page</h1>
    </div>
  );
};

export let getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {} };
};

export default IndexPage;
