

function toggleTheme() {
  darkMode = !darkMode;

  document.body.classList.toggle('dark', darkMode);

  const img = document.getElementById('img-logo');


  if (darkMode) {
    img.src="LOGO/new white 1.png"

  } else {
    img.src = "LOGO/new.png"; // Replace with your light mode image

  }
}





const form = document.getElementById("enquiryForm");
    const modal = document.getElementById("enquiryModal");
    const closeBtn = document.getElementById("closeBtn");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        body: formData
      })
      .then(res => {
        if (res.ok) {
          alert("✅ Your enquiry is received. Our team will contact you shortly.");
          form.reset();
          modal.classList.add("hidden");
        } else {
          alert("❌ Submission failed.");
        }
      })
      .catch(err => {
        alert("❌ Error occurred.");
        console.error(err);
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      form.requestSubmit(); // Trigger submit on close
    });

const slidesContainer = document.getElementById("slides");
let slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots");
let currentIndex = 1;
let allowShift = true;
let autoSlideInterval;

// Clone slides for infinite loop
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
slidesContainer.appendChild(firstClone);
slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);

slides = document.querySelectorAll(".slide");
slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

// Create dots
for (let i = 0; i < slides.length - 2; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");

  // ✅ Correct click handler
  dot.addEventListener("click", () => {
    currentIndex = i + 1; // clone offset fix
    updateSliderPosition();
    resetAutoSlide();
  });

  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

// Update slider
function updateSliderPosition() {
  slidesContainer.style.transition = "transform 0.5s ease-in-out";
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
}

// Update dots
function updateDots() {
  dots.forEach(dot => dot.classList.remove("active"));
  let dotIndex = currentIndex - 1;
  if (dotIndex < 0) dotIndex = dots.length - 1;
  if (dotIndex >= dots.length) dotIndex = 0;
  dots[dotIndex].classList.add("active");
}

// Arrows
function nextSlide() {
  if (allowShift) {
    currentIndex++;
    updateSliderPosition();
    allowShift = false;
  }
}

function prevSlide() {
  if (allowShift) {
    currentIndex--;
    updateSliderPosition();
    allowShift = false;
  }
}

// Infinite loop logic
slidesContainer.addEventListener("transitionend", () => {
  if (slides[currentIndex].isSameNode(firstClone)) {
    slidesContainer.style.transition = "none";
    currentIndex = 1;
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  if (slides[currentIndex].isSameNode(lastClone)) {
    slidesContainer.style.transition = "none";
    currentIndex = slides.length - 2;
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  allowShift = true;
  updateDots();
});

// Touch swipe
let startX = 0;
let endX = 0;
document.getElementById("slider").addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});
document.getElementById("slider").addEventListener("touchend", e => {
  endX = e.changedTouches[0].clientX;
  if (startX > endX + 50) nextSlide();
  else if (startX < endX - 50) prevSlide();
  resetAutoSlide();
});

// Auto-slide
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000);
}
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}
startAutoSlide();


const counterBox1 = document.getElementById("counter-box1");
let i1 = 1;
const intervalId1 = setInterval(() => {
  counterBox1.textContent = i1;
  i1++;
  if (i1 > 15) {
    clearInterval(intervalId1);
  }
}, 1000);

const counterBox2 = document.getElementById("counter-box2");
let i2 = 1;
const intervalId2 = setInterval(() => {
  counterBox2.textContent = i2;
  i2++;
  if (i2 > 100) {
    clearInterval(intervalId2);
  }
}, 100);

const counterBox3 = document.getElementById("counter-box3");
let i3 = 1;
const intervalId3 = setInterval(() => {
  counterBox3.textContent = i3;
  i3++;
  if (i3 > 50) {
    clearInterval(intervalId3);
  }
}, 10);

const counterBox4 = document.getElementById("counter-box4");
let i4 = 1;
const intervalId4 = setInterval(() => {
  counterBox4.textContent = i4;
  i4++;
  if (i4 > 10000) {
    clearInterval(intervalId4);
  }
}, 1);

const counterBox5 = document.getElementById("counter-box5");
let i5 = 1;
const intervalId5 = setInterval(() => {
  counterBox5.textContent = i5;
  i5++;
  if (i5 > 80) {
    clearInterval(intervalId5);
  }
}, 100);

function opendropdown() 
{
  const dropdown =document.getElementById("productSelect").value;
  if (dropdown) {
    window.location.href = dropdown;
  }
}
  const button = document.getElementsByClassName('mcbs');

    button.addEventListener('click', () => {
      button.classList.toggle('active');
    });


    //header ko access karna ka leya 



 const box = document.querySelector('.advertising1');

    box.addEventListener('click', () => {
      box.classList.toggle('active');
    });

 fetch("/HEADER/header.html")
 .then(res => res.text())
 .then(data => {
  document.getElementById("header").innerHTML = data;

})

  function showTab(id) {
    // Pehle sab content hide karo
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
      content.classList.remove('active');
    });

    // Phir sirf selected content show karo
    document.getElementById(id).classList.add('active');
  }

 