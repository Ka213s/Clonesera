import React from 'react';
import './styles/App.css';
import AppRouters from './routers/AppRouters';
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouters />
    </div>
  );
}

export default App;
