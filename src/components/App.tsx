import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import HomePage from './pages/HomPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const App = () => (
    <>
        <Navbar />

        <div className="main m-3">

            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Routes>

        </div>

        <div className="fixed-bottom p-3 bg-light">

            <div className="text-center">Copyright 2022 | ranaivo.it@gmail.com </div>

        </div>
    </>
)

export default App
