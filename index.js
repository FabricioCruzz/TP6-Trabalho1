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
        let aulas = classDays(data.daysOfWeek, data.semester, data.year)
        res.status(200).json(aulas)
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

function classDays(day, semester, year){

    // console.log(`${day}/${semester}/${year}`)
    let aulas = []

    if(semester === 1){
        let data_inicio = `${year}-02-01`
        let data_fim = `${year}-06-30`
        let dtFormat = 'DD/MM'

        let data = moment(`${data_inicio}`).day(day[0])
        
        if(data.isBefore(data_inicio, 'month')){
            data = moment(data).add(7, 'days')
        }
        aulas.push(data.format(dtFormat))           

        while(true){

            data = moment(data).add(7, 'days')
            aulas.push(data.format(dtFormat))
            
            let diff_days = diffDays(data_fim, data)
            if(diff_days <= 7){
                break
            }
        }
    }
    else {
        let data_inicio = `${year}-08-01`
        let data_fim = `${year}-11-30`
        let dtFormat = 'DD/MM'

        let data = moment(`${data_inicio}`).day(day[0])
        
        if(data.isBefore(data_inicio, 'month')){
            data = moment(data).add(7, 'days')
        }
        aulas.push(data.format(dtFormat))           

        while(true){
            
            data = moment(data).add(7, 'days')
            aulas.push(data.format(dtFormat))
            
            let diff_days = diffDays(data_fim, data)
            if(diff_days <= 7){
                break
            }
        }
    }
    
    aulas.forEach(e => {
        console.log(`data: ${e}`)
        
    })

    return aulas
    

}

function diffDays(dataFim, dataInicio){
    let diff = moment(dataFim, 'YYYY/MM/DD').diff(moment(dataInicio, 'YYYY/MM/DD'))
    return moment.duration(diff).asDays()
}

server.listen(port, () => {
    console.log(`server listening port ${port}`)
    
})