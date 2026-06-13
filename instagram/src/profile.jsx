import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {
    
    const[profile,setProfile]=useState(null);

    const[followers,setFollowers]=useState([])

    const[unfollowed,setUnfollowed]=useState(0)

    useEffect(()=>{
        axios.get('http://localhost:3002/profile')
        .then(data=>{setProfile(data.data)})
        .catch(err=>console.log(err))

         axios.get('http://localhost:3002/followers')
        .then(data=>{setFollowers(data.data)})
        .catch(err=>console.log(err))
    },[unfollowed])


    function HandleOnChange(e){
        setProfile(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleUpdate=async ()=>{
        axios.put('http://localhost:3002/profile',profile)
        .then(console.log("updated"))
        .catch(err=>console.log(err))
    }

    const handleUnFollow =async (id)=>{
        axios.delete(`http://localhost:3002/followers/${id}`)
        .then(alert("unfollowed"))
        .then(setUnfollowed(!unfollowed))
        .catch(err=>console.log(err))
    }
    
  return (
    <div>
        {profile ? (
            <div>
                <img src={profile.profilePic} className='profile rounded-circle' alt="profile" />
                <h5>{profile.username}</h5>

                <input type='text'
                        value={profile.username}
                        name='username'
                        className='in form-control my-4'
                        onChange={HandleOnChange}
                         />

                <input type='text'
                        value={profile.profilePic}
                        name='profilePic'
                        className='ip form-control'
                        onChange={HandleOnChange}
                         />

                <button className='btn btn-primary my-4' onClick={handleUpdate}>Update</button>
            </div>
        ):(
            <div>loading</div>
        )}

        {followers.length > 0 ? (
            followers.map((follower)=> 
            <div className='d-flex my-2' key={follower.id}>
                <img className="vdp rounded-circle"src={follower.profilePic} alt='profile'/>
                <div>{follower.username}</div>
                <button onClick={()=>handleUnFollow(follower.id)} className='btn btn-danger ms-auto'>unfollow</button>
            </div>
            )
        ):(
            <div>loading followers</div>
        ) }
    </div>
  )
}

export default Profile