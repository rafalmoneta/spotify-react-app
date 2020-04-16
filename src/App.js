import React, { useEffect, useState } from 'react';
import hash from './utils/hash';
import './App.scss';
import LoginScreen from './components/LoginScreen/LoginScreen';
import Content from './components/Content/Content';


function App() {
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    let _token = hash.access_token;
    if(_token) {
      setToken(_token);
    }
  },[])

  return (
    <div className="App">
      {token ? <Content /> :  <LoginScreen />}
    </div>
  );
}

export default App;
