const express = require('express')
const server = express()
const port = 8087

server.use(express.json())

server.post('/api/v1/classes', (req, res) => {
    const data = req.body
    
    const response = validateData(data)

    if(response.status) {
        res.status(404).send(`Error: ${response.message}`)
    }
    else {
        res.status(200).json(data)
    }
})

function validateData(data){
    
    if(!data.year || !data.semester || !data.daysOfWeek){
        return errorFactory(true, 'Invalid data') 
    }

   if(Number(data.year).toString().length != 4){ 
    return errorFactory(true, 'Year invalid')
   }

   if(data.semester != "1" && data.semester != "2"){  
    return errorFactory(true, 'Semester invalid')
   }

   if(data.daysOfWeek.length === 0 || data.daysOfWeek.length > 5){
    return errorFactory(true, 'Days of week is invalid')
   }
    
    return errorFactory()
}

function errorFactory(status = false, message = ''){

    return { status, message }
}

server.listen(port, () => {
    console.log(`server listening port ${port}`)
    
})