import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Stories() {

  const[stories,setStories]=useState([]);

  const navigate=useNavigate();

  let tot=0;

  useEffect(()=>{
    fetch("http://localhost:3002/stories")
    .then((response)=>response.json())
    .then((data)=>setStories(data))
    .then((err)=>console.log(err))
  },[])
  return (
    <div className='story d-flex'>
      <div className='d-none'>
        {tot=stories.length}
      </div>
      {stories.length > 0 ? (
        stories.map((story)=>(
          <div className='mx-2' onClick={()=>{navigate(`/story/${story.id}/${tot}`)}} key={story.id}>
            <div className='gradient-border'>
              <img className="pd rounded-circle" src={story.user.profilePic} alt='profilepic' />
            </div>
            <p className='text-truncate' style={{width:'50px'}}>{story.user.username}</p>
          </div>
        ))
      ):(
       <div>loading</div>
      )}
    </div>
  )
}

export default Stories