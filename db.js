function dbConnect() {
    // Db connection
    const mongoose = require('mongoose')
    const url = 'mongodb://localhost/comments'

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const connection = mongoose.connection
    connection.once('open', function () {
        console.log('Database connected...')
    }).on('error', () => {
        console.log('Cannot connect to the database')
    })
}

module.exports = dbConnect