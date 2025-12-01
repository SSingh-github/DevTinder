const adminAuth = (req, res, next) => {
    let tokenIsValid = false;
    console.log("inside the middleware")
    if (tokenIsValid) {
        next();
        console.log("authorized admin")
    } else {
        console.log("not authorized admin")
        res.status(401).send("unauthorized");
    }
}


module.exports = {
    adminAuth
}