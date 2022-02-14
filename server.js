const express = require('express');
const cors = require('cors');
const app = express();

const db = require("./app/models");
db.sequelize.sync();

const corsOptions = {
    origin: 'https://localhost:8081'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({msg: "Welcome to bongani's app."})
});

require("./app/routes/tutorial.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});