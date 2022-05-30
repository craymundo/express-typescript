export default {
  jwtSecret: process.env.JWT_SECRET || 'secretToken',
  DB: {
    URI: process.env.MONGO_DB_URI || 'mongodb+srv://quiz:eiSHZ89YT3oMgQlG@cluster0.16khmqj.mongodb.net/?retryWrites=true&w=majority',
    USER: process.env.MONGO_USER || '',
    PASSWORD: process.env.MONGO_PASSWORD || ''
  }
};