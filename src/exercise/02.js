// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react';

function useLocalStorageState(key, defaultValue = '') {
  const [state, setState] = React.useState(() => getInitialName());

  function getInitialName(initialName) {
    initialName = window.localStorage.getItem('key') ?? defaultValue;
    return initialName;
  }


  React.useEffect(() => {
    window.localStorage.setItem('key', state);
  }, [key, state]);

  return [state, setState];
};

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState(initialName);
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  // initialName = window.localStorage.getItem('name') ?? initialName;
  // const [name, setName] = React.useState(initialName);


  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  function handleChange(event) {
    setName(event.target.value)
  };


  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
};

function App() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(previousCount => previousCount + 1);

  return (
    <>
      <button onClick={increment}>{count}</button>
      <Greeting />
    </>
  );
}

export default App;
