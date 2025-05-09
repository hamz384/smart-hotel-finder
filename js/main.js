// Updated main.js to include 'No results found' message if no hotels match filters

const hotels = [
    {
      name: "The Lowry Hotel",
      price: 148,
      stars: 5,
      amenities: ["wifi", "breakfast"],
      image: "images/lowry.jpg"
    },
    {
      name: "Premier Inn Manchester",
      price: 123,
      stars: 3,
      amenities: ["wifi"],
      image: "images/premier.jpg"
    },
    {
      name: "Radisson Blu",
      price: 178,
      stars: 4,
      amenities: ["wifi", "breakfast"],
      image: "images/radisson.jpg"
    },
    {
      name: "CitySuites Aparthotel",
      price: 165,
      stars: 4,
      amenities: ["wifi", "pool"],
      image: "images/citysuites.jpg"
    },
    {
      name: "Velvet Hotel",
      price: 135,
      stars: 4,
      amenities: ["wifi", "bar"],
      image: "images/velvet.jpg"
    },
    {
      name: "Maldron Hotel Manchester",
      price: 120,
      stars: 3,
      amenities: ["wifi"],
      image: "images/maldron.jpg"
    },
    {
      name: "Dakota Manchester",
      price: 195,
      stars: 5,
      amenities: ["wifi", "breakfast", "bar"],
      image: "images/dakota.jpg"
    },
    {
      name: "Park Inn by Radisson",
      price: 140,
      stars: 4,
      amenities: ["wifi", "gym"],
      image: "images/parkinn.jpg"
    },
    {
      name: "Jurys Inn Manchester",
      price: 115,
      stars: 3,
      amenities: ["wifi"],
      image: "images/jurysinn.jpg"
    }
  ];
  
  const hotelList = document.getElementById("hotelList");
  const priceRange = document.getElementById("priceRange");
  const priceDisplay = document.getElementById("priceDisplay");
  const starRating = document.getElementById("starRating");
  const amenityCheckboxes = ["wifi", "breakfast", "pool", "bar", "gym"].map(id => document.getElementById(id));
  
  function renderHotels() {
    const maxPrice = parseInt(priceRange.value);
    const selectedRating = parseInt(starRating.value);
    const selectedAmenities = amenityCheckboxes.filter(cb => cb.checked).map(cb => cb.id);
  
    hotelList.innerHTML = "";
  
    const filtered = hotels.filter(hotel => {
      const matchesPrice = hotel.price <= maxPrice;
      const matchesRating = !selectedRating || hotel.stars === selectedRating;
      const matchesAmenities = selectedAmenities.every(amenity => hotel.amenities.includes(amenity));
      return matchesPrice && matchesRating && matchesAmenities;
    });
  
    if (filtered.length === 0) {
      hotelList.innerHTML = `<div class='col-12 text-center'><p class='text-muted'>No results found matching your filters.</p></div>`;
      return;
    }
  
    filtered.forEach(hotel => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";
      card.innerHTML = `
        <a href="hotel-detail.html?hotel=${encodeURIComponent(hotel.name)}" class="text-decoration-none text-dark">
          <div class="card h-100">
            <img src="${hotel.image}" class="card-img-top" alt="${hotel.name}">
            <div class="card-body">
              <h5 class="card-title">${hotel.name}</h5>
              <p class="card-text">£${hotel.price}/night</p>
              <p class="card-text">Rating: ${"★".repeat(hotel.stars)}</p>
              <p class="card-text">Amenities: ${hotel.amenities.join(", ")}</p>
            </div>
          </div>
        </a>
      `;
      hotelList.appendChild(card);
    });
  }
  
  if (priceRange && priceDisplay) {
    priceDisplay.textContent = `Up to £${priceRange.value}`;
    priceRange.addEventListener("input", () => {
      priceDisplay.textContent = `Up to £${priceRange.value}`;
      renderHotels();
    });
  }
  
  if (starRating) starRating.addEventListener("change", renderHotels);
  amenityCheckboxes.forEach(cb => cb.addEventListener("change", renderHotels));
  
  renderHotels();
  
  