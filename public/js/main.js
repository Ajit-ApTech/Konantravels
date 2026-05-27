// Konan Travels - Custom JavaScript

// Document Ready
document.addEventListener('DOMContentLoaded', function() {
  initCustomCursor();
  initSmoothScrolling();
  initCounterAnimation();
  initStickyHeader();
  initMobileMenu();
  initBookingForm();
  initToastNotifications();
});

// Custom Cursor
function initCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (!cursorDot || !cursorOutline) return;

  document.addEventListener('mousemove', function(e) {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';

    // Delayed movement for cursor outline
    setTimeout(() => {
      cursorOutline.style.left = e.clientX + 'px';
      cursorOutline.style.top = e.clientY + 'px';
    }, 100);
  });

  // Hover effects
  document.addEventListener('mouseenter', function() {
    document.body.classList.add('custom-cursor');
  });
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Counter Animation
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) return;

  const animationOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const update = () => {
          current += increment;
          if (current < target) {
            entry.target.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            entry.target.textContent = target;
            observer.unobserve(entry.target);
          }
        };
        update();
      }
    });
  }, animationOptions);

  counters.forEach(counter => observer.observe(counter));
}

// Sticky Header
function initStickyHeader() {
  const header = document.querySelector('nav');
  if (!header) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    });
  }, { threshold: 0 });

  observer.observe(header);
}

// Mobile Menu
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Toast Notifications
function initToastNotifications() {
  window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 z-[9999] px-6 py-4 rounded-lg shadow-2xl animate-slide-up ${
      type === 'success' ? 'bg-green-600' :
      type === 'error' ? 'bg-red-600' :
      type === 'warning' ? 'bg-amber-600' : 'bg-cyan-600'
    }`;

    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} text-xl"></i>
        <div>
          <div class="font-semibold">${type.charAt(0).toUpperCase() + type.slice(1)}!</div>
          <div class="text-sm">${message}</div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white/80 hover:text-white">&times;</button>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 5000);
  };
}

// Booking Form Validation
function initBookingForm() {
  const bookingForm = document.getElementById('booking-form');
  if (!bookingForm) return;

  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate form fields
    const fields = {
      name: document.getElementById('customerName').value.trim(),
      phone: document.getElementById('customerPhone').value.trim(),
      pickup: document.getElementById('pickupLocation').value.trim(),
      drop: document.getElementById('dropLocation').value.trim(),
      date: document.getElementById('pickupDate').value,
      time: document.getElementById('pickupTime').value
    };

    if (!fields.name || !fields.phone || !fields.pickup || !fields.drop || !fields.date || !fields.time) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    if (fields.phone.length < 10) {
      showToast('Please enter a valid phone number', 'error');
      return;
    }

    // Submit the form
    showToast('Booking submitted successfully!', 'success');
    this.reset();
  });
}

// Vehicle Price Estimator
function estimateVehiclePrice() {
  const pickup = document.getElementById('pickupLocation')?.value;
  const drop = document.getElementById('dropLocation')?.value;
  const vehicleType = document.getElementById('vehicleType')?.value;

  if (!pickup || !drop) {
    showToast('Please enter pickup and drop locations', 'warning');
    return;
  }

  // Base prices by vehicle type
  const prices = {
    hatchback: 12,
    sedan: 15,
    suv: 20,
    tempo_traveller: 25,
    pickup_van: 22
  };

  const basePrice = prices[vehicleType] || 15;
  const estimatedDistance = 50; // Default estimate
  const totalPrice = basePrice * estimatedDistance;

  showToast(`Estimated Price: ₹${totalPrice} for ${vehicleType}`, 'info');
}

// Auto-suggest Location (Mock)
function initLocationAutosuggest() {
  const inputs = document.querySelectorAll('input[type="text"][placeholder*="location"]');
  if (inputs.length === 0) return;

  const locations = [
    'New Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Greater Noida',
    'Bangalore', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai',
    'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur'
  ];

  inputs.forEach(input => {
    input.addEventListener('input', function() {
      const value = this.value.toLowerCase();
      const suggestions = locations.filter(loc => loc.toLowerCase().includes(value)).slice(0, 5);
      showSuggestions(this, suggestions);
    });
  });
}

function showSuggestions(input, suggestions) {
  let suggestionsContainer = input.nextElementSibling;
  if (!suggestionsContainer || !suggestionsContainer.classList.contains('suggestions')) {
    suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'suggestions glass-panel rounded-lg absolute z-10 w-full max-w-sm max-h-40 overflow-y-auto';
    input.parentNode.appendChild(suggestionsContainer);
  }

  if (suggestions.length === 0) {
    suggestionsContainer.innerHTML = '';
    return;
  }

  suggestionsContainer.innerHTML = suggestions.map(loc => `
    <div class="px-4 py-2 hover:bg-white/10 cursor-pointer" onclick="selectLocation('${loc}', ${JSON.stringify(input)})">${loc}</div>
  `).join('');
}

function selectLocation(location, inputElement) {
  inputElement.value = location;
  const container = inputElement.nextElementSibling;
  if (container) container.innerHTML = '';
}

// Initialize Map (if needed)
function initMap() {
  // Mock map initialization
  console.log('Map initialization - replace with Google Maps API key if needed');
}

// Update booking status in admin panel
function updateBookingStatus(bookingId, newStatus) {
  fetch(`/api/admin/bookings/${bookingId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookingStatus: newStatus })
  })
  .then(res => res.json())
  .then(data => {
    showToast('Booking status updated', 'success');
    setTimeout(() => location.reload(), 1000);
  })
  .catch(err => showToast('Failed to update status', 'error'));
}

// Delete item confirmation
function confirmDelete(itemName) {
  return confirm(`Are you sure you want to delete ${itemName}? This action cannot be undone.`);
}

// Download CSV
function downloadCSV(data, filename) {
  const csvContent = 'data:text/csv;charset=utf-8,' + data;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.querySelector('.mobile-menu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
}
