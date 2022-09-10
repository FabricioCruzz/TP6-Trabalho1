const express = require('express')
const app = express()
const PORT = 8087
const router = require('./router/schedule.router')

app.use(express.json())
app.use('/', router)

app.listen(PORT, () => console.log(`server listening port ${PORT}`))