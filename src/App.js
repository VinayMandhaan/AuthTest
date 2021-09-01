import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Typography, List } from 'antd';
import axios from 'axios'
import 'antd/dist/antd.css';

const App = () => {
  const { Title } = Typography;
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(null)
  const [errMsg, setErrMsg] = useState(null)
  const [respMsg, setRespMsg] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [myData, setMyData] = useState([])
  const [errDis, setErrDisp] = useState(false)

  const handleApiCall = () => {
    const data = {
      email: email,
      password: password
    }
    console.log(data)
    axios({
      method: 'POST',
      url: 'https://api-dev.getxfoil.com:4000/login',
      data: {
        email: email,
        password: password
      }
    }).then((res) => {
      setMyData(res.data)
      if (res.data.companyId) {
        setErrDisp(false)
        setErrMsg(null)
        setLoggedIn(true)
        console.log(res)
      }
      setRespMsg('User Logged In')
    }).catch(err => {
      console.log(err, 'ERR')
      setErrDisp(true)
      setErrMsg('Unable to Login User')
    })
  }
  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      >
        <Form.Item

          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input onChange={e => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password onChange={e => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button onClick={() => handleApiCall()} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>



      </Form>

      {
        loggedIn ? (
          <>
            <Title>Welcome {myData.firstNameAdmin}{myData.lastNameAdmin}</Title>
            <Title> {myData.companyId}</Title>
            <List
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered
              dataSource={myData.locationObjects}
              renderItem={item => (
                <List.Item>
                  <Typography.Text mark>{item.locationName}</Typography.Text> {item.locationName}
                </List.Item>
              )}
            />
          </>
        ) : null
      }

      {
        setErrDisp ? <Title>{errMsg}</Title> : null
      }

      {/* <button onClick={()=>console.log(myData.firstNameAdmin)}>Check Val</button> */}

    </div>


  )
}

export default App







{/* <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
      <input type="text" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
      <button onClick={()=>handleApiCall()}>Submit</button>
      {
        errMsg && <p>{errMsg}</p>
      }
      {
        respMsg && <p>{respMsg}</p>
      } */}