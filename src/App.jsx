import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [hasNumbers, setHasNumbers] = useState(false);
  const [hasChar, sethasChar] = useState(false);

  const passwordGenerator = useCallback(()=>{
    let pass =''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(hasNumbers) str += '0123456789'
    if(hasChar) str += '!@#$%^&*()_+'
    for(let i=0; i<length; i++){
      pass += str.charAt(Math.floor(Math.random()*str.length))
    }
    setPassword(pass)
  },[length,hasChar,hasNumbers,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[passwordGenerator, length, hasChar, hasNumbers]);

  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(()=>{
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  },[password,passwordRef.current])





  return (
    <div className="h-full flex flex-wrap justify-center my-3 mx-4 bg-zinc-700">
      <div className='w-fit bg-slate-600 '>
        <h1 className='text-4xl py-4 px-3 text-center text-white'>Password Generator</h1>
        <div className='flex flex-wrap justify-center items-center'>
        <input className='mx-2 p-2 text-center border-collapse rounded-lg'
         type="text"
        value={password}
        readOnly
        min={8}
        max={100}
        placeholder='password' />
        <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
        onClick={()=>copyToClipboard()}
        >Copy</button>
        </div>
        <div className='flex flex-wrap justify-center items-center'>
        <input className='mx-2 p-2 text-center text-black bg-g rounded-lg'
         type="range" min="8" max="100"
         onChange={(e)=>setLength(e.target.value)}
         />
        <label className='text-white'>Length:{length}</label>
        <input className='mx-2 p-2 text-center text-black bg-g rounded-lg'
         type="checkbox"
         onChange={()=>{
          setHasNumbers(prev=>!prev)}}
         ></input>
        <label className='text-white'>Numbers</label>
        <input className='mx-2 p-2 text-center text-black bg-g rounded-lg'
         type="checkbox"
         onChange={()=> {
          sethasChar(prev=>!prev)}}
         ></input>
        <label className='text-white'>Characters</label>
        </div>
      </div>
    </div>
    
  )
}

export default App
