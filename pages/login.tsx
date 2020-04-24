import { useState } from 'react';

interface Props {}

let LoginPage: React.FunctionComponent<Props> = () => {
  let [userData, setUserData] = useState({ username: '', error: '' });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>

        <input
          type="text"
          id="username"
          name="username"
          value={userData.username}
          onChange={(event) => setUserData({ ...userData, username: event.target.value })}
        />

        <button type="submit">Login</button>

        {userData.error && <p className="error">Error: {userData.error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
