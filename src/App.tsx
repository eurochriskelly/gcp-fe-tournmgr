import { Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';
import OrganizeTournament from "./components/OrganizeTournament";

function App() {
    return (
        <PrimeReactProvider>
            <h1>Tournament Builder</h1>
            <Routes>
                <Route path="/" element={<OrganizeTournament />} />
            </Routes>
        </PrimeReactProvider>
    )
}

export default App
