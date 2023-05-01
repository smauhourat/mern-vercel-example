import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Trips from './components/trips/Trips';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from './components/Fallback';

import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  useEffect(() => {
  }, []);

  const errorHandler = (error, errorInfo) => {
    console.log('Logging', error, errorInfo);
  }

  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
          <Routes>
            <Fragment>
              <Route exact path="/" element={<Landing />} />
              <Route path="trips" element={<Trips />} />
            </Fragment>
          </Routes>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
};

export default App;
