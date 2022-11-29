import React from 'react';
import { useParams } from 'react-router-dom';

function Product() {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

export default Product;
