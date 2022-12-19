import React from 'react';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import '../scss/index.scss';

// import About from './About';
// import Home from './Home';
import Loading from './Loading';
// import Signup from './Signup';

const LazyAbout = React.lazy(() => import('./About'))
const LazyHome = React.lazy(() => import('./Home'))
const LazyLogin = React.lazy(() => import('./Login'))
const LazySignup = React.lazy(() => import('./Signup'))
const LazyVerifyOTP = React.lazy(() => import('./VerifyOTP'))



function Main() {
  return (
    <div id="container">
      <Router>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<LazyHome />} />
            <Route path='/loading' element={<Loading />} />
            <Route path='/login' element={<LazyLogin />} />
            <Route path='/about' element={<LazyAbout />} />
            <Route path='/signup' element={<LazySignup />} />
            <Route path='/verifyOTP' element={<LazyVerifyOTP />} />
          </Routes>
        </React.Suspense>
      </Router>
    </div>
  )
}

export default Main