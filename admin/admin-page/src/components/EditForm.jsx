import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { read, update } from './fetch'
function EditForm() {
    const navigate = useNavigate()
    const params = useParams()
    const [data, setData] = useState({
        day:'',
        title:'',
        timeOpen:0,
        timeClose:0,
        dis:'',
        img:''
    })
    console.log(params.id)

    useEffect(()=>{
        loadData()
    },[])
    const loadData = async()=>{
        read(params.id)
        .then(res=>setData(res.data))
        .catch(e=>console.log(e))
        console.log(data)
    }

    const handleChange = (e)=>{
       
        setData({
          ...data,
          [e.target.name] : e.target.value
        })
        console.log(data)
    }
    const UpdateHandle = async(e)=>{
        e.preventDefault()
        console.log(data)
        update(params.id,data)
        .then(res=>{
            console.log(res)
            navigate('/')
        })
        .catch(e=>console.log(e))
    }
  return (
    <div>
        <form style={{display:'flex', flexDirection:"column"}}> 
        Day : <input value={data.day} type='text' name="day" onChange={e=>handleChange(e)}/>
        Title : <input value={data.title} type='text' name="title" onChange={e=>handleChange(e)} ></input>
        timeOpen : <input  value={data.timeOpen} type="number" step="0.01" name="timeOpen" onChange={e=>handleChange(e)}></input>
        timeClose : <input value={data.timeClose} type="number" step="0.01" name="timeClose" onChange={e=>handleChange(e)} ></input>
        dis : <input value={data.dis} type='text' name="dis" onChange={e=>handleChange(e)}></input>
        img : <input value={data.img} type='text' name="img" onChange={e=>handleChange(e)}></input>
        <button onClick={UpdateHandle}>Enter</button>
      </form>
    </div>
  )
}

export default EditForm