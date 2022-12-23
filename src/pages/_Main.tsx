import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';
import '../scss/index.scss';

// import About from './About';
// import Home from './Home';
import Loading from './Loading';
// import Signup from './Signup';

const LazyHome = React.lazy(() => import('./Home'))
const LazyStart = React.lazy(() => import('./Start'))
const LazyLogin = React.lazy(() => import('./Login'))
const LazySignup = React.lazy(() => import('./Signup'))
const LazyVerifyOTP = React.lazy(() => import('./VerifyOTP'))
const LazyProfile = React.lazy(() => import('./Profile'))
const LazyNotifications = React.lazy(() => import('./Notifications'))
const LazyCart = React.lazy(() => import('./Cart'))
const TandC = React.lazy(() => import('./TandC'))
const NewOrder = React.lazy(() => import('./NewOrder'))



function Main() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div id="container">
      <Router>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<LazyStart />} />
            <Route path='/loading' element={<Loading />} />
            <Route path='/login' element={<LazyLogin />} />
            <Route path='/signup' element={<LazySignup />} />
            <Route path='/verifyOTP' element={<LazyVerifyOTP />} />
            <Route path='/home' element={<LazyHome />} />
            <Route path='/t&c' element={<TandC />} />
            <Route path='/profile' element={<LazyProfile />} />
            <Route path='/cart' element={<LazyCart />} />
            <Route path='/notifications' element={<LazyNotifications />} />
            <Route path='/newOrder' element={<NewOrder />} />
          </Routes>
        </React.Suspense>
      </Router>
    </div>
  )
}

export default Main