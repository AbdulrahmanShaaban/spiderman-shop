let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function loadProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error("json file not found or have a problem");
        }
        const products = await response.json();

        displayProducts(products);


    } catch (error) {
        console.error('Error loading data', error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');

    container.innerHTML = '';

    products.forEach(product => {
        const productCards = `
        <div class ="items-card">
        <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="add-btn"
            onclick="addToCart(${product.id})">Add to Cart
            </div>
        </div>
        `;

        container.innerHTML += productCards
    })
}

function scrollBtn() {
    const scrollElements = document.querySelectorAll('.scroll-down, .start-shopping');

    scrollElements.forEach(el => {
        el.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    });
};



function addToCart(productID) {
    const existingItem = cart.find(item => item.id === productID);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productID, quantity: 1});
    }

    saveCart();

    updateCartIcon();

    alert("Added to cart successfully! 🕷️");
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartIcon() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalItems > 0) {
        cartCountElement.innerText = totalItems;
        cartCountElement.style.display = 'flex';
    } else {
        cartCountElement.style.display = 'none'; 
    }
}



scrollBtn();

loadProducts();