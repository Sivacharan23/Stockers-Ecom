// Add at the beginning of the file
// Quotes Data
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        text: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    },
    {
        text: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },
    {
        text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
        author: "Steve Jobs"
    },
    {
        text: "The difference between ordinary and extraordinary is that little extra.",
        author: "Jimmy Johnson"
    },
    {
        text: "Quality is not an act, it is a habit.",
        author: "Aristotle"
    },
    {
        text: "The harder you work for something, the greater you'll feel when you achieve it.",
        author: "Anonymous"
    }
];

// Quotes Elements
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote');

// Quote Functions
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayQuote(quote) {
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = quote.author;
}

function rotateQuote() {
    const quote = getRandomQuote();
    displayQuote(quote);
}

// Event Listeners for Quotes
newQuoteBtn.addEventListener('click', rotateQuote);

// Auto rotate quotes every 30 seconds
setInterval(rotateQuote, 30000);

// Display initial quote
rotateQuote();

// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const prioritySelect = document.getElementById('priority-select');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const editInput = document.getElementById('edit-input');
const editPriority = document.getElementById('edit-priority');
const cancelEdit = document.getElementById('cancel-edit');
const closeModal = document.getElementById('close-modal');
const emptyState = document.getElementById('empty-state');

// Time Management Elements
const hourTens = document.querySelector('[data-hour-tens]');
const hourOnes = document.querySelector('[data-hour-ones]');
const minuteTens = document.querySelector('[data-minute-tens]');
const minuteOnes = document.querySelector('[data-minute-ones]');
const secondTens = document.querySelector('[data-second-tens]');
const secondOnes = document.querySelector('[data-second-ones]');

const startStopwatchBtn = document.getElementById('start-stopwatch');
const pauseStopwatchBtn = document.getElementById('pause-stopwatch');
const resetStopwatchBtn = document.getElementById('reset-stopwatch');
const stopwatchDisplay = document.getElementById('stopwatch-display');

// State
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';
let editingId = null;

// Functions
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    updateStats();
    checkEmptyState();
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    totalTasks.textContent = `Total: ${total}`;
    completedTasks.textContent = `Completed: ${completed}`;
}

