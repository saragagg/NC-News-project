const app = require("./nc-news");

const { PORT = 9090 } = process.env;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})