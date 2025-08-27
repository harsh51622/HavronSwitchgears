// ✅ Replace with your API KEY & Calendar ID
    const API_KEY = "YOUR_API_KEY";
    const CALENDAR_ID = "your_calendar_id@group.calendar.google.com";

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const tbody = document.querySelector("#timingTable tbody");
    const detailNote = document.getElementById("detailNote");

    let today = new Date();
    let startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); 
    let endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));

    function formatDate(date) {
      return date.toISOString();
    }

    async function fetchHolidays() {
      let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${formatDate(startOfWeek)}&timeMax=${formatDate(endOfWeek)}`;
      let response = await fetch(url);
      let data = await response.json();
      return data.items || [];
    }

    async function renderChart() {
      let holidays = await fetchHolidays();
      let holidayDates = holidays.map(e => e.start.date || e.start.dateTime);

      for (let i = 0; i < days.length; i++) {
        let row = document.createElement("tr");
        let dayCell = document.createElement("td");
        let statusCell = document.createElement("td");
        let timeCell = document.createElement("td");

        let currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + i);
        let dateStr = currentDate.toISOString().split("T")[0]; 

        dayCell.textContent = days[i];

        let status = (i === 0) ? "Holiday" : "Open"; 
        let cssClass = (i === 0) ? "holiday" : "open";
        let timing = (i === 0) ? "—" : "10:00 AM – 6:00 PM";

        if (holidayDates.includes(dateStr)) {
          status = "Holiday (Festival)";
          cssClass = "holiday";
          timing = "—";
        }

        statusCell.textContent = status;
        statusCell.classList.add(cssClass);
        timeCell.textContent = timing;

        row.appendChild(dayCell);
        row.appendChild(statusCell);
        row.appendChild(timeCell);

        // 👉 Row Click Event
        row.addEventListener("click", () => {
          if (status === "Open") {
            detailNote.innerHTML = `
              <strong>${days[i]}:</strong> Open today at <strong>${timing}</strong><br>
              Please fill the enquiry form or contact us at: <strong>+91-9876543210</strong>
            `;
            detailNote.style.display = "block";
          } else {
            detailNote.innerHTML = `
              <strong>${days[i]}:</strong> Holiday.  
              Enquiries are still accepted 24×7 on <strong>+91-9876543210</strong>
            `;
            detailNote.style.display = "block";
          }
        });

        tbody.appendChild(row);
      }
    }

    renderChart();