const mongoose = require('mongoose')

module.exports = () => {
  
  mongoose.connect("mongodb+srv://viren_dB:neog.camp@cluster0.xzxbp.mongodb.net/ecom?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log("DataBase Connected successful"))
    .catch(error => console.log("Error while connecting DataBase", error))

}

// module.exports = { initializationDBConnection }