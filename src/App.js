import React from 'react';
import ContentLeadForm from './components/ContentLeadForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Hack SIST</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <ContentLeadForm />
      </main>
    </div>
  );
}

export default App;
