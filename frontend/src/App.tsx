import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { Profile } from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/home' element={<Home />} />
        <Route path='/history' element={<History />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;