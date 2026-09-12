const express = require('express')
const cors = require('cors')
const mainRouter = require("./routes/index"); 
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', mainRouter)

app.listen(3000, ()=> console.log("Sever runing at port 3000"))