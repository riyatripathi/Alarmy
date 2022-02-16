console.log('alarmy');

let displayhours = document.querySelector('.displayhours');
let displayminutes = document.querySelector('.displayminutes');
let displaysecs = document.querySelector('.displaysecs');

// audio id's
	let turnoffalert = document.querySelector('#turnoffalert');
	let turnoffbutton = document.querySelector('#turnoffbutton');
	let alertp = document.querySelector('#alertp');
	let audio = document.querySelector('#audio');

let hoursbar = document.querySelector('.hoursbar');
let minutesbar = document.querySelector('.minutesbar');
let secondsbar = document.querySelector('.secondsbar');

// TIMER & LOADER BARS
let totalsec = 0;totalmin = 0;totalhour = 0;
setInterval(function(){
	let today = new Date();
	displayhours.innerHTML = `${today.getHours()} <span class="spandisplay">Hours</span>`;
	displayminutes.innerHTML = `${today.getMinutes()} <span class="spandisplay">Mins</span>`;
	displaysecs.innerHTML = `${today.getSeconds()} <span class="spandisplay">sec</span>`;
	alertp.innerHTML = `Hurry up! Its ${today.getHours()} <span class="spandisplay">Hours</span>:${today.getMinutes()} <span class="spandisplay">Mins</span>`;
	const sec = new Date().getSeconds();
	if(sec == 59) secondsbar.style.height = `100%`;
	if(sec == 60){
		secondsbar.style.height = `100%`;
	 	totalsec = 0;
	 }
	totalsec = sec*(1.6);
	secondsbar.style.height = `${totalsec}%`;
	const min = new Date().getMinutes()*60;
	if(min == 3600){
		secondsbar.style.height = `100%`;
	 	totalmin = 0;
	 }
	totalmin = min*(0.027);
	minutesbar.style.height = `${totalmin}%`;
	const hour = new Date().getHours()*60*60;
	if(hour == 86400){
		secondsbar.style.height = `100%`;
	 	totalhour = 0;
	 }
	totalhour = hour*(0.0011574);
	hoursbar.style.height = `${totalhour}%`;

	if(audio.loop == true){
		// console.log('true');
		turnoffalert.style.display = 'block';
	}else{
		// console.log('false');
		turnoffalert.style.display = 'none';
	}
} ,1000);




dictionary = {};
// PLUSSS SIGN TO ADD ALARMS
let pluss = document.querySelector('.pluss');
pluss.addEventListener("click",function(){
	
	document.querySelector('.takeinput').style.display = 'block';
  	document.querySelector('.takeinput').style.display = 'flex';

})


// SET BUTTON FOR ALARM
let counter = 0;
let set = document.querySelector('#set');
  	set.addEventListener("click",function(){
  		document.querySelector('.takeinput').style.display.value = '';
  		let sethours = document.querySelector('#sethours');
  		let setminutes = document.querySelector('#setminutes');
  		
		let setH = sethours.value;
		let setM = setminutes.value;
        document.querySelector('.takeinput').style.display = 'None';
        let date = new Date();
        let alarmtime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), setH, setM,0).getTime();
        let nowtime = date.getTime();
        console.log(alarmtime,nowtime);
		var div = document.createElement("div");
		div.innerHTML =`<div id="hms${++counter}" class="btn-group hms" role="group" aria-label="Basic mixed styles example">
					<button type="button" class="btn btn-danger sethours reddy">${setH} HOURS</button>
			  		<button type="button" class="btn btn-warning setminutes oggy">${setM} MINUTES</button>
			  		<i id="delete${counter}" class="fas fa-trash-alt beautifyicon trash" style="font-size:30px;margin-top: 3px;"></i>
				</div>`; 
				
  		document.getElementById("setalarm").appendChild(div);

  		let delicon = document.getElementById(`delete${counter}`);
  		let divid = document.getElementById(`hms${counter}`);
  		dictionary[divid.id] = alarmtime;
		DeleteAlarm(divid,delicon);
  	})


  	function DeleteAlarm(divid,delicon){
  		delicon.addEventListener("click",function(){
  			audio.loop = false;
	  		console.log("delararm audioloop:",audio.loop);
	  		audio.pause();
	  		turnoffalert.style.display = 'none';
  			divid.remove();
  			delete dictionary[divid.id];
  		})
  	}


let flag = 0;	
let deleteit = setInterval(function(){
  	for (let key of Object.keys(dictionary)) {
  		let value = dictionary[key];
  		let now = new Date().getTime();
  		console.log(now,value);
		if(now >= value && /*now+10 > value*/value + 1000 > now){
		  	ALARM(key);
		}
 	}
},1000);

function ALARM(key){
	audio.loop = true;
	audio.play();
	setInterval(function(){
		turnoffbutton.addEventListener("click",function(){
			turnoffalert.style.display = 'None';
			audio.pause();
			audio.loop = false;
			console.log('clicked turnoff button',audio.loop);
			// console.log('flagG:',flag);
			document.getElementById(key).remove();
			delete dictionary[key];
		})
	},1000);
		let myTimeout = setTimeout(function(){
			audio.loop = false;
			audio.pause();
			if(flag == 0){
				turnoffalert.style.display = 'None';
				// console.log('flagG:',flag);
				document.getElementById(key).remove();
				delete dictionary[key];
				flag = 1;
			}
		},30000);
}