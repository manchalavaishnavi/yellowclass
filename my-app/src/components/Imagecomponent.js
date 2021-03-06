import React from 'react';
import './imagecomponent.css'

function Imagecomponent(props){
    return (
        <div className='wrapper'>
            <img src={props.url} alt='' key={props.id} />
        </div>
    )
}
export default Imagecomponent