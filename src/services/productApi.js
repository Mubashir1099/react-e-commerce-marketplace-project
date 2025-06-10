const API_BASE_URL = 'http://localhost:5000'; // JSON Server runs on port 5000 by default

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Add other CRUD operations if you plan to extend this for admin functionality
// export const createProduct = async (product) => { ... }
// export const updateProduct = async (id, product) => { ... }
// export const deleteProduct = async (id) => { ... }