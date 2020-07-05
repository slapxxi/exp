import { MessageCount } from '@self/components/MessageCount';
import PhoneNumber from '@self/components/PhoneNumber';
import { ViewCount } from '@self/components/ViewCount';
import connectDb from '@self/lib/connectDb';
import { parsePhoneNumber } from '@self/lib/parsePhoneNumber';
import { PhoneData, PhoneType } from '@self/lib/types';
import { useMachine } from '@xstate/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { assign, Machine } from 'xstate';

interface Props {
  data?: PhoneData;
  isValidPhoneNumber: boolean;
}

interface Context {
  phoneNumber: string;
  formData: { phoneType: '' | PhoneType; content: string; name: string };
  response: any;
}

interface Schema {
  states: {
    idle: {};
    fetching: {};
    formError: {};
    fetchError: {};
  };
}

type Actions =
  | { type: 'done.invoke.uploadComment'; data: any }
  | { type: 'CHANGE_NAME'; payload: string }
  | { type: 'CHANGE_COMMENT'; payload: string }
  | { type: 'CHANGE_TYPE'; payload: PhoneType }
  | { type: 'SUBMIT' };

let pageMachine = Machine<Context, Actions>(
  {
    initial: 'idle',
    context: {
      response: null,
      phoneNumber: null,
      formData: {
        phoneType: '',
        content: '',
        name: '',
      },
    },
    id: 'pageMachine',
    states: {
      idle: {
        on: {
          CHANGE_NAME: { actions: 'changeName' },
          CHANGE_COMMENT: { actions: 'changeComment' },
          CHANGE_TYPE: { actions: 'changeType' },
          SUBMIT: [{ target: 'fetching', cond: 'isValidFormData' }, { target: 'formError' }],
        },
      },
      fetching: {
        invoke: {
          src: 'uploadComment',
          onError: { target: 'fetchError', actions: 'setError' },
          onDone: { target: 'finished', actions: 'setResponse' },
        },
      },
      formError: {
        on: {
          CHANGE_NAME: { actions: 'changeName' },
          CHANGE_TYPE: { actions: 'changeType' },
          SUBMIT: { target: 'fetching', cond: 'isValidFormData' },
        },
      },
      fetchError: {},
      finished: {},
    },
  },
  {
    services: {
      uploadComment: (context, event) => {
        return fetch('/api/uploadComment', {
          method: 'post',
          body: JSON.stringify({
            author: context.formData.name,
            content: context.formData.content,
            phoneNumber: context.phoneNumber,
            phoneType: context.formData.phoneType,
          }),
        }).then((r) => r.json());
      },
    },
    actions: {
      changeName: assign((context, event) => {
        if (event.type === 'CHANGE_NAME') {
          return { ...context, formData: { ...context.formData, name: event.payload } };
        }
      }),
      changeComment: assign((context, event) => {
        if (event.type === 'CHANGE_COMMENT') {
          return { ...context, formData: { ...context.formData, content: event.payload } };
        }
      }),
      changeType: assign((context, event) => {
        if (event.type === 'CHANGE_TYPE') {
          return { ...context, formData: { ...context.formData, phoneType: event.payload } };
        }
      }),
      setResponse: assign((context, event) => {
        if (event.type === 'done.invoke.uploadComment') {
          return { response: event.data };
        }
      }),
    },
    guards: {
      isValidFormData: (context) => {
        return context.formData.phoneType !== '';
      },
    },
  },
);

