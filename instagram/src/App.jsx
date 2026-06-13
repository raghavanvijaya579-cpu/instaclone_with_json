import React from 'react'
import Sidebar from './sidebar'
import Feed from './feed'
import Suggestions from './suggestion'

function App() {
  return (
    <div className=' d-flex vh-100'>   
     {/* <H>d-flex->arrange data in a row,vh-100->VIEW HEIGHT COLOR WHOLE PAGE</H>  */}
      <div className='w-20'><Sidebar/></div>
      <div className='w-50'><Feed /></div>
      <div className='w-30 '><Suggestions /></div> 
    </div>
  )
}

export default App