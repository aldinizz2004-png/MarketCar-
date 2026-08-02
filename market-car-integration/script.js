/*
  غيّر هذا الرابط فقط قبل المناقشة.
  مثال:
  const MIROTALK_BASE_URL = "https://your-random-link.trycloudflare.com";
*/
const MIROTALK_BASE_URL = "https://CHANGE-ME.trycloudflare.com";

const cars = [
  {
    id: "toyota-corolla-2021",
    brand: "Toyota",
    name: "Toyota Corolla",
    year: 2021,
    price: 72000,
    condition: "مستعملة - ممتازة",
    transmission: "أوتوماتيك",
    fuel: "بنزين",
    mileage: "58,000 كم",
    seller: "أحمد الخطيب",
    city: "نابلس",
    image: "assets/toyota.svg"
  },
  {
    id: "hyundai-elantra-2020",
    brand: "Hyundai",
    name: "Hyundai Elantra",
    year: 2020,
    price: 64500,
    condition: "مستعملة - جيدة جدًا",
    transmission: "أوتوماتيك",
    fuel: "بنزين",
    mileage: "74,000 كم",
    seller: "محمد عودة",
    city: "رام الله",
    image: "assets/hyundai.svg"
  },
  {
    id: "kia-sportage-2022",
    brand: "Kia",
    name: "Kia Sportage",
    year: 2022,
    price: 112000,
    condition: "مستعملة - ممتازة",
    transmission: "أوتوماتيك",
    fuel: "هايبرد",
    mileage: "31,000 كم",
    seller: "سامي منصور",
    city: "قلقيلية",
    image: "assets/kia.svg"
  },
  {
    id: "mercedes-c200-2019",
    brand: "Mercedes",
    name: "Mercedes C200",
    year: 2019,
    price: 138000,
    condition: "مستعملة - فاخرة",
    transmission: "أوتوماتيك",
    fuel: "بنزين",
    mileage: "82,000 كم",
    seller: "عمر زيدان",
    city: "الخليل",
    image: "assets/mercedes.svg"
  },
  {
    id: "bmw-320i-2018",
    brand: "BMW",
    name: "BMW 320i",
    year: 2018,
    price: 98000,
    condition: "مستعملة - ممتازة",
    transmission: "أوتوماتيك",
    fuel: "بنزين",
    mileage: "91,000 كم",
    seller: "ياسر شحادة",
    city: "جنين",
    image: "assets/bmw.svg"
  },
  {
    id: "volkswagen-golf-2020",
    brand: "Volkswagen",
    name: "Volkswagen Golf",
    year: 2020,
    price: 58500,
    condition: "مستعملة - جيدة",
    transmission: "أوتوماتيك",
    fuel: "بنزين",
    mileage: "69,000 كم",
    seller: "رامي ناصر",
    city: "طولكرم",
    image: "assets/volkswagen.svg"
  }
];

const grid = document.getElementById("carsGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");
const priceFilter = document.getElementById("priceFilter");
const modal = document.getElementById("contactModal");
const modalCarName = document.getElementById("modalCarName");
const buyerName = document.getElementById("buyerName");
const startMeetingBtn = document.getElementById("startMeetingBtn");

let selectedCar = null;

function formatPrice(price) {
  return `${price.toLocaleString("en-US")} ₪`;
}

function carCard(car) {
  return `
    <article class="car-card">
      <div class="car-image-wrap">
        <img src="${car.image}" alt="${car.name}" />
        <span class="condition-tag">${car.condition}</span>
      </div>
      <div class="car-body">
        <div class="car-title-row">
          <div>
            <h3>${car.name}</h3>
            <span class="car-year">موديل ${car.year}</span>
          </div>
          <div class="car-price">${formatPrice(car.price)}</div>
        </div>

        <div class="car-specs">
          <span>${car.transmission}</span>
          <span>${car.fuel}</span>
          <span>${car.mileage}</span>
        </div>

        <div class="seller-row">
          <div class="seller-info">
            <span class="avatar">${car.seller.charAt(0)}</span>
            <div>
              <strong>${car.seller}</strong>
              <small>${car.city}</small>
            </div>
          </div>
          <small>بائع موثّق ✓</small>
        </div>

        <button class="btn btn-primary contact-btn" data-car-id="${car.id}">
          تواصل مع البائع عبر الفيديو
        </button>
      </div>
    </article>
  `;
}

function renderCars(list) {
  grid.innerHTML = list.map(carCard).join("");
  emptyState.style.display = list.length ? "none" : "block";

  document.querySelectorAll("[data-car-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedCar = cars.find((car) => car.id === button.dataset.carId);
      modalCarName.textContent = `${selectedCar.name} - ${formatPrice(selectedCar.price)}`;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      buyerName.focus();
    });
  });
}

function filterCars() {
  const query = searchInput.value.trim().toLowerCase();
  const brand = brandFilter.value;
  const price = priceFilter.value;

  const filtered = cars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(query) ||
      car.brand.toLowerCase().includes(query) ||
      String(car.year).includes(query) ||
      car.city.toLowerCase().includes(query);

    const matchesBrand = brand === "all" || car.brand === brand;

    let matchesPrice = true;
    if (price === "under60") matchesPrice = car.price < 60000;
    if (price === "60to100") matchesPrice = car.price >= 60000 && car.price <= 100000;
    if (price === "over100") matchesPrice = car.price > 100000;

    return matchesSearch && matchesBrand && matchesPrice;
  });

  renderCars(filtered);
}

function sanitizeRoomPart(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 35);
}

function buildMeetingUrl() {
  const buyer = sanitizeRoomPart(buyerName.value || "guest");
  const uniqueCode = Date.now().toString().slice(-6);
  const roomName = `${selectedCar.id}-${buyer}-${uniqueCode}`;

  // الصيغة الافتراضية الشائعة في MiroTalk P2P:
  return `${MIROTALK_BASE_URL}/join/${encodeURIComponent(roomName)}`;
}

startMeetingBtn.addEventListener("click", () => {
  if (!selectedCar) return;

  if (MIROTALK_BASE_URL.includes("CHANGE-ME")) {
    alert("عدّل MIROTALK_BASE_URL داخل ملف script.js وضع رابط Cloudflare الحالي.");
    return;
  }

  const meetingUrl = buildMeetingUrl();
  window.open(meetingUrl, "_blank", "noopener,noreferrer");
});

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
});

searchInput.addEventListener("input", filterCars);
brandFilter.addEventListener("change", filterCars);
priceFilter.addEventListener("change", filterCars);

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("open");
});

renderCars(cars);
