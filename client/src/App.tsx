import { useEffect, useState } from 'react';

interface Product {
  id: string;
  producto: string;
  precio: number;
  stock: number;
  categoria: string;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al traer los productos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
        <h3>Cargando inventario desde Neon...</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', color: '#333' }}>
      <h1 style={{ color: '#111', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Mi Inventario 
      </h1>
      
      {products.length === 0 ? (
        <p>No hay productos disponibles o el servidor está apagado.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#0070f3', color: 'white', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Producto</th>
              <th style={{ padding: '12px' }}>Categoría</th>
              <th style={{ padding: '12px' }}>Precio</th>
              <th style={{ padding: '12px' }}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={prod.id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9', borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{prod.producto}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ backgroundColor: '#e1ecf4', color: '#39739d', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                    {prod.categoria}
                  </span>
                </td>
                <td style={{ padding: '12px', color: '#2e7d32', fontWeight: 'bold' }}>
                  ${Number(prod.precio).toFixed(2)}
                </td>
                <td style={{ padding: '12px' }}>{prod.stock} u.</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}