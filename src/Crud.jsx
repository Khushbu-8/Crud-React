import React, { useEffect, useState } from 'react'
import './style.css'
// delet
import { RiDeleteBin5Fill } from "react-icons/ri";
//edit
import { LuFileEdit } from "react-icons/lu";


const Crud = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const data = JSON.parse(localStorage.getItem("user"))? JSON.parse(localStorage.getItem("user")) : [];
    const [record, setRecord] = useState(data);
    const [single, setSingle] = useState("");
    const [editid, setEditId] = useState("");
    const [mdelet, setMdelet] = useState([]);
    const [mstatus, setMstatus] = useState([]);


    const hendleSubmit = (e) => {
        e.preventDefault();
        let obj = {
            id: Date.now(),
            name, phone,
            status: "Deactive"
        }
        if (!name || !phone) {
            alert("Please fill all the fields");
            return false;
        }

        if (editid) {
            let newRecord = [...record];
            let UpD = newRecord.map((val) => {
                if (val.id === editid) {
                    return {
                        ...val,
                        name: name,
                        phone: phone
                    }
                }
                return val;
            })

            localStorage.setItem("user", JSON.stringify(UpD))
            setRecord(UpD)
            setEditId("");
            setSingle("");
            alert("Updated...")

        } else {
            let allR = [...record, obj];
            localStorage.setItem("user", JSON.stringify(allR))
            setRecord(allR)
            alert("New Added...")
        }
        setName("");
        setPhone("");
    }




    const hendelStatus = (id, status) => {
        if (status === "Deactive") {
            let upStatus = record.map((val) => {
                if (val.id === id) {
                    return { ...val, status: "Active" }
                }
                return val;
            })
            localStorage.setItem("user", JSON.stringify(upStatus))
            setRecord(upStatus)
            alert("Update Status...")
        } else {
            let upStatus = record.map((val) => {
                if (val.id === id) {
                    return { ...val, status: "Deactive" }
                }
                return val;
            })
            localStorage.setItem("user", JSON.stringify(upStatus))
            setRecord(upStatus)
            alert("Update Status...")
        }
    }
    const deleteData = (id) => {
        let Del = record.filter(Val => Val.id !== id)
        localStorage.setItem("user", JSON.stringify(Del));
        setRecord(Del)
        alert("Delete...");
    }
    const editeData = (id) => {
        let edite = record.find(val => val.id === id);
        setEditId(edite.id);
        setSingle(edite);
    }
    useEffect(() => {
        setName(single.name);
        setPhone(single.phone);
    }, [single]);

    // MultipleDelete

    const ChackDelet = (id, checked) => {
        let MDelet = [...mdelet];
        if (checked) {
            MDelet.push(id)
        } else {
            MDelet = MDelet.filter(val => val !== id)
        }
        setMdelet(MDelet);

    }
    const AllDelet = () => {
        if (mdelet.length > 0) {
            let Del = record.filter(Val => !mdelet.includes(Val.id))
            localStorage.setItem("user", JSON.stringify(Del));
            setRecord(Del)
            setMdelet([])
            alert("All Delete...");

        } else {
            alert("Select at least one record to delete")
            return false;
        }

    }

    // MultipleChangeStatus

    const chackStatus = (id, checked) => {
        let MStatus = [...mstatus];
        if (checked) {
            MStatus.push(id)
        } else {
            MStatus  = MStatus.filter(val => val !== id);

        }
        setMstatus(MStatus)
    }

    const MulEditStatus = () => {
        let MultipleStatus = record.map((val) =>{
            if(mstatus.includes(val.id)){
                if(val.status==="Active"){
                    val.status="Deactive"
                }else{
                    val.status="Active";
                }
            }
            return val;
        })
        localStorage.setItem("user",JSON.stringify(MultipleStatus));
        setRecord(MultipleStatus);
        setMstatus([]);

    }

    return (
        <>
            <div align="center" className='box p-5 fs-5 shadow' >
                <h1>CRUD APP</h1>
                <form className="mt-3 p-5 rounded shadow" onSubmit={hendleSubmit} >
                    <label htmlFor="">Name :</label>
                    <input className='ms-2 rounded' type="text" onChange={(e) => setName(e.target.value)} value={name || " "} /><br></br><br></br>
                    <label htmlFor="">Phone :</label>
                    <input className='ms-2 rounded' type="text" onChange={(e) => setPhone(e.target.value)} value={phone || " "} /><br></br><br></br>
                    {
                        editid ? (<input className='s-btn py-1 px-3'  type="submit" value="Edit" />) : (<input className='s-btn py-1 px-3'  type="submit" value= "Add"/>)
                    }
                </form>
                <br></br>
               <div className="data" >
                <table class="table text-center table-border">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                            <th scope="col">
                            <button onClick={() => AllDelet()}>All Delete</button>
                            </th>
                            <th scope="col">
                            <button onClick={() => MulEditStatus()}>Edit Status</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                  {
                    record.map((item) =>{
                        const{id,name,phone,status} = item;
                         return (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>{name}</td>
                                        <td>{phone}</td>
                                        <td>
                                            {
                                                status ? (<button style={{ color: 'red' }} onClick={() => hendelStatus(id, status)}>{status}</button>
                                                ) : (<button style={{ color: 'green' }} onClick={() => hendelStatus(id, status)}>{status}</button>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <button className='me-3 d-btn' onClick={() => deleteData(id)}>
                                                <span><RiDeleteBin5Fill /></span>
                                            </button>
                                            <button className='e-btn' onClick={() => editeData(id)}><LuFileEdit /></button>
                                        </td>
                                        <td>
                                            <input type="checkbox" checked={mdelet.includes(id)} onChange={(e) => ChackDelet(id, e.target.checked)} />
                                        </td>
                                        <td>
                                            <input type="checkbox" checked={mstatus.includes(id)}  onChange={(e) => chackStatus(id, e.target.checked)} />
                                        </td>

                                    </tr>
                                )
                    })
                  }
                    </tbody>
                </table>

               </div>
            </div>
        </>
    )
}

export default Crud

