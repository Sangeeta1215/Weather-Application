import React,{useState,useEffect} from 'react'
import axios from "axios"
import DotLoader from "react-spinners/DotLoader";

export default function Weatherapp() {
const [city,setcity]=useState("");
const [Apidata,setApidata]=useState(null);
const [loadData,setloadData]=useState(true);
  var url="https://api.openweathermap.org/data/2.5/weather?";
  var appid="0518600400a7c09fc0275e93afb2230f";
    useEffect(()=>{
    const Weatherdata=axios.get(`${url}q=${city}&appid=${appid}&units=metric`);   
    console.log(Weatherdata)
  
    Weatherdata.then(data=>{setApidata(data)
      setloadData(false)
    }).catch(err=>{setApidata(null) 
      setloadData(false)});
  },[city]);

  function cityName()
  {   
  const inputCity=document.querySelector(".inputCity");
    setcity(inputCity.value);    
  }
  return(
    <>
    <div className="container">
      
      <div className="row my-5">
        <div className="col-md-4 m-auto border text-center mt-4">
      <p className="mt-4 display-6 "><b> Weather App</b></p> 
        <input className="form-control inputCity" type="text" placeholder="Enter city name here" aria-label="default input example"/>
       
         <button type="button" className="btn btn-success w-50 mt-2"  onClick={cityName}>Search</button>              
         {
        loadData?<DotLoader
        color="blue"
        loading={loadData}
        // cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />  : Apidata? 
          <>
           <div className="name mt-4">    
           City Name-{Apidata && Apidata.data.name}
           </div>
           <div className="wind-speed">
           Wind-Speed-{Apidata && Apidata.data.wind.speed}
           </div>
           <div className="temp">
           Temperature-{Apidata && Apidata.data.main.temp}
           </div>
           <div className="humidity mb-4">
           Humidity-{Apidata && Apidata.data.main.humidity}
           </div>
           </> 
  :city?<p className="mt-4">city name is not valid</p>:""} 
        </div>
      </div>
    </div>
    </>
  )
}
