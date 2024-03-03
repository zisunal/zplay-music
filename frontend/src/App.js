import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './screens/home'
import Login from './screens/login'
import Register from './screens/register'
import Nav from './components/nav'
import Music from './screens/music'
import Forgot from './screens/forgot'
import Verify from './screens/verify'
import Profile from './screens/profile'
import Logout from './screens/logout'
import { LoginProvider } from './contexts/login-context'

function App () {
    return (
        <LoginProvider>
            <div className="App">
                <BrowserRouter>
                    <Nav />
                    <div className='pages'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/music/:id' element={<Music />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/logout' element={<Logout />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/verify/:id' element={<Verify />} />
                            <Route path='/forgot' element={<Forgot />} />
                            <Route path='*' element={<h1>Not Found 404</h1>} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </LoginProvider>
    )
}

export default App;
