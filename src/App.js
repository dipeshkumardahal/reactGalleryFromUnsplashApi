import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ACCESS_KEY } from './config/constants';

function App() {
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    axios.get(`https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`)
    .then((response)=>setImageList(response.data));
  }, []);
  return (
    <div className="App">
      {imageList.map((data)=>{
        return <div key={data.id} className="images">
          <img src={data.urls.regular} alt={data.alt_description} />
          <br/>
          <i>{data.alt_description?data.alt_description.substring(0, 30):"No Caption"}</i>
          </div>
      })}
    </div>
  );
}

export default App;
