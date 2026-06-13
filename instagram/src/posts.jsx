import React, { useEffect, useState } from 'react'

function Posts() {

    const [posts,setPosts]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:3002/posts')
        .then((response)=>response.json())
        .then((data=>setPosts(data)))
        .catch((error)=>
    console.log(error))
  },[]);

  return (
    <div className='d-flex justify-content-center'>
      {posts.length > 0 ? (
        <div>
            {posts.map((post)=> (
              <div className='my-3' key={post.id}>
                <div className='d-flex'>
                    <img className='dp rounded-circle' src={post.user.profilePic} alt="profilepic" />
                    <h5 className='ms-3 '>{post.user.username}</h5>
                </div>
                <img className='image border border-primary mt-1' src={post.image} alt="post" />
                <div className=''>
                  <i className="bi bi-heart"></i>
                  <i className="bi bi-chat"></i>
                  <i className="bi bi-send"></i>
                </div>
                <div className="">
                  <b>{post.likes} Likes</b>
                </div>
                <p>{post.caption}</p>
              </div>
          ))}
    </div>
      ):(
        <div>
          loading posts
          </div>
        )}
    </div>
  )
}

export default Posts