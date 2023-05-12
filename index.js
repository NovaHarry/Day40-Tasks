// import express from "express";

const express = require("express");

// Initializing express server

const app = express();

const data = [{
    "id": "1",
    "numberOfSeats":100,
    "amenities":["ac","chairs","dicso"],
    "price":5000,
    "ifBooked": "true",
    "customerName": "Nova",
    "date":"05-feb-2022",
    "startTime":"10-feb-2022 at 12pm",
    "endTime":"11-feb-2022 at 11am",
    "RoomeId": 201,
    "RoomName" :"Duplex"},
    {
        "id": "2",
    "numberOfSeats":100,
    "amenities":["ac","chairs","dicso"],
    "price":5000,
    "ifBooked": "false",
    "customerName": "",
    "date":"",
    "startTime":"",
    "endTime":"",
    "RoomeId": 202,
    "RoomName" :"Duplex"
    },
    {
        "id": "3",
    "numberOfSeats":100,
    "amenities":["ac","chairs","dicso"],
    "price":5000,
    "ifBooked": "true",
    "customerName": "",
    "date":"",
    "startTime":"",
    "endTime":"",
    "RoomeId": 203,
    "RoomName" :"Duplex"
    }
]


//using query

app.get("/hall/details", (req,res)=>{
    if(req.query){
        const {ifBooked} =  req.query;
        console.log(ifBooked);
        let filteredHall = data;
        if(ifBooked == true){
            filteredHall = filteredHall.filter(halls=>halls.ifBooked === ifBooked)
        }
        res.send(filteredHall)
    }
    else{
        res.send(data);
    }
})

//using params

app.get("/hall/details/:id",(req,res)=>{
    const {id} = req.params;
    const specificHall = data.find(hall=> hall.id === id);
    res.send(specificHall)
})

// MiddleWare specifying to accept JSON type data
app.use(express.json());

// new hall

app.post("/hall/details/",(req,res)=>{
    const newHall = {
    "id": data.length +1,
    "numberOfSeats":req.body.numberOfSeats,
    "amenities":req.body.amenities,
    "price":req.body.price,
    "ifBooked":req.body.ifBooked,
    "customerName":req.body.customerName,
    "date":req.body.date,
    "startTime":req.body.startTime,
    "endTime":req.body.endTime,
    "RoomName" :req.body.RoomName
    }

    data.push(newHall);
    res.send(data);
    
})

app.put("/hall/details/:id",(req,res)=>{
    const {id} = req.params;
    const halls = data.find(hall=> hall.id === id);

    if(halls.ifBooked === 'true'){
       return res.status(400).send("Hall is already booked")
    }
  
    
    halls.date = req.body.date;
    halls.startTime = req.body.startTime;
    halls.endTime = req.body.endTime;
    customerName = req.body.customerName;
    halls.ifBooked = "true";
    res.status(200).send(data);
})



app.listen(2000, ()=>{
    console.log("server started in localhost: 2000")
})
