import axios from 'axios';
import './App.css';

//App.js

import axios from 'axios';
import './App.css';

//data will be the string we send from our server
const apiCall = () => {
  axios.get('http://localhost:3000').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <button onClick={apiCall}>Make API Call</button>

      </header>
    </div>
  );
}



/*const express = require('express');
const app = express();
const port = 3000; 

// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); */