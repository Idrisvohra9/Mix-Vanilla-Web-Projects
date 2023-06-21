// This array stores recent calls:
let recentCalls = [];
let subhead = document.getElementById("subHeads");
let subhead2 = document.getElementById("recentCalls");
let addContact = document.getElementById("addContact");
let moreOpts = document.getElementById("moreOpts");
let input = document.getElementById("search");
let contacts = [];


// If the contacts are not defined initialize it as null
if (localStorage.contacts == undefined && localStorage.recentCalls == undefined) {
  localStorage.contacts = JSON.stringify([]);
  localStorage.recentCalls = JSON.stringify([]);
}
else {
  contacts = Array(JSON.parse(localStorage.contacts)).flat(2);
  recentCalls = Array(JSON.parse(localStorage.recentCalls)).flat(2);
}

let Contact_page = document.getElementById("C");
let Name = document.getElementById("Name");
let Num = document.getElementById("Number");

// Tabs Stuff:
document.getElementsByClassName("tabs")[2].click();
let tabContents = document.getElementsByClassName("tab-contents");

for (c = 1; c < tabContents.length; c++) {
  tabContents[c].style.display = "none";
}
showContact();
showRecentCalls();
let inputTypes = document.querySelectorAll("input[type=text], input[type=number]");
for (it = 0; it < inputTypes.length; it++) {
  inputTypes[it].addEventListener("focus", () => window.removeEventListener("keydown", KeyShortCuts));
}

function KeyShortCuts(e) {
  if (e.key == 's') {
    input.focus()
    input.value = "";
  }
  if (e.ctrlKey && e.key == "a") {
    document.getElementById("addButton").click()
  }
  if (e.key == "m") {
    document.getElementById("more").click()
  }
}
window.addEventListener("keydown", KeyShortCuts);

function openTab(e) {
  let tabs = document.getElementsByClassName("tabs");
  let c = document.getElementById("c");
  let r = document.getElementById("r");
  let k = document.getElementById("k");
  let currnt = e.currentTarget;

  if (currnt.innerText == "Recent") {
    c.style.display = "none";
    k.style.display = "none";
    r.style.display = "";
  }

  else if (currnt.innerText == "Keypad") {
    c.style.display = "none";
    r.style.display = "none";
    k.style.display = "";
  }

  else {
    r.style.display = "none";
    k.style.display = "none";
    c.style.display = "";
  }
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].className = tabs[i].className.replace(" active", "");
  }

  // console.log(currnt);
  currnt.className += " active";
}

function SearchContacts() {
  var filter, CName, CNum;
  filter = input.value.toUpperCase();

  const c = document.getElementsByClassName("contact");
  const arr_Contacts = [...c]
  for (let i = 0; i < c.length; i++) {
    CName = c[i].children[2].innerHTML;
    CNum = c[i].children[3].innerHTML;
    c[i].style.display = "none";
    if (CName.toUpperCase().includes(filter) || CNum.toUpperCase().includes(filter)) {
      c[i].style.display = "flex";
    }
  }
  if (input.value == "") {
    arr_Contacts.map((c) => c.style.display = "flex");
  }
}

function EnterKeySave(e) {
  if (e.key == "Enter") {
    Save();
  }
}

function showAddContactDialog() {
  let dialog = document.getElementById("addContact");
  dialog.style.display = "flex";
}

function Back(param) {
  param.style.display = "none";
}

function Save() {
  // if the Name or Num field are empty it throws an warningMsg:
  let warningMsg = document.getElementById("warningMsg");
  if (Name.value == "" || Num.value == "") {
    warningMsg.innerHTML +=
      "The fields cannot be empty.";
  }
  else {
    makeNewContacts();
    window.location.reload();
    // showContact();
  }
}

function makeNewContacts() {
  contacts = Array(JSON.parse(localStorage.contacts)).flat(2)
  contacts.push({ Cname: Name.value, Cno: "+91 " + Num.value });

  localStorage.contacts = JSON.stringify(contacts);

  Name.value = "";
  Num.value = "";
  showContact();
}

function addToContact(cArr) {
  for (let j = 0; j < cArr.length; j++) {
    var headIndicator = document.createElement("div");
    headIndicator.className = "headIndicator";
    headIndicator.innerHTML = cArr[j].Cname[0].toUpperCase();
    var contact = document.createElement("div", className = "contact");
    contact.className = "contact"

    contact.innerHTML =
      `
        <img src="Images/people.svg" alt="People" id="people" />
        <input type='hidden' value='${j}'/>
        <span id="name">${cArr[j].Cname}</span>
        <span id="number">${cArr[j].Cno}</span>
        <div class="ContactOpts">
          <img src="Images/call.svg" alt="call" id="call" class="innerBtns" onclick="call(this)" title="Call"/>
          <img
            src="Images/info-svgrepo-com.svg"
            alt="info"
            id="info"
            class="innerBtns"
            onclick="ContactInfo(this)"
            data-bs-toggle="modal" 
            data-bs-target="#contactInfo"
            title="Show Info"
            />
            <a href='' title="Message">
            <img src="Images/message-text.svg" alt="message" id="message" class="innerBtns" title='Send a Message'/>
            </a>
        </div>
          `;

    headIndicator.append(contact);
    subhead.append(headIndicator);

  }
}

