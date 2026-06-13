import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Suggestions() {
     
    const[profile,setProfile] =useState(null);
    const[suggestions,setSuggestions] =useState([]);



    function following(id){
      const updated=suggestions.map((item)=>
      item.id==id
         ?{...item, followed:!item.followed}
         :item
      );
    setSuggestions(updated);
    }

    useEffect(()=>{
        fetch("http://localhost:3002/profile")
              .then((response)=>response.json())
              .then((data)=>setProfile(data))
              .then((err)=>console.log(err))

        fetch("http://localhost:3002/suggestions")
              .then((response)=>response.json())
              .then((data)=>setSuggestions(data))
              .then((err)=>console.log(err))
    },[])
 
    const handlefollow=async (id,username,profilePic) =>{
      axios.post('http://localhost:3002/followers',{"id":id,"username":username,"profilePic":profilePic})
      .then(alert('followed'))
      .catch(err=>console.log(err))
    }
  
  return (
    <div >
      <div className='suggest w-75 mt-4'>
          {profile ?
          <div className='d-flex '>
                <img className='dp rounded-circle' src={profile.profilePic} alt="profilepic" />
                <h5 className='ms-3 '>{profile.username}</h5>
                <small className='ms-auto text-primary'>switch</small>
          </div>
          : <p>loading</p>}
          <div className='d-flex mt-3'>
            <p>Suggested For You</p>
            <b className='ms-auto'>See All</b>
          </div>
      </div>
      <div>
        {suggestions.length > 0 ?  (
          <div className='sug w-75 '>
            {suggestions.map((suggestion)=>(
              <div className='' key={suggestion.id}>
                <div className='d-flex '>
                    <img className='pr rounded-circle' src={suggestion.profilePic} alt="profilePic"/> 
                    <h5 className='ms-3'>{suggestion.username}</h5>
                    <a className='ms-auto text-primary ' onClick={()=> {following(suggestion.id); handlefollow(suggestion.id,suggestion.username,suggestion.profilePic);}}>{suggestion.followed ? "following":"follow"}</a>
                </div>
              </div>
            ))}
          </div>
        ):(
          <div>
            <p>loading</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Suggestions