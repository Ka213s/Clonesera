import React from 'react';
import './styles/App.css';
import AppRouters from './routers/AppRouters';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouters />
    </div>
  );
}

export default App;
