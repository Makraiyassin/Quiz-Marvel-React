import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import reportWebVitals from './reportWebVitals';

import Firebase, {FirebaseContext} from './components/firebase'

ReactDOM.render(
  <FirebaseContext.Provider value = {new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
reportWebVitals();
