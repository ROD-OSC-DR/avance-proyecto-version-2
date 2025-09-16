// Funcionalidad para el carrito de compras
let cart = [];
let cartCount = 0;

// Actualizar contador del carrito
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cartCount;
}

// Añadir producto al carrito
function addToCart() {
    const productTitle = document.getElementById('modalProductTitle').textContent;
    const productPrice = parseFloat(document.getElementById('modalProductPrice').textContent.replace('S/ ', ''));
    const quantity = parseInt(document.getElementById('quantityInput').value);
    const color = document.getElementById('colorSelect').value;
    
    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => 
        item.title === productTitle && item.color === color
    );
    
    if (existingProductIndex !== -1) {
        // Actualizar cantidad si ya existe
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Añadir nuevo producto al carrito
        cart.push({
            title: productTitle,
            price: productPrice,
            quantity: quantity,
            color: color
        });
    }
    
    cartCount += quantity;
    updateCartCount();
    
    // Cerrar modal
    const productModal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    productModal.hide();
    
    // Mostrar notificación
    alert(`¡${productTitle} añadido al carrito!`);
}

// Mostrar productos en el carrito
function showCartItems() {
    const cartItemsElement = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const checkoutTotalElement = document.getElementById('checkoutTotal');
    
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p class="text-center">Tu carrito está vacío</p>';
        cartTotalElement.textContent = 'S/ 0.00';
        checkoutTotalElement.textContent = 'S/ 0.00';
        return;
    }
    
    let total = 0;
    let itemsHTML = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemsHTML += `
            <div class="cart-item d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h6>${item.title}</h6>
                    <small class="text-muted">Color: ${item.color} | Cantidad: ${item.quantity}</small>
                </div>
                <div>
                    <span class="me-3">S/ ${itemTotal.toFixed(2)}</span>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartItemsElement.innerHTML = itemsHTML;
    cartTotalElement.textContent = `S/ ${total.toFixed(2)}`;
    checkoutTotalElement.textContent = `S/ ${total.toFixed(2)}`;
}

// Eliminar producto del carrito
function removeFromCart(index) {
    cartCount -= cart[index].quantity;
    cart.splice(index, 1);
    updateCartCount();
    showCartItems();
}

// Procesar pago
function processPayment() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Añade productos antes de pagar.');
        return;
    }
    
    // Aquí iría la lógica real de procesamiento de pago
    alert('¡Pago procesado con éxito! Gracias por tu compra.');
    
    // Vaciar carrito después del pago
    cart = [];
    cartCount = 0;
    updateCartCount();
    
    // Cerrar modal
    const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    checkoutModal.hide();
}

// Configurar modal de producto
const productModal = document.getElementById('productModal');
productModal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const productName = button.getAttribute('data-product');
    const productPrice = button.getAttribute('data-price');
    const productImg = button.getAttribute('data-img');
    
    const modalTitle = productModal.querySelector('.modal-title');
    const modalProductTitle = productModal.querySelector('#modalProductTitle');
    const modalProductPrice = productModal.querySelector('#modalProductPrice');
    const modalProductImage = productModal.querySelector('#modalProductImage');
    
    // Establecer información del producto
    modalTitle.textContent = `Detalles: ${productName}`;
    modalProductTitle.textContent = productName;
    modalProductPrice.textContent = `S/ ${productPrice}`;
    modalProductImage.src = productImg;
    
    // Descripción según producto
    if (productName === 'Cartera Elegance') {
        modalProductDescription.textContent = 'Hermosa cartera elegance con diseño moderno y múltiples compartimentos.';
    } else if (productName === 'Bolso Classic') {
        modalProductDescription.textContent = 'Bolso clásico ideal para el día a día, con correa ajustable y material resistente.';
    } else if (productName === 'Evening Shine') {
        modalProductDescription.textContent = 'Cartera de noche con detalles brillantes, perfecta para ocasiones especiales.';
    }
});

// Configurar modal del carrito
const cartModal = document.getElementById('cartModal');
cartModal.addEventListener('show.bs.modal', function () {
    showCartItems();
});

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});