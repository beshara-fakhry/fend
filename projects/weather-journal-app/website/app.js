/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let baseURL='http://api.openweathermap.org/data/2.5/weather?q=';
let apiKey='&APPID=26b4b3725425d3561f3fa5678b269ca7';
const generate=document.getElementById('generate');

generate.addEventListener('click',make);

function make(e){
 const zip=document.getElementById('zip').value;
 const userFeeling=document.getElementById('feelings').value;

 getWeatherData(baseURL,zip,apiKey)

 .then(function(data){
     postData('/add',{temperature:data.temperature,date:data.date,userFeeling:userFeeling});
     updateUI();
 };)
};

const getWeatherData=async (baseURL,zip,apiKey){
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

const UpdateUI=async ()=>{
 const request=await fetch('/all');
 try{
  const allData=await request.json();
  document.getElementById('date').innerHTML=allData[0].date;
  document.getElementById('temp').innerHTML=allData[0].temperature;
  document.getElementById('content').innerHTML=allData[0].userFeeling;
 }
 catch(error){console.log('error',error);}
};
