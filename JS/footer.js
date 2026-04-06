const WHATSAPP_NUMBER = "+91 7290802596";

  document.getElementById("waCopy").addEventListener("click", async () => {
    const num = WHATSAPP_NUMBER.replace(/\s+/g,"");
    try{
      if(navigator.clipboard?.writeText){ await navigator.clipboard.writeText(num); }
      else{
        const ta=document.createElement("textarea"); ta.value=num; ta.style.position="fixed"; ta.style.opacity="0";
        document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
      }
      alert("Phone no. copied!");
    }catch(e){ alert("Copy failed! Number: "+num); }
  });

