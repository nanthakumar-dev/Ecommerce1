import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Search(){
    const[keyword,setKeyword]=useState('')
    const navigate=useNavigate()
    const location=useLocation()
    function submitHandler(e){
        if(!keyword){
            alert('please enter Search Item')
            return 
        }
        e.preventDefault()
        navigate(`/search/${keyword}`)


    }
    useEffect(()=>{
        if(location.pathname =='/'){
            setKeyword('')
        }
    },[location])
    return(
        <form onSubmit={submitHandler}>
            <div className="input-group">
                <input
                type="text"
                id="search_field"
                className="form-control"
                placeholder="Enter Product Name ..."
                onChange={e=>setKeyword(e.target.value)}
                value={keyword}
                />
                <div className="input-group-append">
                <button type="submit" id="search_btn" className="btn">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
                </div>
            </div>
        </form>
    )
}