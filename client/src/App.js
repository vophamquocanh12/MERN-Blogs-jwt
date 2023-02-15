import './App.css'
import DataProvider from '~/context/DataProvider'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'

// components
import { Login, Home } from '~/layouts'
import { useState } from 'react'
import { Header, CreatePost } from './components'

const PrivateRoute = ({ isAuthenticated, ...props }) => {
    return isAuthenticated ? (
        <>
            <Header />
            <Outlet />
        </>
    ) : (
        <Navigate replace to="/login" />
    )
}

function App() {
    const [isAuthenticated, isUserAuthenticated] = useState(false)

    return (
        <DataProvider>
            <BrowserRouter>
                <div className="app">
                    <Routes>
                        <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated} />} />
                        <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                            <Route path="/" element={<Home />} />
                        </Route>
                        <Route path="/create" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                            <Route path="/create" element={<CreatePost />} />
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </DataProvider>
    )
}

export default App
