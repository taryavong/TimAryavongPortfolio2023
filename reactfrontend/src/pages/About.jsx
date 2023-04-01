import React from 'react'

function About() {
  return (
    <div className='pageContent backBlue'>
      <h1>About</h1>
      <hr/>
      <p>As junior web dev, I've yet to learn the in's and outs of working with a team but I look forward to the opportunity to do.</p><br />
      <p>I'm currently working on a MERN stack portfolio website so that I can display my ability to learn what needs to be learned to accomplish my goals. This does mean doing the full stack on my own but I'm ready to be uncomfortable with that.</p><br />
      <p>A rough plan: After making a roughly designed front end, I am aiming to implement a Blog page and Image Gallery to practice back end programming, then adding Authentication(cookies, JWT, sessions) for admin/user login. Afterwards I'll look up some API's to implement.</p>
      <ul className='aboutList'>
        <li><s>Authentication</s></li>
        <li>Blog Page</li>
        <li>Image Gallery</li>
        <li>Google Auth</li>
        <li>OpenAI API</li>
        <li>More Dashboard utilities eg. About page editing, Home page editing</li>
      </ul>
      <br />
      <p>All the while pushing commits to GitHub so I don't lose my work. I have left a GitHub link here so that anyone can drop by and see where my work is at. If you don't mind reviewing my work, feel free to leave any suggestions(like some API?). Drop me some wisdom and knowledge, I'd appreciate it greatly!</p>
    </div>
  )
}

export default About