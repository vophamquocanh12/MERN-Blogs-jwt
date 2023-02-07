import './App.css'
import DataProvider from '~/context/DataProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// components
import { Login, Home, Header } from '~/layouts'

function App() {
    return (
        <DataProvider>
            <BrowserRouter>
                <Header />
                <div className="app">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </DataProvider>
    )
}

export default App
