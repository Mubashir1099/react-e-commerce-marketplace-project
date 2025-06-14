// Define the base URL for your JSON Server.
const API_BASE_URL = 'http://localhost:5000';

/**
 * Fetches all products from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 * @throws {Error} If the network request fails or the server responds with an error status.
 */
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for ${response.url}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw error;
  }
};

/**
 * Fetches a single product by its ID from the API.
 * @param {string|number} id - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to a single product object.
 * @throws {Error} If the network request fails or the server responds with an error status.
 */
export const getProductById = async (id) => {
  const url = `${API_BASE_URL}/products/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Product with ID ${id} not found (404).`);
      }
      throw new Error(`HTTP error! status: ${response.status} for ${url}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in getProductById for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Adds a new product to the API.
 * @param {object} productData - The product object to add.
 * @returns {Promise<Object>} A promise that resolves to the newly added product object.
 * @throws {Error} If the network request fails.
 */
export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for POST ${response.url}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in addProduct:", error);
    throw error;
  }
};

/**
 * Updates an existing product in the API.
 * @param {string|number} id - The ID of the product to update.
 * @param {object} updatedData - The partial or full product object with updated values.
 * @returns {Promise<Object>} A promise that resolves to the updated product object.
 * @throws {Error} If the network request fails.
 */
export const updateProduct = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT', // Use PUT for full replacement or PATCH for partial
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for PUT ${response.url}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in updateProduct for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a product from the API.
 * @param {string|number} id - The ID of the product to delete.
 * @returns {Promise<void>} A promise that resolves when the product is deleted.
 * @throws {Error} If the network request fails.
 */
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for DELETE ${response.url}`);
    }
    // No content expected for a successful DELETE, so no response.json()
  } catch (error) {
    console.error(`Error in deleteProduct for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Adds a new review to a specific product.
 * This fetches the product, updates its reviews array, and saves it back.
 * @param {string|number} productId - The ID of the product to add the review to.
 * @param {object} reviewData - The review object containing userId, rating, comment, and date.
 * @returns {Promise<Object>} A promise that resolves to the updated product object.
 * @throws {Error} If the network request fails or product is not found.
 */
export const addReviewToProduct = async (productId, reviewData) => {
  try {
    const product = await getProductById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found for review.`);
    }

    // Ensure reviews array exists
    if (!product.reviews) {
      product.reviews = [];
    }

    // Check if the user has already reviewed this product to allow updating existing review
    const existingReviewIndex = product.reviews.findIndex(
      (review) => review.userId === reviewData.userId
    );

    if (existingReviewIndex !== -1) {
      // Update existing review
      product.reviews[existingReviewIndex] = {
        ...product.reviews[existingReviewIndex], // Preserve any other fields if they exist
        ...reviewData,
        date: new Date().toISOString().slice(0, 10) // Update date to current date
      };
    } else {
      // Add new review
      product.reviews.push({
        ...reviewData,
        date: new Date().toISOString().slice(0, 10) // Set current date for new review
      });
    }

    const updatedProduct = await updateProduct(productId, product);
    return updatedProduct;
  } catch (error) {
    console.error(`Error in addReviewToProduct for product ID ${productId}:`, error);
    throw error;
  }
};

/**
 * Fetches all orders from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of order objects.
 * @throws {Error} If the network request fails or the server responds with an error status.
 */
export const getOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for ${response.url}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getOrders:", error);
    throw error;
  }
};

/**
 * Adds a new order to the API.
 * @param {object} orderData - The order object to add.
 * @returns {Promise<Object>} A promise that resolves to the newly added order object.
 * @throws {Error} If the network request fails.
 */
export const addOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for POST ${response.url}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in addOrder:", error);
    throw error;
  }
};
