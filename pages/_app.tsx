/** @jsx jsx */
import { jsx } from '@emotion/core';
import { AppType } from 'next/dist/next-server/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LogIn } from 'react-feather';
import { RecoilRoot } from 'recoil';
import '../styles/index.css';

let App: AppType = (props) => {
  let router = useRouter();
  let [phoneNumber, setPhoneNumber] = useState('');
  let { Component, pageProps } = props;

  function handleSubmit(event: any) {
    event.preventDefault();
    router.push(`/phones/[pid]`, `/phones/${phoneNumber}`);
    setPhoneNumber('');
  }

  function handleChangePhoneNumber(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    setPhoneNumber(value);
  }

  return (
    <div>
      <header className="flex items-center space-x-4 p-4">
        <h1 className="mr-auto">
          <Link href="/">
            <a className="text-2xl text-gray-800">Exp</a>
          </Link>
        </h1>
        <nav className="pt-1">
          <ul className="flex space-x-4">
            <li>
              <Link href="/browse/[pageNumber]" as={`/browse/1`}>
                <a className="text-gray-600 hover:text-gray-900">Browse</a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a className="text-gray-600 hover:text-gray-900">
                  <LogIn className="inline"></LogIn>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <form className="p-4 md:p-12 bg-gray-100" onSubmit={handleSubmit}>
        <div className="md:flex md:space-x-4 items-center justify-center md:max-w-2xl mx-auto">
          <label
            htmlFor="search"
            className="block mb-2 md:mb-0 text-xl text-gray-700 hover:text-gray-800 cursor-pointer"
          >
            Search
          </label>
          <input
            id="search"
            type="search"
            placeholder="Ex. 499928392"
            value={phoneNumber}
            className="block w-full mb-4 md:mb-0 placeholder-gray-500 bg-white rounded shadow p-2 text-gray-700 focus:text-gray-900"
            onChange={handleChangePhoneNumber}
          />
          <button
            id="submit"
            type="submit"
            className="block w-full flex-1 bg-blue-700 rounded text-white px-4 py-2 hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </form>

      <RecoilRoot>
        <Component {...pageProps}></Component>
      </RecoilRoot>

      <div id="modal"></div>
    </div>
  );
};

export default App;
