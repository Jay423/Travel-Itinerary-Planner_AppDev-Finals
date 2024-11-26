require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes'); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/routes', routes);

app.get("/", cors(), async (req, res) => { 
  res.send("working");
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
