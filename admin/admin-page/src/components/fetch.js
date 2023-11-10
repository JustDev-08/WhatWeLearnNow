import axios from 'axios'
const apiuri = import.meta.env.VITE_API

export const handleRemove = async(id)=>
    await axios.delete(apiuri + '/admin/delete:'+id)
export const load = async()=>{
    return await axios.get(apiuri+'/admin/getall')
}
export const create = async(form)=>{
    await axios.post(apiuri + "/admin/create",form)
}
export const read = async(id)=>{
    return await axios.get(apiuri+'/admin/get'+id)
}
export const update = async(id,form)=>{
    return await axios.post(apiuri + "/admin/update"+id,form)
}