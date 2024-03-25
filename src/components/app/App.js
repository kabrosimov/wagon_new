// import logo from './logo.svg';
import './App.css';
import AppHeader from '../appHeader/AppHeader';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {
    // IndividualsPage,
    // ExampleWithProviders,
    WagonPage,
    // ExampleWithReactQueryProvider,
    ExampleWithLocalizationProvider,
} from '../pages';
// import { IndividualsPage, ExampleWithProviders } from '../pages';

function App() {
    return (
        <Router>
            <div className="app">
                <AppHeader />

                <main>
                    <Routes>
                        {/* <Route path="/" element={<IndividualsPage />} /> */}
                        <Route
                            // path="/individualsCRUD"
                            path="/"
                            element={<ExampleWithLocalizationProvider />}
                        />
                        <Route path="/wagon" element={<WagonPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

