const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const jobsRouter = require("./routes/jobs");
const jobsStatusTimelinesRouter = require("./routes/jobs_status_timelines");


const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log("listing on port ", PORT);
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/jobs", jobsRouter);
app.use("/api/jobs_status_timelines", jobsStatusTimelinesRouter);


app.use((err, req, res, next) => {
  console.log(err);
  if (err.status) {
    res.status(err.status).json(err);
  } else {
    res.status(500).json(err);
  }
});
