module.exports = ({
    secrets: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly:true,
        secure:true,
    }
})