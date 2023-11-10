import React,{useState,useEffect} from 'react'
import axios from 'axios'
const apiuri = import.meta.env.VITE_API
import { handleRemove, load, create} from './fetch'
import {Link} from 'react-router-dom'

function FectchData() {
  const [data, setData] = useState(null)
  const [form, setForm] = useState({})
  useEffect(()=>{
    loadData()
  },[])

  const Remove = async (id)=>{
    console.log(id)
    handleRemove(id)
    .then(res=>{
      console.log(res)
      loadData()
    })
    .catch(e=>console.log(e))
  }
  const Items = ({item}) =>{

    return(
      <div>
        <h3>{item.day}</h3>
        <ul>
          <li>{item.title}</li>
          <li>{item.timeOpen.toFixed(2)}-{item.timeClose.toFixed(2)}</li>
          <li>{item.dis}</li>
          <li><img style={{width:"50px",height:"50px"}} src={item.img} alt="" /></li>
          <li><button onClick={e=>Remove(item._id)}>Remove</button></li>
          <li><Link to={'/edit/:'+item._id}>Edit</Link></li>
        </ul>
      </div>
    )
  }
  const loadData = async () => {
      load()
      .then(res=>setData(res.data))
      .catch(err=>console.log(err))
  }
  const handleChange = (e)=>{
       
      setForm({
        ...form,
        [e.target.name] : e.target.value
      })
      console.log(form)
  }
  return (
    <div style={{display:'flex', flexDirection:"row" }}>
      <div >
        <ul> 
        <li> {data !== null ? data.map((e,i)=>(<Items item={e} key={i}/>)) : "Loading"} </li>
      </ul>
      </div>
      <div > 
      <form style={{display:'flex', flexDirection:"column"}}> 
        Day : <input type='text' name="day" onChange={e=>handleChange(e)}/>
        Title : <input type='text' name="title" onChange={e=>handleChange(e)} ></input>
        timeOpen : <input type="number" step="0.01" name="timeOpen" onChange={e=>handleChange(e)}></input>
        timeClose : <input type="number" step="0.01" name="timeClose" onChange={e=>handleChange(e)} ></input>
        dis : <input type='text' name="dis" onChange={e=>handleChange(e)}></input>
        img : <input type='text' name="img" onChange={e=>handleChange(e)}></input>
        <button onClick={async e =>  {
          create(form).then(res => console.log('success')).catch(err=>console.log(err))
        }}>Enter</button>
      </form>
      </div>
    </div>
  )
}

export default FectchData