function checkEmptyState() {
    if (todos.length === 0) {
        emptyState.style.display = 'block';
        todoList.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        todoList.style.display = 'block';
    }
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text">${todo.text}</span>
        <span class="todo-priority priority-${todo.priority}">${todo.priority}</span>
        <div class="todo-actions">
            <button class="edit-btn" title="Edit">
                <i class="ph ph-pencil"></i>
            </button>
            <button class="delete-btn" title="Delete">
                <i class="ph ph-trash"></i>
            </button>
        </div>
    `;

    // Event Listeners for todo item
    const checkbox = li.querySelector('.todo-checkbox');
    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => toggleTodo(todo.id));
    editBtn.addEventListener('click', () => openEditModal(todo));
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this task?')) {
            deleteTodo(todo.id);
        }
    });

    return li;
}

function renderTodos() {
    todoList.innerHTML = '';
    let filteredTodos = todos;

    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });

    checkEmptyState();
}

// CRUD Operations
function addTodo(text, priority) {
    const todo = {
        id: Date.now(),
        text,
        priority,
        completed: false
    };
    todos.unshift(todo);
    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
}

function updateTodo(id, newText, newPriority) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, text: newText, priority: newPriority } : todo
    );
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Modal Functions
function openEditModal(todo) {
    editingId = todo.id;
    editInput.value = todo.text;
    editPriority.value = todo.priority;
    editModal.classList.add('active');
    editInput.focus();
}

function closeEditModal() {
    editModal.classList.remove('active');
    editingId = null;
}

// Flip Clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    hourTens.textContent = hours[0];
    hourOnes.textContent = hours[1];
    minuteTens.textContent = minutes[0];
    minuteOnes.textContent = minutes[1];
    secondTens.textContent = seconds[0];
    secondOnes.textContent = seconds[1];
}

setInterval(updateClock, 1000);
updateClock();

// Stopwatch
let stopwatchInterval;
let stopwatchTime = 0;
let stopwatchRunning = false;

function formatStopwatchTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startStopwatch() {
    if (stopwatchRunning) return;
    stopwatchRunning = true;
    stopwatchInterval = setInterval(() => {
        stopwatchTime++;
        stopwatchDisplay.textContent = formatStopwatchTime(stopwatchTime);
    }, 1000);
}

function pauseStopwatch() {
    if (!stopwatchRunning) return;
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    stopwatchDisplay.textContent = formatStopwatchTime(stopwatchTime);
}

startStopwatchBtn.addEventListener('click', startStopwatch);
pauseStopwatchBtn.addEventListener('click', pauseStopwatch);
resetStopwatchBtn.addEventListener('click', resetStopwatch);

// Event Listeners
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    const priority = prioritySelect.value;
    if (text) {
        addTodo(text, priority);
        todoInput.value = '';
        todoInput.focus();
    }
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newText = editInput.value.trim();
    const newPriority = editPriority.value;
    if (newText && editingId) {
        updateTodo(editingId, newText, newPriority);
        closeEditModal();
    }
});

cancelEdit.addEventListener('click', closeEditModal);
closeModal.addEventListener('click', closeEditModal);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// Close modal when clicking outside
editModal.addEventListener('click', (e) => {
    if (e.target === editModal) {
        closeEditModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && editModal.classList.contains('active')) {
        closeEditModal();
    }
});

// Initial render
renderTodos();
updateStats();
checkEmptyState(); 

// Product data for Apparel section
const apparelProducts = [
  {
    title: 'Icon Cashmere Beanie',
    price: '$45',
    img: 'https://readdy.ai/api/search-image?query=gray%20knit%20beanie%20hat%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=product1&orientation=squarish',
    desc: 'A classic cashmere beanie for all seasons. Soft, warm, and stylish.'
  },
  {
    title: 'Icon Hoodie',
    price: '$85',
    img: 'https://readdy.ai/api/search-image?query=beige%20cream%20colored%20hoodie%20sweatshirt%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=product2&orientation=squarish',
    desc: 'Premium hoodie with a relaxed fit and minimalist design. Perfect for layering.'
  },
  {
    title: 'Icon Long Sleeve',
    price: '$65',
    img: 'https://readdy.ai/api/search-image?query=black%20long%20sleeve%20athletic%20shirt%20with%20blue%20accent%20details%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=product3&orientation=squarish',
    desc: 'Athletic long sleeve with blue accent details. Breathable and modern.'
  },
  {
    title: 'Classic Tee',
    price: '$35',
    img: 'https://readdy.ai/api/search-image?query=white%20cotton%20t-shirt%20with%20small%20logo%20detail%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=product4&orientation=squarish',
    desc: 'A timeless white tee with a subtle logo. Everyday comfort and style.'
  },
  // New Product 1
  {
    title: 'Navy Track Pants',
    price: '$70',
    img: 'https://readdy.ai/api/search-image?query=navy%20blue%20track%20pants%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=product5&orientation=squarish',
    desc: 'Comfortable navy blue track pants for workouts or lounging.'
  },
  // New Product 2
  {
    title: 'Oversized Denim Jacket',
    price: '$120',
    img: 'https://readdy.ai/api/search-image?query=oversized%20denim%20jacket%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=product6&orientation=squarish',
    desc: 'A statement oversized denim jacket for a bold, modern look.'
  },
  // New Product 3
  {
    title: 'Black Athletic Shorts',
    price: '$40',
    img: 'https://readdy.ai/api/search-image?query=black%20athletic%20shorts%20with%20blue%20stripe%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=product7&orientation=squarish',
    desc: 'Lightweight black shorts with blue stripe, perfect for training.'
  },
  // New Product 4
  {
    title: 'White Button-Up Shirt',
    price: '$55',
    img: 'https://readdy.ai/api/search-image?query=white%20cotton%20button%20up%20shirt%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=product8&orientation=squarish',
    desc: 'A crisp white button-up shirt for a sharp, classic style.'
  }
];

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2000);
}

function openProductModal(idx) {
  const product = apparelProducts[idx];
  document.getElementById('modal-img').src = product.img;
  document.getElementById('modal-title').textContent = product.title;
  document.getElementById('modal-price').textContent = product.price;
  document.getElementById('modal-desc').textContent = product.desc;
  document.getElementById('modal-buy').setAttribute('data-product', idx);
  document.getElementById('product-modal').classList.remove('hidden');
}

function closeProductModal() {
  document.getElementById('product-modal').classList.add('hidden');
}

// Event listeners for Apparel section
window.addEventListener('DOMContentLoaded', function () {
  // View buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const idx = this.getAttribute('data-product');
      openProductModal(idx);
    });
  });
  // Buy buttons (on cards)
  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const idx = this.getAttribute('data-product');
      showToast(apparelProducts[idx].title + ' added to cart!');
    });
  });
  // Modal close
  document.getElementById('close-modal').addEventListener('click', closeProductModal);
  // Modal buy
  document.getElementById('modal-buy').addEventListener('click', function () {
    const idx = this.getAttribute('data-product');
    showToast(apparelProducts[idx].title + ' added to cart!');
    closeProductModal();
  });
  // Close modal on outside click
  document.getElementById('product-modal').addEventListener('click', function (e) {
    if (e.target === this) closeProductModal();
  });
  // Close modal on Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeProductModal();
  });
}); 

// Accessories data
const accessories = [
  {
    title: 'Oversized Tote Bag',
    price: '$55',
    img: 'https://readdy.ai/api/search-image?query=black%20canvas%20tote%20bag%20with%20white%20logo%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=accessory1&orientation=squarish',
    desc: 'Spacious black canvas tote bag with minimalist logo. Perfect for everyday use.'
  },
  {
    title: 'Ceramic Mug Premium',
    price: '$25',
    img: 'https://readdy.ai/api/search-image?query=black%20ceramic%20coffee%20mug%20with%20minimalist%20design%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=accessory2&orientation=squarish',
    desc: 'Premium black ceramic mug for your favorite hot beverages.'
  },
  {
    title: 'Hydration Bottle',
    price: '$35',
    img: 'https://readdy.ai/api/search-image?query=blue%20and%20white%20water%20bottle%20with%20modern%20design%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=accessory3&orientation=squarish',
    desc: 'Modern blue and white water bottle. Stay hydrated in style.'
  },
  {
    title: 'Leather Wallet',
    price: '$75',
    img: 'https://readdy.ai/api/search-image?query=black%20leather%20wallet%20with%20minimal%20design%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=accessory4&orientation=squarish',
    desc: 'Minimalist black leather wallet with premium finish.'
  },
  // New Accessory 1
  {
    title: 'Cotton Baseball Cap',
    price: '$30',
    img: 'https://readdy.ai/api/search-image?query=white%20cotton%20baseball%20cap%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=accessory5&orientation=squarish',
    desc: 'Classic white cotton baseball cap for sunny days.'
  },
  // New Accessory 2
  {
    title: 'Leather Belt',
    price: '$60',
    img: 'https://readdy.ai/api/search-image?query=black%20leather%20belt%20with%20silver%20buckle%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=accessory6&orientation=squarish',
    desc: 'Black leather belt with a silver buckle. Timeless and versatile.'
  },
  // New Accessory 3
  {
    title: 'Wool Scarf',
    price: '$50',
    img: 'https://readdy.ai/api/search-image?query=gray%20wool%20scarf%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=accessory7&orientation=squarish',
    desc: 'Soft gray wool scarf for warmth and style.'
  },
  // New Accessory 4
  {
    title: 'Nylon Backpack',
    price: '$90',
    img: 'https://readdy.ai/api/search-image?query=black%20nylon%20backpack%20with%20minimalist%20design%20on%20clean%20white%20background%20with%20soft%20lighting%20and%20minimal%20styling%20for%20fashion%20ecommerce&width=320&height=320&seq=accessory8&orientation=squarish',
    desc: 'Durable black nylon backpack for all your essentials.'
  }
];

function showAccToast(message) {
  const toast = document.getElementById('acc-toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2000);
}

function openAccessoryModal(idx) {
  const acc = accessories[idx];
  document.getElementById('acc-modal-img').src = acc.img;
  document.getElementById('acc-modal-title').textContent = acc.title;
  document.getElementById('acc-modal-price').textContent = acc.price;
  document.getElementById('acc-modal-desc').textContent = acc.desc;
  document.getElementById('acc-modal-buy').setAttribute('data-accessory', idx);
  document.getElementById('accessory-modal').classList.remove('hidden');
}

function closeAccessoryModal() {
  document.getElementById('accessory-modal').classList.add('hidden');
}

window.addEventListener('DOMContentLoaded', function () {
  // Accessories View buttons
  document.querySelectorAll('.view-acc-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const idx = this.getAttribute('data-accessory');
      openAccessoryModal(idx);
    });
  });
  // Accessories Buy buttons (on cards)
  document.querySelectorAll('.buy-acc-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const idx = this.getAttribute('data-accessory');
      showAccToast(accessories[idx].title + ' added to cart!');
    });
  });
  // Modal close
  document.getElementById('close-acc-modal').addEventListener('click', closeAccessoryModal);
  // Modal buy
  document.getElementById('acc-modal-buy').addEventListener('click', function () {
    const idx = this.getAttribute('data-accessory');
    showAccToast(accessories[idx].title + ' added to cart!');
    closeAccessoryModal();
  });
  // Close modal on outside click
  document.getElementById('accessory-modal').addEventListener('click', function (e) {
    if (e.target === this) closeAccessoryModal();
  });
  // Close modal on Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAccessoryModal();
  });
}); 

// --- CART FUNCTIONALITY ---
let cart = [];

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartEmpty = document.getElementById('cart-empty');
  cartItemsDiv.innerHTML = '';
  if (cart.length === 0) {
    cartEmpty.style.display = '';
    return;
  }
  cartEmpty.style.display = 'none';
  cart.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'flex items-center gap-4 mb-6';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="w-16 h-16 object-cover rounded-md" />
      <div class="flex-1">
        <div class="font-medium text-gray-900">${item.title}</div>
        <div class="text-gray-500 text-sm">${item.price} &times; ${item.qty}</div>
      </div>
      <button class="text-gray-400 hover:text-red-500 text-xl font-bold remove-cart-item" data-idx="${idx}">&times;</button>
    `;
    cartItemsDiv.appendChild(div);
  });
  // Remove item buttons
  cartItemsDiv.querySelectorAll('.remove-cart-item').forEach(btn => {
    btn.addEventListener('click', function () {
      const idx = +this.getAttribute('data-idx');
      cart.splice(idx, 1);
      updateCartCount();
      renderCart();
    });
  });
}

