let darkMode = false;

function toggleTheme() {
  darkMode = !darkMode;

  document.body.classList.toggle('dark', darkMode);

  const img = document.getElementById('img-logo');


  if (darkMode) {
    img.src="https://harsh51622.github.io/HavronSwitchgears/LOGO/new white 1.png"

  } else {
    img.src = "https://harsh51622.github.io/HavronSwitchgears/LOGO/new.png"; // Replace with your light mode image

  }
}
function searchPage() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const keywords = input.split(/\s+/); // Split by spaces

  // Map of keywords to files (can include multiple keywords for each file)
  const fileMap = {
    "https://harsh51622.github.io/HavronSwitchgears/MAIN/contact us.html": ["about", "team", "company","email"],
    "https://harsh51622.github.io/HavronSwitchgears/items/capacitor.html": ["capacitors", "capacitor","fan capacitor"],
    "https://harsh51622.github.io/HavronSwitchgears/items/double.html": ["singledoor", "door", "doubledoor"],
    "https://harsh51622.github.io/HavronSwitchgears/items/changeover.html":["changeover","off load changeover","onload changeover"],
    "https://harsh51622.github.io/HavronSwitchgears/items/mcb.html":["mcb","big mcb"]
  };

  // Try to find the one file that matches ALL keywords
  let matchedFile = null;

  for (let file in fileMap) {
    const fileKeywords = fileMap[file];
    const matchesAll = keywords.every(word => fileKeywords.includes(word));

    if (matchesAll) {
      matchedFile = file;
      break; // stop at the first match
    }
  }

  if (matchedFile) {
    window.location.href = matchedFile;
  } else {
    alert("No matching page found for all keywords.");
  }
}


const clickimage = document.querySelector(".logoheader");
clickimage.onclick = () => {
  console.log("harsg")
  window.location.href ="https://harsh51622.github.io/HavronSwitchgears/index.html"
}

const dropdown=document.querySelector(".Dropdown");

dropdown.addEventListener("mouseenter",()=>{
  dropdown.classList.add('show')
  console.log("hagsh")
})

dropdown.addEventListener("mouseleave",()=>{
  dropdown.classList.remove('show')
})

  const searchToggle = document.getElementById('searchIcon');
    const searchBar = document.getElementById('searchBox');

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    // Toggle search bar
    searchToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      searchBar.style.display = searchBar.style.display === 'flex' ? 'none' : 'flex';
      mobileMenu.style.display = 'none'; // hide mobile menu if open
    });

    // Toggle hamburger menu
    hamburger.addEventListener('click', function (e) {
      hamburger.classList.toggle('open');
      e.stopPropagation();
      mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
      searchBar.style.display = 'none'; // hide search bar if open
    });

    // Close both on outside click
    document.addEventListener('click', function (e) {
      if (!searchBar.contains(e.target) && e.target !== searchToggle) {
        searchBar.style.display = 'none';
      }

      if (!mobileMenu.contains(e.target) && e.target !== hamburger &&  hamburger.classList.remove('open')) {
        mobileMenu.style.display = 'none';
      }

        if (!hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
     
      }
    });

    // Also support touch devices
    document.addEventListener('touchstart', function (e) {
      if (!searchBar.contains(e.target) && e.target !== searchToggle) {
        searchBar.style.display = 'none';
        hamburger.classList.remove('open')

      }

      if (!mobileMenu.contains(e.target) && e.target !== hamburger) {
        mobileMenu.style.display = 'none';
      }
    });


   

 