// // Needed for redux-saga es6 generator support
// import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {
//   setLanguages,
//   addTranslation,
// } from 'react-localize-redux';

import './index.css';
// import translationsJson from './translations/en.json';
import App from './App';
import LoginContainer from './containers/LoginPage';
import ResetPasswordPage from './containers/ResetPasswordPage';
import SetPasswordPage from './containers/SetPasswordPage';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
// Import Language Provider
// import LanguageProvider from './containers/LanguageProvider';
// Import i18n messages
// import { translationMessages } from './i18n';

const store = createStore(
  reducers,
  // TODO: remove "composeWithDevTools" on production
  composeWithDevTools(applyMiddleware(thunk)),
);
// const languages = ['en'];

// store.dispatch(setLanguages(languages));
// store.dispatch(addTranslation(translationsJson));

// const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        {/* <LanguageProvider messages={messages}> */}
        <MuiThemeProvider>
          <div>
            <Switch>
              <Route path="/login" component={LoginContainer} />
              <Route path="/resetPassword" component={ResetPasswordPage} />
              <Route path="/setPassword/:token" component={SetPasswordPage} />
              <Route path="/" component={App} />
            </Switch>
          </div>
        </MuiThemeProvider>
        {/* </LanguageProvider> */}
      </BrowserRouter>
    </Provider>
    , document.getElementById('root')
  );
// };


// // Hot reloadable translation json files
// if (module.hot) {
//   // modules.hot.accept does not accept dynamic dependencies,
//   // have to be constants at compile-time
//   module.hot.accept('./i18n', () => {
//     render(translationMessages);
//   });
// }

// // Chunked polyfill for browsers without Intl support
// if (!window.Intl) {
//   (new Promise((resolve) => {
//     resolve(import('intl'));
//   }))
//     .then(() => Promise.all([
//       import('intl/locale-data/jsonp/en.js'),
//     ]))
//     .then(() => render(translationMessages))
//     .catch((err) => {
//       throw err;
//     });
// } else {
//   render(translationMessages);
// }

registerServiceWorker();
