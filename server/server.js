let app = require("./src/app")
const connectDB = require("./src/config/database")
require("dotenv").config()

connectDB()

let port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})