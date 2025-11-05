import React from "react";
import Header from "./components/Header";

const App: React.FC = () => {
    return (
        <div>
            <Header/>
            <main className="p-4">
                <p>Welcome to Cricket Scorer! Your cricket score tracker.</p>
            </main>
        </div>
    );
};

export default App;