function addToCart(product) {
  const found = cart.find(item => item.title === product.title);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartCount();
  renderCart();
}

// --- SEARCH FUNCTIONALITY ---
function getAllProducts() {
  return [
    ...apparelProducts.map(p => ({ ...p, section: 'Apparel' })),
    ...accessories.map(p => ({ ...p, section: 'Accessories' }))
  ];
}

function renderSearchResults(query) {
  const resultsDiv = document.getElementById('search-results');
  resultsDiv.innerHTML = '';
  if (!query) return;
  const q = query.toLowerCase();
  const results = getAllProducts().filter(p => p.title.toLowerCase().includes(q));
  if (results.length === 0) {
    resultsDiv.innerHTML = '<p class="text-gray-500 text-sm">No products found.</p>';
    return;
  }
  results.forEach((p, idx) => {
    const div = document.createElement('div');
    div.className = 'flex items-center gap-4 bg-gray-50 rounded-lg p-4';
    div.innerHTML = `
      <img src="${p.img}" alt="${p.title}" class="w-16 h-16 object-cover rounded-md" />
      <div class="flex-1">
        <div class="font-medium text-gray-900">${p.title}</div>
        <div class="text-gray-500 text-sm">${p.price} <span class="ml-2 text-xs text-gray-400">${p.section}</span></div>
      </div>
      <button class="bg-primary hover:bg-secondary text-white px-3 py-1 rounded-md text-xs font-medium transition add-search-cart">Add</button>
    `;
    div.querySelector('.add-search-cart').addEventListener('click', function () {
      addToCart({ ...p });
      showToast(p.title + ' added to cart!');
    });
    resultsDiv.appendChild(div);
  });
}

