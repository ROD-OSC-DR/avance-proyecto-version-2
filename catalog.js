// Datos de productos para el catálogo
const products = [
    {
        id: 1,
        name: "Cartera Elegance Negra",
        price: 320.00,
        category: "elegance",
        image: "img/cartera 1.jpeg",
        description: "Elegante cartera negra con múltiples compartimentos y cierre de seguridad."
    },
    {
        id: 2,
        name: "Cartera Elegance Marrón",
        price: 320.00,
        category: "elegance",
        image: "img/cartera 2.jpeg",
        description: "Cartera marrón de cuero genuino con diseño clásico y moderno."
    },
    {
        id: 3,
        name: "Bolso Classic Negro",
        price: 280.00,
        category: "classic",
        image: "img/cartera 3.jpeg",
        description: "Bolso negro clásico con correa ajustable y amplio espacio interior."
    },
    {
        id: 4,
        name: "Bolso Classic Beige",
        price: 280.00,
        category: "classic",
        image: "img/cartera 3.jpeg",
        description: "Bolso beige ideal para el día a día, resistente y elegante."
    },
    {
        id: 5,
        name: "Evening Shine Dorado",
        price: 240.00,
        category: "evening",
        image: "img/cartera 4.jpeg",
        description: "Cartera de noche dorada con detalles brillantes para ocasiones especiales."
    },
    {
        id: 6,
        name: "Evening Shine Plateado",
        price: 240.00,
        category: "evening",
        image: "img/cartera 5.jpeg",
        description: "Elegante cartera plateada perfecta para eventos nocturnos."
    },
    {
        id: 7,
        name: "Cartera Elegance Roja",
        price: 320.00,
        category: "elegance",
        image: "img/cartera 1.jpg",
        description: "Cartera roja vibrante con diseño sofisticado y funcional."
    },
    {
        id: 8,
        name: "Bolso Classic Azul",
        price: 280.00,
        category: "classic",
        image: "img/cartera 2.jpg",
        description: "Bolso azul marino con detalles en contraste y múltiples bolsillos."
    },
    {
        id: 9,
        name: "Evening Shine Negro",
        price: 240.00,
        category: "evening",
        image: "img/cartera 3.jpg",
        description: "Cartera de noche negra con destellos sutiles y elegantes."
    }
];

// Cargar productos en el catálogo
function loadProducts(filter = 'all') {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card product-card h-100">
                    <div class="product-image">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">${product.name}</h3>
                        <p class="product-price">S/ ${product.price.toFixed(2)}</p>
                        <p class="card-text">${product.description}</p>
                    </div>
                    <div class="card-footer bg-transparent">
                        <button class="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target="#productModal" data-product="${product.name}" data-price="${product.price}" data-img="${product.image}">
                            Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        productGrid.innerHTML += productCard;
    });
}

// Filtrar productos
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Filtrar productos
            const filter = this.getAttribute('data-filter');
            loadProducts(filter);
        });
    });
}

// Buscar productos
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-text').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.parentElement.style.display = 'block';
            } else {
                card.parentElement.style.display = 'none';
            }
        });
    });
}

// Inicializar catálogo
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupFilters();
    setupSearch();
});