require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer'); // Add multer for handling file uploads
const {
  handleRegisterUser,
  handleAuthenticateUser,
  handleRetrieveUser,
  handleUpdateUser,
  handleDeleteUser,
  handleCreateEvent,
  handleRetrieveEvent,
  handleRetrieveOwnerEvent,
  handleUpdateEvent,
  handleDeleteEvent,
  handleAddEventToUser,
  handleRetrieveTargetedEvent,
  handleDeleteTargetedEvent } = require('./handlers')
const { connect, disconnect } = require('mongoose')
const { cors } = require('./helpers')

  ; (async () => {

    // await connect(`mongodb+srv://diego_carver:${process.env.DB_PASSWORD}@cluster0.ypbuokm.mongodb.net/events-db`)
    await connect(`${process.env.DB_URL}`)//mongodb://127.0.0.1:27017

    console.log('DB connected')

    const api = express()

    api.use(cors)

    const jsonBodyParser = bodyParser.json()

    const routes = express.Router()//El router se refiere a cómo los endpoints de una la app (URI) responden a las solicitudes de los clients.

    api.get("/", (req, res) => {
      res.send("Express on Vercel")
    });

    const upload = multer({ dest: 'uploads/' })

    routes.post('/users', jsonBodyParser, handleRegisterUser)//registerUser
    routes.post('/users/auth', jsonBodyParser, handleAuthenticateUser)//authenticateUser
    routes.get('/users', handleRetrieveUser)//retrieveUser
    routes.patch('/users', jsonBodyParser, handleUpdateUser)//updateUser
    routes.delete('/users', jsonBodyParser, handleDeleteUser)//deleteUser
    routes.post('/users/:eventId', jsonBodyParser, handleAddEventToUser)//addEventToUser
    routes.get('/users/events', jsonBodyParser, handleRetrieveTargetedEvent)//RetrieveTargetedEvent
    routes.delete('/users/events/:eventId', jsonBodyParser, handleDeleteTargetedEvent)//deleteTargetedEvent

    routes.post('/events', upload.single('image'), jsonBodyParser, handleCreateEvent) //createEvent
    // routes.post('/events', jsonBodyParser, handleCreateEvent)//createEvent
    routes.get('/events', handleRetrieveEvent)//retrieveEvent
    routes.get('/events/owner', handleRetrieveOwnerEvent)//retrieveOwnerEvent
    routes.patch('/events/:eventId', jsonBodyParser, handleUpdateEvent)//updateEvent
    routes.delete('/events/:eventId', jsonBodyParser, handleDeleteEvent)//deleteEvent

    api.use('/api', routes)//ruta

    api.listen(process.env.PORT, () => console.log('API running'))//client

    process.on('SIGINT', async () => {//para frenar la ejecución 
      await disconnect()//desconectar

      console.log('\nDB disconnected')

      process.exit(0)//salir
    })
  })()

// module.exports = api

// No sabemos de mongo
// sabemos de logic y de cliente (insmonmia)