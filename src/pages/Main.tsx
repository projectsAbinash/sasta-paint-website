import React from 'react';
import '../scss/index.scss'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

// import About from './About';
// import Home from './Home';

const LazyAbout = React.lazy(() => import('./About'))
const LazyHome = React.lazy(() => import('./Home'))
const LazyLogin = React.lazy(() => import('./Login'))



function Main() {
  return (
    <div id="container">
      <Router>
        <React.Suspense fallback={"Loading..."}>
          <Routes>
            <Route path='/' element={<LazyHome />} />
            <Route path='/login' element={<LazyLogin />} />
            <Route path='/about' element={<LazyAbout />} />
          </Routes>
        </React.Suspense>
      </Router>
    </div>
  )
}

export default Main