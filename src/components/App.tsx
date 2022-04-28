import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import CVPage from './pages/CVPage'
import HomePage from './pages/HomPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const App = () => (
    <>
        <Navbar />

        <div className="main my-5 mx-2">

            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/cv' element={<CVPage />} />
            </Routes>

        </div>

        <div className="fixed-bottom p-2 bg-light">

            <div className="text-center">Copyright 2022 | ranaivo.it@gmail.com </div>

        </div>
    </>
)

export default App
