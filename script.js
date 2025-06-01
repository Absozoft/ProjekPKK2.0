// Ambil elemen-elemen yang dibutuhkan
const hamburgerMenu = document.getElementById('hamburger-menu');
const navbar = document.querySelector('.navbar');

// Menambahkan event listener pada klik hamburger
hamburgerMenu.addEventListener('click', () => {
    navbar.classList.toggle('active'); // Toggle class untuk navbar
    hamburgerMenu.classList.toggle('active'); // Toggle class untuk hamburger
});

let cart = [];

const products = [
    {
        id: 1,
        name: "Cireng",
        price: 3500,
        image: "cirengswir.png"
    },
    {
        id: 2,
        name: "Basreng Pedas",
        price: 3500,
        image: "https://down-id.img.susercontent.com/file/sg-11134201-22120-821xttai3elv58"
    },
    {
        id: 3,
        name: "Kripik Pisang",
        price: 3500,
        image: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/08/01073837/Resep-Keripik-Pisang-Manis-Gurih-untuk-Camilan-Keluarga-.jpg.webp"
    },
]

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPembayranElement = document.getElementById("totalPembayaran");
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Keranjang kosong</p>';
        totalPembayranElement.innerHTML = "<p>Total Pesanan: Rp 0</p>"; 
         totalPembayranElement.style.display = "none"; 
        return;
    }
    
    cartItems.innerHTML = '';
    totalPembayranElement.innerHTML = ""
      totalPembayranElement.style.display = "block";
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = "card"
        cartItem.style.width = "18rem";
        cartItem.innerHTML = `
            <img src="${item.image}" style="height: 200px;"  class="card-img-top"></img>
            <div class="card-body">
            <h4 >${item.name}</h4>
            <p>Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
            <p>Total: Rp ${(item.price * item.quantity).toLocaleString()}</p>
            <div class="container-button">
                <button class="btn btn-success" onclick="increaseQuantity(${item.id})">+</button>
                <button class="btn btn-danger" onclick="decreaseQuantity(${item.id})">-</button>
            </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalElement = document.createElement('div');
    totalElement.style.marginTop = '20px';
    totalElement.style.fontWeight = 'bold';
    totalElement.innerHTML = `Total Pesanan: Rp ${total.toLocaleString()}`;
    totalPembayranElement.appendChild(totalElement);

    // // Tambahkan tombol checkout
    const checkoutBtn = document.createElement('button');
    checkoutBtn.className = 'btn btn-success';
    checkoutBtn.textContent = 'Checkout via WhatsApp';
    checkoutBtn.onclick = checkoutToWhatsApp;
    totalPembayranElement.appendChild(checkoutBtn);
}

function checkoutToWhatsApp() {
    if (cart.length === 0) {
        alert('Keranjang masih kosong!');
        return;
    }

    let message = "Haloo ka, saya mau beli\n";
    
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} x ${item.quantity}\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal: Rp ${total.toLocaleString()}`;

    const encodedMessage = encodeURIComponent(message);
    
    const phoneNumber = "6281234567";
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}


function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    // Hasil Produk yang kita berhasil cari
    if (item) {
        if((item.quantity - 1) == 0){ // Kondisi dimana produknya keadaan kosong dan perlu di hapus
            let newCart = cart.filter((data) => data.id !== item.id);
            // Bikin Keranjang Baru Yang isinya
            // Isi dari cart di ulang dari banyaknya dan di check
            // agar isinya bukan dari yang kita cari sebelumnya
            cart = newCart;
        }else{
            item.quantity -= 1;
        }

        updateCart();
    }
}


const modal = document.getElementById('overlay');
function showKeranjang() {
    modal.style.display = "block"
}

function hiddenKeranjang() {
    modal.style.display = "none"
}
