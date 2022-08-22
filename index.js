const express = require('express')
const moment = require('moment')
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
        let classes = classDays(data.daysOfWeek, data.semester, data.year)
        res.status(200).json(classes)
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

   if(data.daysOfWeek.length === 0 || data.daysOfWeek.length > 5 || verifyDaysOfWeek(data.daysOfWeek)){
    return errorFactory(true, 'Days of week is invalid')
   }
    
    return errorFactory()
}

function verifyDaysOfWeek(days){
    for (let i = 1; i < 6; i++) {
        if(days[i] < 1 || days[i] > 5){
            return true
        }
    }
    return false
}

function errorFactory(status = false, message = ''){

    return { status, message }
}

function classDays(daysOfWeek, semester, year){

    let startSemester = ''
    let endSemester = ''
    let classes = []

    if(semester == 1){
        startSemester = `${year}-02-01`
        endSemester = `${year}-06-30`

        classes = fillArray(startSemester, endSemester, daysOfWeek)
    }
    else {
        startSemester = `${year}-08-01`
        endSemester = `${year}-11-30`

        classes = fillArray(startSemester, endSemester, daysOfWeek)
        }

        classes.forEach(e => {
            console.log(`data: ${e}`)
            
        })
    
        return classes
}

function fillArray(startSemester, endSemester, daysOfWeek){
    let startDate = moment(startSemester)
    let endDate = moment(endSemester)
    let dtFormat = 'DD/MM'
    let classes = []
    let startingMoment = startDate

    while(startingMoment <= endDate){
        let dayOfWeek = startingMoment.day()
        daysOfWeek.forEach(e => {
            if(e === dayOfWeek){
                classes.push(startingMoment.clone().format(dtFormat))
            }
        })
        startingMoment.add(1, 'days')
    }

    return classes
}

server.listen(port, () => {
    console.log(`server listening port ${port}`)
    
})