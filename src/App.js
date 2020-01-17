import React, { useState, useEffect } from 'react';
import './global.css'
import './App.css'
import './SideBar.css'
import './Main.css'
import './services/api'
import api from './services/api';


import './components/DevItem/index'
import DevForm from './components/DevForm/';
import DevItem from './components/DevItem/';

function App() {

  const [devList, setDevList] = useState([{"test":"OK"}]);


  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');     
      setDevList(response.data);
    }

    loadDevs();

  }, []);


  async function handleAddDev(data) {
    
    const response = await api.post('/devs', data)
    
    setDevList([...devList, response.data]);

  }

  return (
    <div id="app">
      <aside>
        <strong>Register</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devList.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
