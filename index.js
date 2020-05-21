const express = require('express');
const bodyParser = require('body-parser');

const tempJson = require('./tempJson');

const app = express();


app.use(bodyParser.json());


app.get('/api/employees',(req,res)=>{

    res.status(200).send(tempJson.employees)

})

app.get('/api/surveys',(req,res)=>{
    
    res.status(200).send(tempJson.surveys);

})


app.post('/api/updateEmployee',(req,res)=>{

    console.log("data received",req.body);
    res.status(200).send({status:1,message: 'Successfully updated employee'});

})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
