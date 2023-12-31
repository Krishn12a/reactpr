import React from 'react'
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

function Mhome() {
    const[data,setData] = useState([])
    const navigate = useNavigate();
    useEffect( ()=>{
        axios.get('http://localhost:8888/mobiles')
        .then((res)=>setData(res.data))
        .catch((err)=>console.log(err));
    },[] )

    const handleDelete = (id)=>{
        const confirm = window.confirm("would you like to delete.?")
        if(confirm){
            axios.delete("http://localhost:8888/mobiles/"+id)
            .then((res)=>{
                navigate('/')
            }).catch((err)=>console.log(err))
        }
    }

    return (
        <div className='d-flex flex-column   bg-light '>
           <h1  style={{textAlign:'center'}}>List of Mobile's</h1>
           <div className='rounded bg-white border shadow p-4'>
           <div className='d-flex  justify-content-end'>
            <Link to ="tcreate" className='btn btn-success'>Add ++</Link>
           </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Price</th>
                        <th>Company</th>
                        <th>Details</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d,i)=> (
                        <tr key={i}>
                            <td>{d.id}</td>
                            <td>{d.pprice}</td>
                            <td>{d.cname}</td>
                            <td>{d.specifications}</td>
                            <td>
                            
                            <Link to ={`/mread/${d.id}`} className='btn tbn-sm btn-info'> Read</Link>  &nbsp;
                             <Link to ={`/mupdate/${d.id}`} className='btn tbn-sm btn-primary'>Edit</Link>  &nbsp;
                             <buttton onClick={()=>handleDelete(d.id)} className='btn tbn-sm btn-danger'> Delete</buttton>
                            </td>

                        </tr>

                        ))
                    }
                </tbody>
            </table>
           </div>
        </div>
    )
}

export default Mhome
