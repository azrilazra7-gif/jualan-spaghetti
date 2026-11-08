// Data Produk Spageti
const products = [
    {
        id: 1,
        name: "spaghetti seruput",
        price: 35000,
        desc: "Spageti dengan saus daging sapi cincang kaya tomat segar dan rempah Italia.",
        image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Spaghetti Carbonara",
        price: 40000,
        desc: "Pasta creamy gurih dengan keju parmesan berkualitas dan potongan smoked beef.",
        image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Spaghetti Aglio Olio",
        price: 30000,
        desc: "Spageti pedas ringan dengan minyak zaitun, bawang putih, cabai kering, dan potongan sosis.",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80"
    }
];

let cart = [];

// Menampilkan produk ke halaman HTML
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        productList.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.desc}</p>
                    <div class="price-action">
                        <span class="price">Rp ${product.price.toLocaleString('id-ID')}</span>
                        <button class="btn-add" onclick="addToCart(${product.id})">+ Keranjang</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Menambahkan produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    alert(`${product.name} berhasil ditambahkan ke keranjang!`);
}

// Memperbarui tampilan keranjang dan jumlah badge
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    let totalCount = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Keranjang masih kosong.</p>';
    } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            totalCount += item.quantity;
            totalPrice += item.price * item.quantity;

            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div>
                        <h4>${item.name}</h4>
                        <p>Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background:#d9534f; color:white; border:none; padding:5px 10px; border-radius:3px; cursor:pointer;">Hapus</button>
                </div>
            `;
        });
    }

    cartCount.innerText = totalCount;
    cartTotal.innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;
}

// Menghapus item dari keranjang
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Membuka/Menutup Modal Keranjang
function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Integrasi Checkout WhatsApp
function checkoutWhatsApp() {
    const name = document.getElementById('buyer-name').value;
    const phone = document.getElementById('buyer-phone').value;
    const address = document.getElementById('buyer-address').value;

    if (!name || !phone || !address) {
        alert("Mohon lengkapi nama, nomor WhatsApp, dan alamat pengiriman!");
        return;
    }

    if (cart.length === 0) {
        alert("Keranjang belanjaan Anda masih kosong!");
        return;
    }

    let message = `Halo Kak, saya ingin memesan Spageti:\n\n`;
    let totalPrice = 0;

    cart.forEach(item => {
        let subtotal = item.price * item.quantity;
        totalPrice += subtotal;
        message += `- ${item.name} (${item.quantity}x) = Rp ${subtotal.toLocaleString('id-ID')}\n`;
    });

    message += `\n*Total Belanja: Rp ${totalPrice.toLocaleString('id-ID')}*`;
    message += `\n\n*Data Penerima:*`;
    message += `\nNama: ${name}`;
    message += `\nNo. WA: ${phone}`;
    message += `\nAlamat: ${address}`;

    // Ubah nomor telepon di bawah ini dengan nomor WhatsApp penjual (format internasional tanpa angka 0 di depan, misal: 628815367875)
    const sellerWhatsApp = "628815367875"; 
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://api.whatsapp.com/send?phone=${sellerWhatsApp}&text=${encodedMessage}`, '_blank');
}

// Jalankan fungsi render produk saat halaman dimuat
window.onload = renderProducts;