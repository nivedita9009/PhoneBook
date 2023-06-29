import React from 'react'
import { Col } from 'react-bootstrap';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function CustomerDetailsAdd() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const [sst, setSst] = useState()

  const submitData = async () => {
    const data = {
      firstname,
      lastname,
      mobile,
      email
    }
    const res = await axios.post("http://localhost:4999/api/insertcustomerdetail", data)
    console.log("postData response", res)
    setSst(res.data.affectedRows)
  }



  return (
    <>
      <h2 style={{ textAlign: 'center' }}><b><u>Add Details</u></b></h2>
      <div style={{ marginTop: '60px' }}>
        <Form style={{ marginLeft: "580px" }}>
          <Col style={{ alignItems: 'center' }}>

            <Form.Group className="mb-3" controlId="formBasicname">
              <TextField type="text"

                id="standard-basic" label="First Name" variant="standard" sx={{ width: 300 }}
                value={firstname} onChange={(e) => setFirstname(e.target.value)}
                placeholder="Enter first name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicphone">
              <TextField type="text"
                id="standard-basic" label="Last Name" variant="standard" sx={{ width: 300 }}
                value={lastname} onChange={(e) => setLastname(e.target.value)}
                placeholder="Enter last name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicphone">
              <TextField type="email"
                id="standard-basic" label="Email" variant="standard" sx={{ width: 300 }}
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicid">
              <TextField type="text"
                id="standard-basic" label="Phone Number" variant="standard" sx={{ width: 300 }}
                value={mobile} onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter mobile" />
            </Form.Group>
          </Col>
          {

            (sst === 1)

              ? <p style={{ color: 'green' }}>Add Details Done</p>
            
              : <p style={{ color: 'red' }}></p>

          }
        </Form>
        <span style={{ marginLeft: '680px' }}>
          <Button variant="outlined" onClick={(e) => submitData(e)}>
            Save Data
          </Button>
        </span>
      </div>
    </>
  )
}

export default CustomerDetailsAdd