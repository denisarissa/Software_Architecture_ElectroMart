import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css'; // core Swiper
import 'swiper/css/navigation'; // navigation module



const Carousel = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async (attempt = 1) => {
      try {
        const response = await axios.get('http://localhost:3001/get-product-recommendations');
        setProducts(response.data);
        setError(false);
      } catch (error) {
        // Exercise 4: retry endpoint on failure
        console.error(`Attempt ${attempt}: Error fetching products`, error);
        if (attempt < 3) {
          fetchProducts(attempt + 1);
        } else {
          setError(true);
        }
      }
    };

    fetchProducts();
  }, []);
  
  if (error || products.length === 0) return null; // Exercise 4: since the endpoint is unreliable, the recommended products is hidden if it fails.

  return (
    <div className="content-container">
      <h2>Recommended Products!</h2>

      {products.length === 0 ? (
        <p>Unable to get recommended products...</p>
      ) : (
        <Swiper modules={[Navigation]}
          navigation spaceBetween={50} slidesPerView={3}>
          {products.map((product) => (
            <SwiperSlide key={product.title}>
              <div className="product-image-container">
                <img src={product.imageUrl} alt={product.title} />
              </div>
              <h3>{product.title}</h3>
              <p>Price: ${Math.round(product.basePrice * (1 - product.discountRate) * product.taxRate)}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

    </div>
  );
};

export default Carousel;
