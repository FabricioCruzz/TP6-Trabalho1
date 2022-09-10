const service = require('../service/schedule.service')
const moment = require('moment')


const getAll = (_req, res) => {
    res.send(service.getAll())
}

const create = (req, res) => {
    const data = req.body

    const response = validateData(data)

    if(response.status) {
        res.status(404).send(`Error: ${response.message}`)
    }
    else {
        let schedule = classDays(data.daysOfWeek, data.semester, data.year)
        service.create(schedule)
        res.status(200).send(service.getAll())
    }

}

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
    let schedule = []

    if(semester == 1){
        startSemester = `${year}-02-01`
        endSemester = `${year}-06-30`

        schedule = fillArray(startSemester, endSemester, daysOfWeek)
    }
    else {
        startSemester = `${year}-08-01`
        endSemester = `${year}-11-30`

        schedule = fillArray(startSemester, endSemester, daysOfWeek)
        }

        schedule.forEach(e => {
            console.log(`data: ${e}`)
            
        })
    
        return schedule
}

function fillArray(startSemester, endSemester, daysOfWeek){
    let startDate = moment(startSemester)
    let endDate = moment(endSemester)
    let dtFormat = 'DD/MM'
    let schedule = []
    let startingMoment = startDate

    while(startingMoment <= endDate){
        let dayOfWeek = startingMoment.day()
        daysOfWeek.forEach(e => {
            if(e === dayOfWeek){
                schedule.push(startingMoment.clone().format(dtFormat))
            }
        })
        startingMoment.add(1, 'days')
    }

    return schedule
}

module.exports = {
    getAll,
    create
}