// --- NAVBAR, CART, SEARCH OVERLAY EVENTS ---
window.addEventListener('DOMContentLoaded', function () {
  // Cart open/close
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  document.getElementById('open-cart').addEventListener('click', function () {
    cartDrawer.classList.remove('hidden');
    cartDrawer.classList.remove('translate-x-full');
    cartOverlay.classList.remove('hidden');
  });
  document.getElementById('close-cart').addEventListener('click', closeCartDrawer);
  cartOverlay.addEventListener('click', closeCartDrawer);
  function closeCartDrawer() {
    cartDrawer.classList.add('translate-x-full');
    setTimeout(() => cartDrawer.classList.add('hidden'), 300);
    cartOverlay.classList.add('hidden');
  }
  // Search open/close
  const searchOverlay = document.getElementById('search-overlay');
  document.getElementById('open-search').addEventListener('click', function () {
    searchOverlay.classList.remove('hidden');
    document.getElementById('search-input').focus();
  });
  document.getElementById('close-search').addEventListener('click', closeSearchOverlay);
  function closeSearchOverlay() {
    searchOverlay.classList.add('hidden');
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = '';
  }
  // Search input
  document.getElementById('search-input').addEventListener('input', function () {
    renderSearchResults(this.value);
  });
  // Esc closes overlays
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeSearchOverlay();
    }
  });
});

// --- INTEGRATE CART WITH BUY BUTTONS ---
window.addEventListener('DOMContentLoaded', function () {
  // Apparel
  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const idx = this.getAttribute('data-product');
      addToCart({ ...apparelProducts[idx] });
    });
  });
  // Accessories
  document.querySelectorAll('.buy-acc-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const idx = this.getAttribute('data-accessory');
      addToCart({ ...accessories[idx] });
    });
  });
  // Modal buy (apparel)
  document.getElementById('modal-buy').addEventListener('click', function () {
    const idx = this.getAttribute('data-product');
    addToCart({ ...apparelProducts[idx] });
  });
  // Modal buy (accessory)
  document.getElementById('acc-modal-buy').addEventListener('click', function () {
    const idx = this.getAttribute('data-accessory');
    addToCart({ ...accessories[idx] });
  });
}); 