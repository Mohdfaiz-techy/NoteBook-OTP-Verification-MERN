
import React,{useContext} from 'react'
import noteContext from '../context/notes/contextNote';

const About = () => {
   const a = useContext(noteContext);
  return (
    <div>
        <h1>
      This is About page {a}
        </h1>
    </div>
  )
}

export default About
