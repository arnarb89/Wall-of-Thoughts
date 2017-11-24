/*jshint scripturl:true, unused:false*/
var postContainer1 = document.getElementById("postContainer1");
var postContainer2 = document.getElementById("postContainer2");
var listOfDiv;
var listOfP;

function loadSite(){
	'use strict';
	if(!postContainer1.hasChildNodes()) {
		return;
	}
	listOfDiv = postContainer1.getElementsByClassName("thePosts");
	listOfP = listOfDiv[0].getElementsByTagName("p");
	for(var i = 0;i<listOfDiv.length;i++){
		listOfP = listOfDiv[i].getElementsByTagName("p");
		createButton(listOfP[0].innerHTML,
			listOfP[1].innerHTML,listOfP[2].innerHTML,
			listOfP[3].innerHTML,listOfP[4].innerHTML,listOfP[5].innerHTML);
	}
	postContainer1.style.display = "none";	
}


loadSite();


function tester(Aid){
	'use strict';
	var DIVid = "DIV"+Aid.slice(1,Aid.length);
	var theDiv = document.getElementById(DIVid);
	if(theDiv.style.display==="none"){
		theDiv.style.display = "initial";
		document.getElementById(Aid).innerHTML = "Hide";
		document.getElementById("T"+Aid).focus();
	}
	else {
		theDiv.style.display = "none";
		document.getElementById(Aid).innerHTML = "Reply";
	}
}



document.getElementById('mainbutton').setAttribute('onClick', "mainPost()");




function dateDiffInDays(date1, date2) {
	'use strict';
	var _MIN_PER_DAY = 1000 * 60;
  	var utc1 = Date.UTC( date1.getFullYear(), date1.getMonth(), date1.getDate(),
  		date1.getHours() ,date1.getMinutes() );
  	var utc2 = Date.UTC( date2.getFullYear(), date2.getMonth(), date2.getDate(),
  		date2.getHours() ,date2.getMinutes() );
  	return (utc2 - utc1) / _MIN_PER_DAY;
}

function createButton(id,username,text,date,parent,depth){
	'use strict';
	var item = document.createElement('div');
	item.id = id;
	item.pUsername = username;
	item.className = 'thePosts2';
	if(depth%2===0){
		item.className = item.className + " evenDepth";
	} 
	else {
		item.className = item.className + " oddDepth";
	}
	item.pText = text;
	item.pDate = date;
	item.pParent = parent;
	item.pDepth = depth;
	
	var newDate = dateDiffInDays( new Date(date) ,new Date() );
	
	if(newDate<60){
		newDate = newDate;
		if(newDate===1){
			newDate = newDate + " minute ago";
		}
		else {
			newDate = newDate + " minutes ago";
		}
	}else if(newDate<60*24){
		newDate = Math.floor(newDate/60);
		if(newDate===1){
			newDate = newDate +" hour ago";
		}	
		else {
			newDate = newDate + " hours ago";
		}
	}else if(newDate<60*24*365){
		newDate = Math.floor(newDate/(60*24));
		if(newDate===1){
			newDate = newDate +" day ago";
		}
		else {
			newDate = newDate +" days ago";
		}
	}else {
		newDate = Math.floor(newDate/(60*24*365));
		if(newDate===1){
			newDate = newDate +" year ago";
		}
		else {
			newDate = newDate +" years ago";
		}
	}



	item.innerHTML = "<span class='myBold'>"+
	username+"</span>"+" | "+newDate+"<br>"+
	"<span class='postText'>"+text+"</span>";
	
	item.appendChild(document.createElement('br'));

	var theAnchor = document.createElement('a');
	theAnchor.id = "A"+id;
	theAnchor.setAttribute('href', "javascript:void(0)");
	theAnchor.setAttribute('onClick', "tester(this.id)");
	theAnchor.innerHTML = "Reply";
	item.appendChild(theAnchor);
	
	
	var theDiv = document.createElement('div');
	theDiv.id = "DIV"+id;
	theDiv.style.display = "none";

	theDiv.appendChild(document.createElement('br'));

	var theTextArea = document.createElement('textarea');
	theTextArea.id = "TA"+id;
	theDiv.appendChild(theTextArea);

	theDiv.appendChild(document.createElement('br'));

	var AnchorPost = document.createElement('a');
	AnchorPost.id = "POST"+id;
	AnchorPost.setAttribute('href', "javascript:void(0)");
	AnchorPost.setAttribute('onClick', "console.log(posting(this.id))");
	AnchorPost.innerHTML = "Post";
	theDiv.appendChild(AnchorPost);


	item.appendChild(theDiv);
	
	item.appendChild(document.createElement('br'));

	if(parent==="") {
		postContainer2.insertBefore(document.createElement('br'),
			postContainer2.childNodes[0]);
		postContainer2.insertBefore(item, postContainer2.childNodes[0]); 
	}
	else {
		document.getElementById(parent).appendChild(document.createElement('br'));
		document.getElementById(parent).appendChild(item);
	}
}

function posting(POSTid){
	'use strict';
	var id = POSTid.slice(4,POSTid.length);
	document.getElementById("hiddendepth").value = 
		parseInt(document.getElementById(id).pDepth)+1;
	document.getElementById("hiddenparent").value = parseInt(id); 
	document.getElementById("hiddentext").value = 
		document.getElementById("TA"+parseInt(id)).value;
	document.getElementById("hiddensender").click();
}

function mainPost(){
	'use strict';
	document.getElementById("hiddendepth").value = parseInt(0);
	document.getElementById("hiddenparent").value = "";
	document.getElementById("hiddentext").value = 
		document.getElementById("text").value;
	document.getElementById("hiddensender").click();
}