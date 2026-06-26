let members = JSON.parse(localStorage.getItem("members")) || [];

displayMembers();

function addMember(){

let name = document.getElementById("name").value;
let age = document.getElementById("age").value;
let weight = document.getElementById("weight").value;
let height = document.getElementById("height").value;
let expiry = document.getElementById("expiry").value;

if(!name || !age || !weight || !height || !expiry){
alert("Fill all fields");
return;
}

let bmi = (
weight /
((height/100)*(height/100))
).toFixed(1);

members.push({
name,
age,
bmi,
expiry
});

localStorage.setItem(
"members",
JSON.stringify(members)
);

displayMembers();
}

function displayMembers(){

let table = document.getElementById("memberTable");

table.innerHTML="";

members.forEach((member,index)=>{

table.innerHTML += `
<tr>
<td>${member.name}</td>
<td>${member.age}</td>
<td>${member.bmi}</td>
<td>${member.expiry}</td>
<td>
<button onclick="deleteMember(${index})">
Delete
</button>
</td>
</tr>
`;

});

document.getElementById("memberCount").innerText =
members.length;

checkExpiry();
}

function deleteMember(index){

members.splice(index,1);

localStorage.setItem(
"members",
JSON.stringify(members)
);

displayMembers();
}

function searchMember(){

let input =
document.getElementById("search")
.value.toLowerCase();

let rows =
document.querySelectorAll("#memberTable tr");

rows.forEach(row=>{

let text =
row.innerText.toLowerCase();

row.style.display =
text.includes(input) ? "" : "none";

});
}

function checkExpiry(){

let today = new Date();

let count = 0;

members.forEach(member=>{

let exp =
new Date(member.expiry);

let diff =
(exp - today) /
(1000*60*60*24);

if(diff <= 7){
count++;
}

});

document.getElementById("expiringCount")
.innerText = count;
}

document.getElementById("attendanceCount")
.innerText =
Math.floor(Math.random()*50)+1;