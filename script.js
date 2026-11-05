
const products = [
    { id: 1, name: 'ip18promax', price: 10000000, img: 'img/ip18promax.jpg' },
    { id: 2, name: 'VIVO Smartphone', price: 3000000, img: 'img/VIVO Smartphone.png' },
    { id: 3, name: 'oppo', price: 2000000, img: 'img/oppo.jpg' },
    { id: 4, name: 'xiaomi', price: 4000000, img: 'img/xiaomi.png' },
    { id: 5, name: 'poco', price: 5000000, img: 'img/poco.jpeg' },
    { id: 6, name: 'redmi', price: 70000000, img: 'img/redmi.png' }
];

let cart = [];

// Menampilkan produk
function displayProducts() {
    const productsContainer = document.getElementById('product');

    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');

        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price.toLocaleString('id-ID')}</p>
            <button onclick="addToCart(${product.id})">
                Tambah Keranjang
            </button>
        `;

        productsContainer.appendChild(productDiv);
    });
}

// Menambah produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// Memperbarui keranjang
function updateCart() {
    const cartItemContainer = document.getElementById('cart-items');

    cartItemContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');

        listItem.textContent =
            `${item.name} x ${item.quantity} - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`;

        cartItemContainer.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent =
        totalPrice.toLocaleString('id-ID');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong!');
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const paymentInput = prompt(
        `Total belanja Rp ${total.toLocaleString('id-ID')}. Masukkan pembayaran:`
    );

    if (paymentInput === null || paymentInput.trim() === '') {
        alert('Pembayaran dibatalkan!');
        return;
    }

    const payment = Number(paymentInput);

    if (!Number.isFinite(payment) || payment < total) {
        alert('Uang Anda tidak mencukupi!');
        return;
    }

    const change = payment - total;

    alert(
        `PEMBAYARAN BERHASIL!\nTotal: Rp ${total.toLocaleString('id-ID')}\nPembayaran: Rp ${payment.toLocaleString('id-ID')}\nKembalian: Rp ${change.toLocaleString('id-ID')}`
    );

    cart = [];
    updateCart();
}

// Tombol checkout
document.getElementById('checkout-btn')
    .addEventListener('click', checkout);

// Jalankan produk
displayProducts();
updateCart();
