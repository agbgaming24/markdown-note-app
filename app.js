import 'dotenv/config'
import express from 'express'
import noteRoutes from './routes/noteRoutes.js'
import cors from 'cors'

const app=express();
const port=process.env.PORT;

app.use(cors())
app.use(express.json())
app.use('/',noteRoutes);


app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})