import React, { useState } from 'react'

const Crud1 = () => {
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [record,setRecord] = useState([]);

    const hendelSubmit =(e) => {
      e.preventDefault();
     let obj ={
        id : Date.now(),
        name,phone,
     }
     let New = [...record,obj];
     setRecord(New);
     setName("")
     setPhone("")
     alert("Add..")

    }
  return (
  <>
  <div align="center">
    <h1>CRUD</h1>
    <form action="" onSubmit={hendelSubmit} >
        <label htmlFor="">Name :</label>
        <input type="text" onChange={ (e) => setName(e.target.value) } value={name} />
        <label htmlFor="">Phone :</label>
        <input type="text" onChange={ (e) => setPhone(e.target.value) } value={phone} />
        <input type="submit" />
    </form>
  </div>
  </>
  )
}

export default Crud1
