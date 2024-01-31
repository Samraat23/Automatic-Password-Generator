
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  
  const[length , setLength] = useState(0);
  const[number , setNumber] = useState(false);
  const[chart , setChart] = useState(false);
  const[password , setPassword] = useState("");
  
  // useref hook it is provide reference to other element
  const passwordRef = useRef(null);

  const passwordgenerator = useCallback(()=> {
      let pass = "";
      let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"

      if(number) str += "1234567890" 
      if(chart) str += "!@#$%^&*(){}[]"

      for (let i = 1; i <=length; i++) {
        let char = Math.floor(Math.random() * str.length);
        pass += str.charAt(char);
    }
    
    setPassword(pass);

  }, [length , number , chart , setPassword]);

  useEffect(() => {
    passwordgenerator()
  },[length , number , chart , setPassword])


  const copypasswordtoclipboard = useCallback(() =>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
    passwordRef.current?.setSelectionRange(0,3);
  },[password])

 

  return (
    <div className="App">
    <div>
     <h1>PASSWORD GENERATOR</h1>
    </div>
    <div className='input_text'>
      <input className='input_box'
      type="text"
      value={password}
      ref={passwordRef}
      placeholder='password'/>
      <button 
      className='btn' onClick={copypasswordtoclipboard}>copy</button>
    </div>
    <div className='passwordgenerator'>
    <div className='range'>
       <input type="range"
        min={5}
        max={11}
        value={length}
        onChange={(e) =>setLength(e.target.value) }
         />
        <label > length : {length}</label>
    </div>
    <div className='number_checkbox'>
      <input type="checkbox"
       defaultChecked={number}
       id='numberinput'
        onChange={() => setNumber((prev) => !prev)} />
    </div>
    <label htmlFor='numberinput'>Number</label>
    <div className='chart_checkbox'>
      <input type="checkbox"
       defaultChecked={chart}
       id='charactorinput'
        onChange={() => setChart((prev) => !prev)} />
    </div>
    <label htmlFor="charactorinput">Charactor</label>
    </div>
  
    
    </div>
  );
}

export default App;
