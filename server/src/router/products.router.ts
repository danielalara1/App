import express from 'express';
import type { Request, Response } from 'express';
import { sql } from '../../lib/db.ts';

const router = express.Router();

router.get('/products', async (req: Request, res: Response) => {
  try {
    const data = await sql`
      SELECT 
        p.id,
        p.name AS producto, 
        p.price AS precio, 
        p.stock, 
        c.name AS categoria
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
      ORDER BY p.price DESC;
    `;
    
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al conectar con la base de datos de Neon' });
  }
});

router.post('/products', async (req: Request, res: Response) => {
  const { name, price, stock, category_id } = req.body;
 if (!name || !price || !category_id) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: name, price o category_id' });
  }

  try {
   const result = await sql`
      INSERT INTO products (name, price, stock, category_id)
      VALUES (${name}, ${price}, ${stock || 0}, ${category_id})
      RETURNING *;
    `;

    res.status(201).json({
      message: 'Producto creado con éxito',
      product: result[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al insertar el producto en la base de datos' });
  }
});

export default router;