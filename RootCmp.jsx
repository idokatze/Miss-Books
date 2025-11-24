const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Navigate } = ReactRouterDOM

const { useState } = React

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { NotFound } from './cmps/NotFound.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from "./pages/BookEdit.jsx"


export function RootCmp() {
    const [page, setPage] = useState('book')

    return (
        <Router>
            <section className="app">
                <AppHeader />

                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit" element={<CarEdit />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                {/* <header className="app-header container">
                            <section>
                                <h1>React Book App</h1>
                                <nav className="app-nav">
                                    <a onClick={() => setPage('home')}>Home</a>
                                    <a onClick={() => setPage('about')}>
                                        About
                                    </a>
                                    <a onClick={() => setPage('book')}>Books</a>
                                </nav>
                            </section>
                        </header> */}
                {/* <main>
                    {page === 'home' && <Home />}
                    {page === 'about' && <About />}
                    {page === 'book' && <BookIndex />}
                </main> */}
            </section>
        </Router>
    )
}
