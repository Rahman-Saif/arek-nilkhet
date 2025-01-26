// use local storage as your db for now
const addToDb = (id) => {
  try {
    // console.log('Adding product with ID:', id);

    const existingCart = getDb();
    // console.log('Existing cart:', existingCart);

    let localCart = existingCart ? JSON.parse(existingCart) : {};
    // console.log('Parsed cart:', localCart);

    if (localCart[id]) {
      localCart[id] += 1;
    } else {
      localCart[id] = 1;
    }

    updateDb(localCart);
    // console.log('Updated cart:', localCart);
  } catch (error) {
    console.error('Error in addToDb:', error);
  }
};


const getDb = () => typeof window!==undefined && window.localStorage.getItem('local_cart');
const updateDb = (cart) => {
 typeof window!==undefined && window.localStorage.setItem('local_cart', JSON.stringify(cart));
};

const removeFromDb = (id) => {
  const exists = getDb();

  if (!exists) {
  } else {
    const local_cart = JSON.parse(exists);
    if (local_cart[id] === 1) {
      delete local_cart[id];
    } else {
      const newCount = local_cart[id] - 1;
      local_cart[id] = newCount;
    }

    updateDb(local_cart);
  }
};

const getStoredCart = () => {
  const exists = getDb();
  return exists ? JSON.parse(exists) : {};
};

const clearTheCart = () => {
 typeof window!==undefined && window.localStorage.removeItem('local_cart');
};


// for wishlist
const addToWishlist = (id: string | number) => {
  console.log('A. Adding to wishlist, id:', id);
  
  // Get current wishlist or initialize empty object
  const wishlistString =typeof window!==undefined && window.localStorage.getItem('local_wishlist');
  let local_wishlist = wishlistString ? JSON.parse(wishlistString) : {};
  console.log('B. Current stored wishlist:', local_wishlist);
  
  // Add or update item
  if (local_wishlist[id]) {
    local_wishlist[id] += 1;
  } else {
    local_wishlist[id] = 1;
  }
  
  console.log('C. Updated wishlist before storage:', local_wishlist);
  
  // Save to localStorage
  try {
   typeof window!==undefined && window.localStorage.setItem('local_wishlist', JSON.stringify(local_wishlist));
    console.log('D. Wishlist saved successfully');
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
  
  return local_wishlist;
};

const getStoredWishlist = () => {
  try {
    const wishlistString =typeof window!==undefined && window.localStorage.getItem('local_wishlist');
    console.log('E. Retrieved from localStorage:', wishlistString);
    return wishlistString ? JSON.parse(wishlistString) : {};
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return {};
  }
};

const updateWishlist = (wishlist: Record<string | number, number>) => {
  try {
   typeof window!==undefined && window.localStorage.setItem('local_wishlist', JSON.stringify(wishlist));
    console.log('F. Wishlist updated in storage:', wishlist);
  } catch (error) {
    console.error('Error updating localStorage:', error);
  }
};

const removeFromWishlist = (id: string | number) => {
  const local_wishlist = getStoredWishlist();
  
  if (local_wishlist[id]) {
    if (local_wishlist[id] === 1) {
      delete local_wishlist[id];
    } else {
      local_wishlist[id] -= 1;
    }
    updateWishlist(local_wishlist);
  }
  
  return local_wishlist;
};

const clearTheWishlist = () => {
 typeof window!==undefined && window.localStorage.removeItem('local_wishlist');
};

export {
  getDb,
  addToDb,
  removeFromDb,
  clearTheCart,
  getStoredCart,
  addToWishlist,
  removeFromWishlist,
  clearTheWishlist,
  getStoredWishlist,
};