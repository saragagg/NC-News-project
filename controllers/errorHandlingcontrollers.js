


function handleCustomError (err, req, res, next) {
    console.log(err)
    if(err.statusMessage === "Not Found" && err.statusCode === 404) {
        res.status(404).send({msg: err.statusMessage})
    }
}


function handleError500 (err, req, res, next) {
    console.log(err)
    res.status(500).send({msg: "Sorry, there has been an internal server error!"})
}

module.exports = {handleError500, handleCustomError}