let PhonePage: React.FunctionComponent<Props> = (props) => {
  let { data, isValidPhoneNumber } = props;
  let [state, send] = useMachine(pageMachine, {
    context: { phoneNumber: data?.phoneNumber },
  });

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    send({ type: 'CHANGE_NAME', payload: event.target.value });
  }

  function handleChangeType(event: React.ChangeEvent<HTMLSelectElement>) {
    send({ type: 'CHANGE_TYPE', payload: event.target.value as PhoneType });
  }

  function handleChangeComment(event: React.ChangeEvent<HTMLTextAreaElement>) {
    send({ type: 'CHANGE_COMMENT', payload: event.target.value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send('SUBMIT');
  }

  if (!isValidPhoneNumber) {
    return (
      <div>
        <div className="container p-4 bg-red-200 rounded border border-red-400 text-red-900 my-4">
          Phone number is not valid! Redirecting back...
        </div>
      </div>
    );
  }

  return (
    <div>
      {data && (
        <header className="p-6 text-center">
          <PhoneNumber phone={data.phoneNumber} className="block mb-2"></PhoneNumber>
          <div className="flex justify-center space-x-4 text-sm text-gray-600">
            <ViewCount count={34}></ViewCount>
            <MessageCount count={data.comments.length}></MessageCount>
            <div>
              Belongs to <strong>Megafon</strong>
            </div>
          </div>
        </header>
      )}

      <div className="max-w-2xl mx-auto my-6 p-4">
        <h1 className="container font-bold text-lg mb-4">Top Comments</h1>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <li className="flex items-center shadow rounded p-4 space-x-4">
            <img src="" alt="" className="rounded-full w-8 h-8 bg-gray-300" />
            <span>Great Stuff</span>
          </li>
          <li className="flex items-center shadow rounded p-4 space-x-4">
            <img src="" alt="" className="rounded-full w-8 h-8 bg-gray-300" />
            <span>Mediocre</span>
          </li>
          <li className="flex items-center shadow rounded p-4 space-x-4">
            <img src="" alt="" className="rounded-full w-8 h-8 bg-gray-300" />
            <span>Scam</span>
          </li>
          <li className="flex items-center shadow rounded p-4 space-x-4">
            <div>
              <img src="" alt="" className="rounded-full w-8 h-8 bg-gray-300" />
            </div>
            <span>Decent human beings asking for moneyz</span>
          </li>
          <li className="flex items-center shadow rounded p-4 space-x-4">
            <div>
              <img src="" alt="" className="rounded-full w-8 h-8 bg-gray-300" />
            </div>
            <span>Trash peeps</span>
          </li>
        </ul>
      </div>

      {data && (
        <div className="max-w-xl mx-auto my-6 p-4 md:p-0">
          <h1 className="container font-bold text-lg mb-4">Comments</h1>

          <ul>
            {data.comments.map((comment) => (
              <li className="flex flex-col shadow rounded p-4 space-y-2 mb-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <img src="" alt="" className="rounded-full w-8 h-8 bg-gray-300" />
                  </div>
                  <span>{comment.content}</span>
                </div>
                <footer className="flex justify-between space-x-4 text-gray-600">
                  <small>{comment.author}</small>
                  <small>
                    Marked as <strong>{comment.phoneType}</strong>
                  </small>
                </footer>
              </li>
            ))}
          </ul>
        </div>
      )}

      {state.matches('formError') && (
        <div className="container p-4 bg-red-200 rounded border border-red-400 text-red-900 my-4">
          Error
        </div>
      )}

      {!state.matches('finished') && (
        <>
          <div className="container">
            <h1 className="font-bold text-lg">Leave Comment</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="my-4 md:flex justify-between flex-wrap max-w-xl m-auto"
          >
            <div className="md:flex md:w-5/12 items-center mb-4 md:space-x-4">
              <label htmlFor="name" className="block mb-2 md:mb-0">
                Name
              </label>
              <input
                disabled={state.matches('fetching')}
                id="name"
                type="text"
                placeholder="Name"
                value={state.context.formData.name}
                className="p-2 rounded border w-full disabled:bg-gray-900"
                onChange={handleChangeName}
              />
            </div>

            <div className="md:flex md:w-5/12 items-center mb-4 md:space-x-4">
              <label htmlFor="phoneNumberType" className="block mb-2 md:mb-0">
                Type
              </label>
              <select
                disabled={state.matches('fetching')}
                name="phoneNumberType"
                id="phoneNumberType"
                value={state.context.formData.phoneType}
                onChange={handleChangeType}
                className="rounded border bg-white p-2 w-full flex-1"
              >
                <option disabled value="">
                  Choose...
                </option>
                <option value="scam">Scam</option>
                <option value="quiz">Quiz</option>
                <option value="ads">Advertisement</option>
              </select>
            </div>

            <div className="mb-4 w-full">
              <label htmlFor="comment" className="block mb-2">
                Comment
              </label>
              <textarea
                disabled={state.matches('fetching')}
                name="comment"
                id="comment"
                cols={30}
                rows={10}
                placeholder="Your Comment"
                className="p-2 rounded border w-full"
                value={state.context.formData.content}
                onChange={handleChangeComment}
              ></textarea>
            </div>
            <button
              disabled={state.matches('fetching')}
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-600"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export let getStaticPaths: GetStaticPaths = async () => {
  let db = await connectDb();
  let popularPhones = await db
    .collection('phones')
    .find({}, { projection: { _id: 0, phoneNumber: 1 } })
    .limit(100)
    .toArray();
  return {
    paths: popularPhones
      .filter((p) => p.phoneNumber)
      .map((p) => ({ params: { pid: p.phoneNumber } })),
    fallback: true,
  };
};

export let getStaticProps: GetStaticProps = async (context) => {
  let db = await connectDb();
  let phoneNumber = context.params.pid as string;
  let parsedPhoneNumber: ReturnType<typeof parsePhoneNumber>;
  let isValidPhoneNumber: boolean;

  try {
    parsedPhoneNumber = parsePhoneNumber(phoneNumber);
    isValidPhoneNumber = true;
  } catch {
    isValidPhoneNumber = false;
  }

  if (isValidPhoneNumber) {
    let data = await db
      .collection('phones')
      .findOne({ phoneNumber: parsedPhoneNumber.normalized }, { projection: { _id: 0 } });
    return { props: { data, key: phoneNumber, isValidPhoneNumber }, unstable_revalidate: 1 };
  }

  return {
    props: { key: phoneNumber, isValidPhoneNumber },
    unstable_revalidate: 1,
  };
};

export default PhonePage;
