import React from 'react';
import axios from 'axios'
import Infinitescroll from 'react-infinite-scroll-component'
import Lightbox from "rhino-react-image-lightbox-rotate";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './fetch.css'
class Fetching extends React.Component{
    constructor(){
        super()
        this.state={
            photos:[],
            small:true,
            photoindex:0
        }
    }
    componentDidMount(){
        this.fetchimage()
    }
    fetchimage=()=>{
        const apiroot='https://api.unsplash.com'
        axios.get(`${apiroot}/photos/random?client_id=EsUaxhHgaHapdMInlPbyMN5lGuLfnASUZqbP1eEHHRU&count=15`)
        .then(res=>{
      this.setState({photos:[...this.state.photos,...res.data]})
      

      
    })
  }
  indexhandler=(id)=>{
    this.setState({photoindex:id})
    this.setState({small:!this.state.small})
  }
  render(){
    if (this.state.small){
        return (
          
        
          <div className="image-grid" >
            <Infinitescroll
            dataLength={this.state.photos.length}
            next={this.fetchimage}
            hasMore={true}
            >
            <div className='photoscollection'>
            
            {
            this.state.photos.map((photo,id)=>(
              <div key={id} className='imgcontainer'>
                
              <LazyLoadImage
              effect="blur"
                src={photo.urls.thumb} 
                alt='' 
                key={id} 
                onClick={() => this.indexhandler(id)}
    
                />
              
              
              </div>
    
      
            ))}
          </div>
        
      
      
            </Infinitescroll>
      
      
          </div>
      
        );
      
      }else{
        console.log(this.state.photoindex)
        return (
            <Lightbox
            mainSrc={this.state.photos[this.state.photoindex].urls.thumb}
            nextSrc={this.state.photos[(this.state.photoindex + 1) % this.state.photos.length]}
            prevSrc={this.state.photos[(this.state.photoindex + this.state.photos.length - 1) % this.state.photos.length]}
            onCloseRequest={() => this.setState({small:!this.state.small})}
            onMovePrevRequest={() =>
                this.setState({photoindex:(this.state.photoindex+this.state.photos.length-1)%this.state.photos.length})
            }
            onMoveNextRequest={() =>
              this.setState({photoindex:(this.state.photoindex+1)%this.state.photos.length})
            }
            imageCaption={this.state.photos[this.state.photoindex].alt_description}
      
          />
        
        )
    
      }
    
    
    }
  }


export default Fetching
