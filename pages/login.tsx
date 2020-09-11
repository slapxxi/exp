import Button from '@self/components/Button';
import Input from '@self/components/Input';
import useStore from '@self/lib/store';
import { useCallback, useState } from 'react';

interface Props {}

let LoginPage: React.FunctionComponent<Props> = () => {
  let count = useStore(useCallback((state) => state.bears, []));
  let inc = useStore(useCallback((state) => state.inc, []));
  let [userData, setUserData] = useState({ username: '' });

  function handleSetUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUserData((prev) => ({ username: event.target.value }));
  }

  return (
    <div className="container">
      <p>Bears: {count}</p>
      <button onClick={inc}>Increment</button>
      <h1 className="title">Login</h1>

      <form action="">
        <div className="my-4">
          <label htmlFor="username" className="block mb-4">
            Username
          </label>
          <Input
            id="username"
            type="text"
            value={userData.username}
            placeholder="Enter username"
            onChange={handleSetUsername}
            className="w-full"
          ></Input>
        </div>
        <div className="my-4">
          <label htmlFor="password" className="block mb-4">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            className="w-full"
          ></Input>
        </div>
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
