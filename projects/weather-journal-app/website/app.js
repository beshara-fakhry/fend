/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const baseURL='http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey='&APPID=26b4b3725425d3561f3fa5678b269ca7&units=imperial';
const generate=document.getElementById('generate');

generate.addEventListener('click',make);

function make(e){
 const zip=document.getElementById('zip').value;
 const userFeeling=document.getElementById('feelings').value;

 getWeatherData(baseURL,zip,apiKey)

 .then(function(data){
     postData('/add',{temperature:data.main.temp,date:newDate,userFeeling:userFeeling});
     updateUI();
 });
};

const getWeatherData=async (baseURL,zip,apiKey)=>{
 const response=await fetch(baseURL+zip+apiKey);
 try{
  const data=await response.json();
  return data;
 }
 catch(error){console. log('error',error);}
};

const postData=async (url='',data={})=>{
 const response=await fetch(url,{
  method:'POST',
  credentials:'same-origin',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(data),
 });
 try{
  const newData=response.json();
  return newData;
 }
 catch(error){console.log('error',error);}
};

const updateUI=async ()=>{
 const request=await fetch('/all');
 try{
  const allData=await request.json();
  document.getElementById('date').innerHTML=allData.date;
  document.getElementById('temp').innerHTML=allData.temperature;
  document.getElementById('content').innerHTML=allData.userFeeling;
 }
 catch(error){console.log('error',error);}
};
