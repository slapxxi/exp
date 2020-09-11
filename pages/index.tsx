import { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';

interface Props {}

let IndexPage: React.FunctionComponent<Props> = () => {
  let [active, setActive] = useState(false);
  let ref = useRef();
  let ap = useSpring({
    x: active ? 1 : 0,
    config: {
      precision: 0.001,
      friction: 8,
    },
  });

  useEffect(() => {
    function handler() {
      setActive(!active);
    }
    document.body.addEventListener('click', handler);
    return () => document.body.removeEventListener('click', handler);
  });

  return (
    <animated.div
      ref={ref}
      onClick={() => setActive(!active)}
      style={{
        opacity: active ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
        position: 'absolute',
        transformOrigin: 'center',
        transform: ap.x.interpolate(interop),
        userSelect: 'none',
        willChange: 'transform',
      }}
      className="p-8 text-4xl rounded bg-gray-100 shadow-md"
    >
      Greetings
    </animated.div>
  );
};

function interop(v: number) {
  return `translateX(${v * 300}px) rotate(${45 * Math.sin(v * Math.PI)}deg) translateY(calc(${
    50 * v
  }vh - ${v * 50}px))`;
}

export default IndexPage;
