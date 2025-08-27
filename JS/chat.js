/*
  WhatsApp-style Chat Widget
  - Click floating icon to open/close
  - Quick links trigger canned replies
  - Basic pattern-matching for replies
  - If bot can't answer, show "Can't help? Fill enquiry" button
  - Saves conversation to localStorage
*/

const waToggle = document.getElementById('waToggle');
const chatPanel = document.getElementById('chatPanel');
const closeChat = document.getElementById('closeChat');
const messages = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const quickLinks = document.getElementById('quickLinks');
const enquiryPanel = document.getElementById('enquiryPanel');
const enquiryForm = document.getElementById('enquiryForm');

let conversation = []; // {from: 'bot'|'user', text: '...' , t: timestamp}

// ---------- CANNED KNOWLEDGE ----------
const canned = [
  {keys: ['hi','hello','hey','hai','hlo'], reply: "Hello! What can I help you with today? 😊\nYou can ask about Products, Pricing, Contact or Working Hours."},
  {keys: ['products','product','catalog'], reply: "We have these categories: <a href ='https://harsh51622.github.io/HavronSwitchgears/items/capacitor.html' target='_blank'>Capacitors</a> , <a href ='https://harsh51622.github.io/HavronSwitchgears/items/mcb.html' target='_blank'>MCBs</a> , <a href ='https://harsh51622.github.io/HavronSwitchgears/items/double.html' target='_blank'>Double Door</a>. Want to see details for any?<a href ='https://harsh51622.github.io/HavronSwitchgears/MAIN/products.html' target='_blank'>All Products</a>" },
  {keys: ['about','company','who are you'], reply: "We are Acme Corp — quality products since 2010. Visit our <a href ='https://harsh51622.github.io/HavronSwitchgears/MAIN/about us.html' target='_blank'>About us</a> for more."},
  {keys: ['contact','phone','call','email'], reply: "You can reach us at +91-98765-43210 or email support@example.com. Want to fill an enquiry? <a href ='https://harsh51622.github.io/HavronSwitchgears/MAIN/contact us.html#enquiryModal' target='_blank'>Time Table</a>." },
  {keys: ['pricing','price','cost','rate'], reply: "Pricing depends on the product. For quick quotes, tell me product name or click 'Enquiry' to request a quote."},
  {keys: ['hours','time','open','working'], reply: "We are open Mon–Sat, 9:30 AM to 7:30 PM IST And More Information click this - <a href ='https://harsh51622.github.io/HavronSwitchgears/MAIN/contact us.html#timingTable' target='_blank'>Time Table</a>."},
  {keys: ['thanks','thank you','thx'], reply: "You're welcome! If you need anything else, just ask."},
];

// ---------- UTIL ----------
function nowStr(){ return new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}); }

function addMessage(from, text, save=true){
  const el = document.createElement('div');
  el.className = 'msg ' + (from === 'bot' ? 'bot' : 'user');
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  // allow multiline messages
  bubble.innerHTML = text.replace(/\n/g,'<br>');
  el.appendChild(bubble);
  const t = document.createElement('div');
  t.className = 'time';
  t.textContent = nowStr();
  el.appendChild(t);
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight - messages.clientHeight + 100;
  if(save){
    conversation.push({from, text, t: Date.now()});
    localStorage.setItem('wa_conversation_v1', JSON.stringify(conversation));
  }
}

// Load saved
(function loadSaved(){
  try{
    const saved = JSON.parse(localStorage.getItem('wa_conversation_v1') || '[]');
    if(saved && saved.length){
      conversation = saved;
      for(const m of conversation){
        addMessage(m.from, m.text, false);
      }
    } else {
      // welcome message
      setTimeout(()=> addMessage('bot', "Hi! 👋 I'm here to help. What can I help you?"), 400);
    }
  }catch(e){
    console.warn(e);
  }
})();

// ---------- OPEN/CLOSE ----------
waToggle.addEventListener('click', ()=> {
  const open = chatPanel.style.display === 'flex';
  if(open){
    chatPanel.style.display = 'none';
  } else {
    chatPanel.style.display = 'flex';
    // focus input on small delay
    setTimeout(()=> userInput.focus(), 250);
  }
});

