import Overlay from '@self/components/Modal';
import { DetailedHTMLProps, InputHTMLAttributes, useRef, useState } from 'react';
import { AlertCircle } from 'react-feather';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  errors?: string[];
}

let Input: React.FunctionComponent<Props> = (props) => {
  let iconRef = useRef(null);
  let [isVisible, setIsVisible] = useState(false);
  let { errors, className, ...rest } = props;
  let errorClassName = errors ? 'border-red-500 focus:border-red-700 outline-none' : '';

  function handlePointerEnter() {
    setIsVisible(true);
  }

  function handlePointerLeave() {
    setIsVisible(false);
  }

  return (
    <div className="relative">
      <input
        className={`p-2 rounded border disabled:bg-gray-900 ${errorClassName} ${className}`}
        {...rest}
      />

      {errors && (
        <Overlay innerRef={iconRef} visible={isVisible}>
          {(box) => (
            <div
              className="absolute border-b border bg-white shadow-lg rounded p-2 text-gray-800"
              style={{
                top: box.bottom + 5,
                right: document.body.getBoundingClientRect().width - box.right,
              }}
            >
              {errors.length >= 2 ? (
                <ul className="list-inside list-disc">
                  {errors.map((err) => (
                    <li className="p-1"> {err}</li>
                  ))}
                </ul>
              ) : (
                errors[0]
              )}
            </div>
          )}
        </Overlay>
      )}

      {errors && (
        <AlertCircle
          // @ts-ignore
          ref={iconRef}
          className="text-red-500 absolute bg-white rounded-full"
          style={{ top: 'calc(50% - 10px)', right: 10 }}
          size={20}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        ></AlertCircle>
      )}
    </div>
  );
};

export default Input;
