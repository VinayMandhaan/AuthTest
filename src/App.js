import React, {useState} from 'react'
import axios from 'axios'

const App = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(null)
  const [errMsg, setErrMsg] = useState(null)
  const [respMsg, setRespMsg] = useState(null)

  const handleApiCall = () => {
    const data = {
      email:email,
      password:password
    }
    console.log(data)
    axios({
      method:'POST',
      url:'https://api-dev.getxfoil.com:4000/login',
      body:data
    }).then((res) => {
      console.log(res)
      setRespMsg('User Logged In')
    }).catch(err => {
      console.log(err)
      setErrMsg('Unable to Login User')
    })
  }
  return (
    <div>
      <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
      <input type="text" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
      <button onClick={()=>handleApiCall()}>Submit</button>
      {
        errMsg && <p>{errMsg}</p>
      }
      {
        respMsg && <p>{respMsg}</p>
      }
    </div>
  )
}

export default App