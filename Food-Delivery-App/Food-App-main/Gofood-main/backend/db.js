const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/gofood'
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
}
module.exports = function (callback) {
  mongoose.connect(mongoURI, connectionOptions)
    .then(async () => {
      console.log('Connected to MongoDB successfully')
      
      try {
        const foodCollection = mongoose.connection.db.collection("food_items")
        const categoryCollection = mongoose.connection.db.collection("Categories")
        
        const [foodData, categoryData] = await Promise.all([
          foodCollection.find({}).toArray(),
          categoryCollection.find({}).toArray()
        ])
        
        callback(null, foodData, categoryData)
      } catch (err) {
        console.error('Error fetching collections:', err)
        callback(err, null, null)
      }
    })
    .catch(err => {
      console.error('MongoDB connection error:', err)
      callback(err, null, null)
    })
}
