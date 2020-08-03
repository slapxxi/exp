import dynamic from 'next/dynamic';

let DynamicComponent = dynamic(() => import('@self/components/ThreeFiber'), { ssr: false });

interface Props {}

let Perf: React.FunctionComponent<Props> = () => {
  return <DynamicComponent></DynamicComponent>;
};
export default Perf;
