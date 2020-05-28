import * as React from 'react';
import * as ReactDOM from 'react-dom';

import fetch from '../lib/api/renderer';

import '../assets/style.scss';

fetch('writeFile', { content: 'Hello' })
  .then((res) => {
    console.log(res);
  })
  .catch((e) => console.log(e));

const App: React.FC = () => {
  return (
    <div className="app">
      <h4>Welcome to React, Electron and Typescript</h4>
      <p>Hello:::</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
