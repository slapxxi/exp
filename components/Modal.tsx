import React, { MutableRefObject } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  visible?: boolean;
  innerRef: MutableRefObject<any>;
  children?: (s: DOMRect) => React.ReactNode;
}

let Overlay: React.FunctionComponent<Props> = (props) => {
  let { visible = false, innerRef, children } = props;

  if (visible && typeof document !== 'undefined') {
    let { current: target } = innerRef;
    let boundingBox = target?.getBoundingClientRect() ?? {
      top: -9999,
      left: -9999,
      bottom: 'auto',
      right: 'auto',
    };
    return ReactDOM.createPortal(children(boundingBox), document.body);
  }

  return null;
};

export default Overlay;
