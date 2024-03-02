import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './screens/home';
import Login from './screens/login';
import Register from './screens/register';
import Nav from './components/nav';
import Music from './screens/music';
import Forgot from './screens/forgot';

function App () {
    return (
        <div className="App">
            <BrowserRouter>
                <Nav />
                <div className='pages'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/music/:id' element={<Music />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/forgot' element={<Forgot />} />
                        <Route path='*' element={<h1>Not Found 404</h1>} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;
