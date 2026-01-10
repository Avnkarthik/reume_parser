import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dragdrop from './Dragdrop'

function App() {
  const [resume,setResume]=useState(null);

  return (
   <div>
    <Dragdrop setResume={setResume}/>
    <h1>{resume?resume.name:""}</h1>
   </div>
  )
}

export default App
