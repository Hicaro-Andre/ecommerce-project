const mongoose = require ("mongoose")

async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@products.mq2swi8.mongodb.net/`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('✅ Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('❌ Falha na conexão com MongoDB:', error.message);
    process.exit(1); 
  }
}

module.exports = connectDB;