function showContact() {
  if (contacts == "") {
    subhead.innerHTML = "No contacts are saved.. Click the plus button to add new contacts.";
  }
  else {
    contacts = Sort(contacts);
    addToContact(contacts);
  }
}
function showRecentCalls() {
  if (recentCalls == "") {
    subhead2.innerHTML = "No recent calls have been made.. Call records will be shown here.";
  }
  else {
    subhead2.innerHTML = "";
    for (let i = 0; i < recentCalls.length; i++) {
      subhead2.innerHTML +=
        `
      <div class="contact">
        <img src="Images/people.svg" alt="People" id="people" />
        <input type='hidden' value='${i}'/>
        <span id="name">${recentCalls[i].Cname}</span>
        <span id="number">${recentCalls[i].Cno}</span>
        <span id="time">${recentCalls[i].time}</span>
        <div class="ContactOpts">
          <img src="Images/call.svg" alt="call" id="call" class="innerBtns" onclick="call(this)" title="Re-call"/>
        </div>
      </div>
      `;
    }
  }
}

function showMoreOptionsDialog() {
  let dialog = document.getElementById("MO");
  // <!-- svg is for the back arrow -->
  dialog.innerHTML =
    `
    <div id='moreOpts'>
    <span 
    onclick="Info();"
    data-bs-toggle="modal" 
    data-bs-target="#Info">Info</span>
    <span onclick='clearRecentCalls()'>Clear Recent Calls</span>
    <span onclick='select()'>Select</span>
    <span onclick='selectCall()'>Call</span>
    <span onclick='Back(this.parentNode)'>
    <img src='Images/back.svg' class='backArrow'/>
    Back</span>
    </div>`;
}
function call(param) {
  let currentName = param.parentNode.parentNode.children[2].innerHTML;
  let currentNum = param.parentNode.parentNode.children[3].innerHTML;
  let calling = document.getElementById("showCalling");
  const d = new Date();
  // This will make it so it calls only one person at a time.
  calling.innerHTML = "";
  calling.style.display = "flex";
  calling.innerHTML +=
    `
      <div id="placeName">${currentName}</div>
      <div id="placeNum">${currentNum}</div>
      <img src="Images/speaker-svgrepo-com.svg" alt="" class="btns">
      <img src="Images/video-video-call-camera-record-svgrepo-com.svg" alt="" class="btns">
      <img src="Images/call.svg" alt="" class="btns EndCall" onclick="EndCall()">
  `;
  recentCalls = Array(JSON.parse(localStorage.recentCalls)).flat(2)
  recentCalls.push({ Cname: currentName, Cno: currentNum, time: d.toLocaleTimeString() });

  localStorage.recentCalls = JSON.stringify(recentCalls);
  showRecentCalls();
}

function EndCall() {
  let calling = document.getElementById("showCalling");
  calling.innerHTML = "";
  calling.style.display = "none";
}


function ContactInfo(param) {
  let addInfo = document.querySelector(".addInfo");
  let id = param.parentNode.parentNode.children[1].value;
  let name = param.parentNode.parentNode.children[2].innerHTML;
  let num = param.parentNode.parentNode.children[3].innerHTML;
  console.log(id);
  let info = `
  <div class='d-flex justify-content-center align-items-md-center flex-column'>
  <div><h4>Name: ${name}</h4></div>
  <div><h4>Number: ${num}</h4></div>
  </div>
  `;
  addInfo.innerHTML = info;
  let del = document.querySelector(".del");
  del.addEventListener("click", Delete(id))
}

function Sort(contacts) {
  let c = contacts;
  c = c.sort((a, b) => a.Cname.localeCompare(b.Cname));
  return c;
}

function Info(){
  let info = document.querySelector(".Info");
  info.innerHTML = `
  <h3 class='creator'>-- Created By Idris Vohra</h3>
  <p>Total Contacts: ${contacts.length}</p>
  <div class='btn btn-danger'
  data-bs-toggle="modal" 
  data-bs-target="#DeleteAll">Delete All Records</div>
  `;
}

function Delete(id) {

}

function select(){
  subhead.className += "select";
  
}

function selectCall(){

}

function DeleteAll(){
  localStorage.recentCalls = JSON.stringify([]);
  localStorage.contacts = JSON.stringify([]);
}

function clearRecentCalls(){
  localStorage.recentCalls = JSON.stringify([]);
}

// Logic for entering the number preesed frim keys to the keypadField:

let keys = document.getElementsByClassName("keys");
let keypadField = document.getElementById("keypadField");

for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener("click", function (event) {
    keypadField.value += event.target.innerText;
  });
}

function BackSpace() {
  keypadField.value = keypadField.value.substring(0, keypadField.value.length - 1);
  // console.log(keypadField.innerHTML.length-1);
}