closeChat.addEventListener('click', ()=> {
  chatPanel.style.display = 'none';
});

// ---------- SEND MESSAGE HANDLING ----------
function processUserMessage(text){
  text = text.trim();
  if(!text) return;
  addMessage('user', text);
  userInput.value = '';
  // simple matching
  const low = text.toLowerCase();
  let found = null;
  for(const k of canned){
    for(const token of k.keys){
      if(low.includes(token)){
        found = k.reply;
        break;
      }
    }
    if(found) break;
  }

  if(found){
    // simulate typing delay
    setTimeout(()=> addMessage('bot', found), 500);
  } else {
  setTimeout(() => {
    // Create fallback message manually (not using addMessage)
    const el = document.createElement('div');
    el.className = 'msg bot';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerHTML = `
      Sorry, I couldn't understand that. 🤖<br>
      Would you like to fill out an enquiry form?
    `;

    // Create enquiry button
    const btn = document.createElement('button');
    btn.textContent = '📩 Fill Enquiry Form';
    btn.style.marginTop = '8px';
    btn.style.padding = '8px 12px';
    btn.style.borderRadius = '6px';
    btn.style.border = '1px solid #ccc';
    btn.style.background = '#25d366';
    btn.style.color = 'white';
    btn.style.cursor = 'pointer';

    btn.addEventListener('click', () => toggleEnquiry(true));

    // Append button to bubble
    bubble.appendChild(btn);
    el.appendChild(bubble);

    // Add time
    const t = document.createElement('div');
    t.className = 'time';
    t.textContent = nowStr();
    el.appendChild(t);

    // Append to chat
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight - messages.clientHeight + 100;

    // Save to localStorage
    conversation.push({ from: 'bot', text: 'fallback: enquiry prompt', t: Date.now() });
    localStorage.setItem('wa_conversation_v1', JSON.stringify(conversation));
  }, 500);
}}


// send via button or enter
sendBtn.addEventListener('click', ()=> {
  processUserMessage(userInput.value);
});
userInput.addEventListener('keydown', (e)=> {
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    processUserMessage(userInput.value);
  }
});

// Quick links click
quickLinks.addEventListener('click', (e)=>{
  const btn = e.target.closest('button');
  if(!btn) return;
  const q = btn.dataset.q;
  userInput.value = q;
  processUserMessage(q);
});

// ---------- Enquiry handling ----------
function toggleEnquiry(show){
  if(show){
    enquiryPanel.style.display = 'block';
    // for narrow screens put under chat
    if(window.innerWidth < 520){
      enquiryPanel.style.right = '12px';
      enquiryPanel.style.bottom = '12px';
      enquiryPanel.style.width = 'calc(100% - 24px)';
    } else {
      enquiryPanel.style.right = (20 + chatPanel.offsetWidth) + 'px';
      enquiryPanel.style.bottom = '96px';
      enquiryPanel.style.width = '320px';
    }
  } else {
    enquiryPanel.style.display = 'none';
  }
}
window.toggleEnquiry = toggleEnquiry;

enquiryForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = new FormData(enquiryForm);
  const obj = Object.fromEntries(data.entries());
  // show confirmation in chat
  addMessage('user', `Enquiry: ${obj.subject}`);
  addMessage('bot', "Thanks — your enquiry has been submitted. Our team will contact you soon.");
  toggleEnquiry(false);
  enquiryForm.reset();
  // Here you would send the enquiry to server via fetch/AJAX.
  // For demo we just log to console.
  console.log('Enquiry sent (demo):', obj);
});

// small enhancement: open enquiry if user types 'enquiry' or 'contact form'
userInput.addEventListener('input', ()=>{
  const v = userInput.value.toLowerCase();
  if(v.includes('enquiry') || v.includes('enquire') || v.includes('contact form')){
    // subtle hint
    document.getElementById('botStatus').textContent = 'Tip: type "Open enquiry" or click the Enquiry button.';
  } else {
    document.getElementById('botStatus').textContent = 'Usually replies within a minute';
  }
});

// accessibility: close panels on ESC
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    chatPanel.style.display = 'none';
    toggleEnquiry(false);
  }
});