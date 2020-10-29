import { css } from '@emotion/core';
import tw from 'twin.macro';

let TasksPage: React.FC<any> = () => {
  return (
    <div
      css={css`
        ${tw`p-2`}
      `}
    >
      Tasks
    </div>
  );
};

export default TasksPage;
