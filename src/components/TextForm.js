import React, {useState} from 'react'

export default function TextForm(props) {
  const handleUpClick= ()=>{
     //console.log("Uppercase was Clicked!" + text);
     let newText = text.toUpperCase();
     setText(newText)
     props.showAlert("Converted to uppercase!","success");
  }

  const handleLoClick= ()=>{
    //console.log("Lowercase was Clicked!" + text);
    let newText = text.toLowerCase();
    setText(newText)
    props.showAlert("Converted to lowercase!","success");
 }

  const handleClearClick= ()=>{
    let newText = ('');
    setText(newText)
    props.showAlert("Text Cleared!","success");
  }

  const handleCopy= ()=>{
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to clipboard!","success");
  }

  const handleExtraSpaces= ()=>{
    let newText = text.split(/\s+/).join(" ");
    setText(newText)
    props.showAlert("Extra spaces removed!","success");
  }

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
  }

  const handleOnChange= (event)=>{
    //console.log("On Change!");
    setText(event.target.value);
 }

  const [text, setText] = useState("Enter Text");
  return (
    <>
    <div className="container" style={{color: props.mode==='dark'?'white':'black'}}>
      <h1 className='mb-3'>{props.heading}</h1>
        <div className="mb-3">
            <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'#555a5f':'white', color: props.mode==='dark'?'white':'black'}} id="myBox" rows="8" ></textarea>
            <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>Convert to Uppercase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleLoClick}>Convert to Lowercase</button>
            <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleClearClick}>Clear Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy Text</button>
            <button disabled={text.length===0} className="btn btn-primary mx-2 my-2" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            <button disabled={text.length===0} type="submit" onClick={speak} className="btn btn-warning mx-2 my-2">Speak</button>
        </div>
    </div>
    <div className="container my-3" style={{color: props.mode==='dark'?'white':'black'}}>
      <h2>Your Text Summary</h2>
      <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words, {text.length} characters</p>
      {/*<p>{text.split(" ").length-1} words, {text.length} characters</p>*/}
      <p>{ 0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} minutes read</p>
      <h2>Preview</h2>
      <p>{text.length>0 ? text:"Nothing to preview!"}</p>
    </div>
    </>
  )
}

