const API_BASE = "http://127.0.0.1:8001";



async function loadProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    const data = await res.json();

    const list = document.getElementById("product-list");
    if (!list) return;

    list.innerHTML = "";

    data.forEach(item => {
      list.innerHTML += `
        <a href="details.html?id=${item.id}" class="card-link">
          <div class="card">
            <img src="${item.product_image}" alt="">
            <div class="heart">❤</div>
            <div class="card-text">
              <p class="rating">⭐ ${item.avg_rating || 0}</p>
              <h3>${item.product_name}</h3>
              <p class="price">${item.product_price} Сом</p>
            </div>
          </div>
        </a>
      `;
    });

  } catch (err) {
    console.error("Ошибка загрузки продуктов:", err);
  }
}

if (document.getElementById("product-list")) {
  loadProducts();
}



async function loadProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    const item = await res.json();

    document.getElementById("detail-title").textContent = item.product_name;
    document.getElementById("detail-desc").textContent = item.product_description;
    document.getElementById("detail-price").textContent = `${item.product_price} Сом`;
    document.getElementById("detail-rating").textContent =
      `⭐ ${item.avg_rating || 0} (${item.reviews_count || 0} reviews)`;

    document.getElementById("detail-img").src = item.product_image;

  } catch (err) {
    console.error("Ошибка загрузки details:", err);
  }
}

if (document.getElementById("detail-title")) {
  loadProductDetails();
}



async function loadCategories() {
  try {
    const res = await fetch(`${API_BASE}/category`);
    const data = await res.json();

    const catList = document.getElementById("category-list");
    if (!catList) return;

    catList.innerHTML = "";

    data.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "cat";
      btn.textContent = cat.category_name;
      btn.dataset.id = cat.id;

      btn.addEventListener("click", () => {
        setActiveCategory(btn);
        loadProductsByCategory(cat.id);
      });

      catList.appendChild(btn);
    });


    const first = catList.querySelector(".cat");
    if (first) {
      setActiveCategory(first);
      loadProductsByCategory(first.dataset.id);
    }

  } catch (err) {
    console.error("Ошибка загрузки категорий:", err);
  }
}

function setActiveCategory(activeBtn) {
  document.querySelectorAll(".cat").forEach(btn =>
    btn.classList.remove("active")
  );
  activeBtn.classList.add("active");
}

if (document.getElementById("category-list")) {
  loadCategories();
}



async function loadProductsByCategory(catId) {
  try {
    const res = await fetch(`${API_BASE}/category/${catId}`);
    const data = await res.json();

    const list = document.getElementById("product-list");
    if (!list || !data.products) return;

    list.innerHTML = "";

    data.products.forEach(item => {
      list.innerHTML += `
        <a href="details.html?id=${item.id}" class="card-link">
          <div class="card">
            <img src="${item.product_image}" alt="">
            <div class="heart">❤</div>
            <div class="card-text">
              <p class="rating">⭐ ${item.avg_rating || 0}</p>
              <h3>${item.product_name}</h3>
              <p class="price">${item.product_price} Сом</p>
            </div>
          </div>
        </a>
      `;
    });

  } catch (err) {
    console.error("Ошибка фильтрации:", err);
  }
}
