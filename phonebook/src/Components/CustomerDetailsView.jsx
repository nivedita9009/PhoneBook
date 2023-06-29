
import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import CustomerDetailsAdd from './CustomerDetailsAdd'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

const customStyles = {
    headRow: {
        style: {
            backgroundColor: '#2d8a46',
            color: "white"
        }
    },
    headCells: {
        style: {
            fontSize: '18px',
            fontHeight: '900',
            textTransform: 'uppercase',
 
           
        },
    },
    cells: {
        style: {
            fontSize: '17px',
            fontWeight:'bold'
        },
    },
}



function CustomerDetailsView() {

    const columns = [
       
        {
            name: 'First Name',
            selector: row => row.firstname,

        },
        {
            name: 'Last Name',
            selector: row => row.lastname,

        },
        {
            name: 'Email',
            selector: row => row.email,

        },
        {
            name: 'Mobile Number',
            selector: row => row.mobile,

        },
        {
            name: 'Action',
            cell: (row) => (
                <div>
                    <Button variant='secondry' onClick={() => updateData(row.firstname,row.lastname,row.email,row.mobile)}><ModeEditOutlineOutlinedIcon /></Button>
                    <Button variant='secondry' onClick={()=>{deleteCustomerDetail(row.mobile)}}><DeleteOutlineOutlinedIcon /></Button>
                </div>
            )

        }
    ];

    const [data, setData] = useState([])
    const [filterRecords, setFilterRecords] = useState([])
    const getData = async () => {
        const res = await axios.get("http://localhost:4999/api/viewcustomerdetails")
        setData(res.data)
        setFilterRecords(res.data)
        console.log("Response api", res.data)
    }
    useEffect(() => {
        getData()
    }, [])

    function handleFilter(event) {
        const newData = filterRecords.filter(row => {
            return row.firstname.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setData(newData)
    }


    //////////////////////update///////////////
    const [newfirstname, setNewfirstname] = useState('');
    const [newlastname, setNewlastname] = useState('');
    const [newemail, setNewemail] = useState('');
    const [newmobile, setNewmobile] = useState('');

    const [sst, setSst] = useState()

    async function updateData(firstname, lastname, email, mobile) {
        console.log(firstname, lastname, email, mobile)

        setNewfirstname(firstname)
        setNewlastname(lastname)
        setNewemail(email);
        setNewmobile(mobile);
        setSmShow(true)

    }
    async function saveUpdatedData() {
        
        let response = await axios.put(`http://localhost:4999/api/updatecustomerdetails/${newmobile}`, {
            "firstname":newfirstname,
            "lastname": newlastname,
            "email": newemail,
            "mobile": newmobile
            
        })
        setSst(response.data.affectedRows)
        console.log(response)
    }
    const [smShow, setSmShow] = useState(false);
    const handleClose = () => setSmShow(false);
  

    /////////////////////delete/////////////
    const deleteCustomerDetail = async (mobile) => {
        const res = await axios.delete(`http://localhost:4999/api/deletecustomerdetails/${mobile}`)
        console.log("Response api", mobile)
        console.log(res)
        getData()
      }
      useEffect(() => {
        deleteCustomerDetail()
      }, [])


    return (
        <>
        <div style={{margin:'40px'}}>
            <Tabs
                defaultActiveKey="View"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="View" title="View">
                    <div style={{margin:'40px'}}>
                        <div className='text-end'><input type='text'
                            onChange={handleFilter}
                            placeholder='search...'
                            style={{ margin: '5px', width: '250px', height: '35px' }}>

                        </input>
                            <DataTable
                                columns={columns}
                                data={data}
                                customStyles={customStyles}
                                selectableRows
                                fixedHeader
                                pagination
                            />
                        </div>
                    </div>

                </Tab>
                <Tab eventKey="Add" title="Add">
                    <CustomerDetailsAdd />
                </Tab>
            </Tabs>
            </div>
            <div>
                <Modal
                    size="sm"
                    show={smShow}
                    onHide={() => setSmShow(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header >
                        <Modal.Title id="example-modal-sizes-title-sm">
                           Update Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form  style={{alignItems:'center'}}>
              <Col style={{alignItems:'center'}}>
               
                <Form.Group className="mb-3" controlId="formBasicname">
                  <TextField type="text" 
                  id="standard-basic" label="First Name" variant="standard" sx={{width: 300}}
                  value={newfirstname} onChange={(e)=> setNewfirstname(e.target.value)}
                  placeholder="Enter first name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicphone">
                  <TextField type="text"
                  id="standard-basic" label="Last Name" variant="standard" sx={{width: 300}}
                  value={newlastname} onChange={(e)=> setNewlastname(e.target.value)}
                  placeholder="Enter last name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicphone">
                  <TextField type="email" 
                  id="standard-basic" label="Email" variant="standard" sx={{width: 300}}
                value={newemail} onChange={(e)=> setNewemail(e.target.value)}
                  placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicid">
                  <TextField type="text"
                  id="standard-basic" label="Phone Number" variant="standard" sx={{width: 300}}  
                  value={newmobile} onChange={(e)=> setNewmobile(e.target.value)}           
                  placeholder="Enter mobile" />
                </Form.Group>
                </Col>
                {

(sst === 1)

  ? <p style={{ color: 'green' }}>Update Successful</p>

  : <p style={{ color: 'red' }}></p>

}
            </Form>
            <span >
            <Button variant="outlined" color="error"  style={{ marginLeft: "40px" }} onClick={handleClose}>
              Close
            </Button>{" "}
            <Button variant="outlined" onClick={(e)=> saveUpdatedData(e)}>
              Save
            </Button>
            </span>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default CustomerDetailsView