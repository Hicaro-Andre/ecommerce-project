import mongoose from 'mongoose';

async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@products.mq2swi8.mongodb.net/`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions
    );
    console.log('✅ Conectado ao MongoDB com sucesso!');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Falha na conexão com MongoDB:', error.message);
    } else {
      console.error('❌ Erro desconhecido:', error);
    }
    process.exit(1);
  }
}

export default connectDB; 