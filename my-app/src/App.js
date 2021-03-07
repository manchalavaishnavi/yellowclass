import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Infinitescroll from 'react-infinite-scroll-component'
import Lightbox from "rhino-react-image-lightbox-rotate";
function App() {
  const [photos,setPhotos]=useState([])
  const [small,setSmall]=useState(true)
  const [photoindex,setPhotoindex]=useState(0)
  console.log(photos)
  useEffect(()=>{
    fetchimage()
  },[])
 const fetchimage=()=>{
    const apiroot='https://api.unsplash.com'
    axios.get(`${apiroot}/photos/random?client_id=8GHg7v0Zj1XmHnaYt1OfE1oO4QvUU9AHSomrfQmq-wg&count=20`)
    .then(res=>{
      setPhotos([...photos,...res.data])
      

      
    })
  }
  const indexhandler=(id)=>{
    console.log(id)
    setPhotoindex(id)
    console.log(photos[photoindex])
    setSmall(!small)
  }
  

  if (small){
    return (
      
    
      <div className="image-grid" >
        <Infinitescroll
        dataLength={photos.length}
        next={fetchimage}
        hasMore={true}
        >
        <div className='photoscollection'>
        
        {
        photos.map((photo,id)=>(
          <div key={id}>
          <img src={photo.urls.thumb} alt='' key={id} onClick={() => indexhandler(id)}  />
          </div>

  
        ))}
      </div>
    
  
  
        </Infinitescroll>
  
  
      </div>
  
    );
  
  }else{
    return (
      <Lightbox
      mainSrc={photos[photoindex].urls.thumb}
      nextSrc={photos[(photoindex + 1) % photos.length]}
      prevSrc={photos[(photoindex + photos.length - 1) % photos.length]}
      onCloseRequest={() => setSmall(!small)}
      onMovePrevRequest={() =>
        setPhotoindex((photoindex + photos.length - 1) % photos.length)
      }
      onMoveNextRequest={() =>
        
        setPhotoindex((photoindex + 1) % photos.length)
      }
    />
    )

  }


}

export default App;
