  window.addEventListener('DOMContentLoaded', () => {
      document.body.classList.add('fade-in');
    });

      // Mobile: activate center card
    const container = document.getElementById('sliderContainer');
    const cards = document.querySelectorAll('.card');

    function highlightCenterCard() {
      let center = window.innerWidth / 2;

      let closestCard = null;
      let closestDistance = Infinity;

      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(center - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestCard = card;
        }
      });

      cards.forEach(card => card.classList.remove("active"));
      if (closestCard) closestCard.classList.add("active");
    }

    container.addEventListener("scroll", () => {
      highlightCenterCard();
    });

    window.addEventListener("resize", highlightCenterCard);
    window.addEventListener("load", highlightCenterCard);


      // Data for details (you can change text as needed)
  const details = [
    {
      year: "2000",
      title: "Company Founded",
      text: "Year 2000 — Company born with a small team and big dreams. Started operations locally and built early prototypes."
    },
    {
      year: "2005",
      title: "First Branch Opened",
      text: "2005 — Opened the first branch in another city to serve more customers and hire local staff."
    },
    {
      year: "2010",
      title: "1,000+ Customers",
      text: "2010 — Reached a major milestone with over 1,000 satisfied customers and stronger market trust."
    },
    {
      year: "2015",
      title: "Product Line Expansion",
      text: "2015 — Expanded product range and began B2B partnerships for faster growth."
    },
    {
      year: "2018",
      title: "Digital Transformation",
      text: "2018 — Launched online channels, e-commerce store, and automated key operations."
    },
    {
      year: "2025",
      title: "National Leader",
      text: "2025 — Achieved nationwide presence with ~2,000 employees and multiple branches."
    }
  ];

  const milestones = Array.from(document.querySelectorAll('.milestone'));
  const markers = document.querySelectorAll('.marker');
  const detailTitle = document.getElementById('detailTitle');
  const detailText = document.getElementById('detailText');
  const detailYear = document.getElementById('detailYear');
  const track = document.getElementById('track');

  let active = 0; // index

  function setActive(idx, focus=true, smoothScroll=true){
    if(idx < 0) idx = 0;
    if(idx >= details.length) idx = details.length - 1;
    active = idx;

    // update detail card
    detailTitle.textContent = details[idx].title;
    detailText.textContent = details[idx].text;
    detailYear.textContent = details[idx].year;

    // update marker classes
    markers.forEach((m,i)=> m.classList.toggle('active', i===idx));

    // ensure milestone in view (smooth scroll horizontally or vertically)
    const el = milestones[idx];
    if(el){
      if(smoothScroll && el.scrollIntoView){
        el.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
      } else {
        el.scrollIntoView();
      }
      if(focus) el.querySelector('.marker').focus();
    }
  }

  // click handlers
  milestones.forEach((ms, i) => {
    ms.addEventListener('click', e => setActive(i));
    // keyboard support (Enter / Space)
    ms.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActive(i);
      }
    });
  });

  // Prev / Next
  document.getElementById('prevBtn').addEventListener('click', () => setActive(active-1));
  document.getElementById('nextBtn').addEventListener('click', () => setActive(active+1));

  // Auto-play one-by-one (optional). Uncomment to enable autoplay every 4s:
  // let autoplay = setInterval(()=> setActive((active+1) % details.length), 4000);

  // initialize

