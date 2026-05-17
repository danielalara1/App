import express from 'express';
import cors from 'cors';
import productsRouter from './router/products.router.ts';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', productsRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});