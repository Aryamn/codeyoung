import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {

  const [sentence, setSentence] = useState('');
  const [language, setLanguage] = useState('');
  const [translatedSentence,settranslatedSentence]=useState('')

  const handleChange=(e)=>{
    setSentence(e.target.value)
    
  }

  const handleLanguage = (e) => {
    setLanguage(e.target.value)
  }

  const handleClick=()=>{
    fetch(`http://localhost:3001/translate?sourceText=${sentence}&targetLanguage=${language}`)
        .then(response => response.json())
        .then(res=>settranslatedSentence(res.data.finalText))
        
  }
  return (
    <div className="container">
      <input type="text" onChange={handleChange}></input>
      <input type="text" onChange={handleLanguage}></input>
      <button onClick={handleClick}>Translate</button>

      <br/>
      <h1>Translated text:</h1>
      <p>{translatedSentence}</p>
    </div>
  );
}

export default App;
