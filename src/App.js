import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ACCESS_KEY } from './config/constants';

function App() {
  const [imageList, setImageList] = useState([]);
  const [tempImage, setTempImage] = useState([]);
  useEffect(() => {
    axios.get(`https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`)
    .then((response)=>{
      setImageList(response.data);
      setTempImage(response.data);
    });
  }, []);
  const searchImage = (search)=>{
    if(search===""){
      setImageList(tempImage);
    }
    else{
      const searchedImageList = imageList.filter((data)=>{
        data.alt_description = data.alt_description == null ? "No":data.alt_description;
        return data.alt_description.includes(search);
      });
      setImageList(searchedImageList);
    }
  }
  return (
    <div>
      <center>
      <input type="text" placeholder="Search Your Image" onChange={(e)=>{searchImage(e.target.value)}} />
      </center>
    <div className="App">
      {imageList.length>0?imageList.map((data)=>{
        return <div key={data.id} className="images">
          <img src={data.urls.regular} alt={data.alt_description} />
          <br/>
          <i>{data.alt_description?data.alt_description.substring(0, 30):"No Caption"}</i>
          </div>
      }):"No Pics"}
    </div>
    </div>
  );
}

export default App;
