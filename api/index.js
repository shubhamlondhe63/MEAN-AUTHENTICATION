import express from "express";

const app = express();

app.use('/', (req, res) =>{
    return res.send("Hello , Welcome to Home");
});


app.listen(8800, () => {
  console.log("Port is running on 8800");
});
