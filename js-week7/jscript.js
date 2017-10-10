let curriculum_arr = ["HTML-CSS" , "CommandLine" , "JavaScript" , "JavaScript3" , "Node.js" , "databases" , "React" , "Project"];
function listRepositories(){
	console.log("you clicked me!");
	clearData();
	ShowLoader();
	makeRequest("https://api.github.com/orgs/HackYourFuture/repos" , renderHtml);
}

function searchRepository(){
	clearData();
	let repository_name = document.getElementById('repository_name').value;
	if(!repository_name){
		alert('please enter the repository name ');
		return;
	}
	let url = "https://api.github.com/repos/HackYourFuture/" + repository_name;
	ShowLoader();
	makeRequest(url , renderHtml);
}

function searchUser(){
	clearData();
	let user_name = document.getElementById('user_name').value;
	if(!user_name){
		alert('please enter the user name ');
		return;
	}
	let url = "https://api.github.com/users/" + user_name;
	ShowLoader();
	makeRequest(url , renderUser);
}

function makeRequest(theUrl, callback , param)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 ){
			let err = "";
			if(xmlHttp.status != 200){
				err = xmlHttp.statusText;
			}
			callback(xmlHttp.responseText , err , param);
		}
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();
}

function renderHtml(data , error){
	sleep(1000);//for test only to show loading
	ShowLoader();
	if(error != ""){
		console.log(error);
		document.getElementById("repository_data").innerHTML = error;
	}
	else{
		let json_arr = JSON.parse(data);
		let ul = document.createElement('ul');
		if(Array.isArray(json_arr)){
			/*for(let obj of json_arr){	
				renderRepository(obj , ul);
			}*/
			curriculum_arr = curriculum_arr.map((item) => item.toLowerCase());
			json_arr = json_arr.filter((item) => curriculum_arr.indexOf(item.name.toLowerCase()) > -1);
			json_arr.map(function(item){renderRepository(item , ul);});
		}
		else{
			renderRepository(json_arr , ul);
		}
		document.getElementById("repository_data").appendChild(ul);	
	}
}

function renderRepository(obj , ul){
	
		let li = document.createElement('li');
		ul.appendChild(li);
		
		let h3 = document.createElement('h3');
		li.appendChild(h3);
		
		let div = document.createElement('div');
		div.setAttribute("class", "details");
		li.appendChild(div);
		
		let link = document.createElement('a');
		link.setAttribute("href", "https://api.github.com/repos/HackYourFuture/" + obj.name);
		link.setAttribute("target","_blank");
		h3.appendChild(link);
		
		let r_name = document.createTextNode(obj.name);
		link.appendChild(r_name); 

		/******Links****/
		let div_links = document.createElement('div');
		div_links.setAttribute("class", "links");
		li.appendChild(div_links);
		let link1 = document.createElement('a');
		div_links.appendChild(link1);
		let spacer = document.createElement('span');
		div_links.appendChild(spacer);
		let link2 = document.createElement('a');
		div_links.appendChild(link2);
		
		link1.setAttribute("href", "https://api.github.com/repos/HackYourFuture/" + obj.name);
		link1.setAttribute("target","_blank");
		link1.innerHTML = "JSON";
		spacer.innerHTML = "&nbsp;&nbsp;|&nbsp;&nbsp;";
		link2.setAttribute("href", "https://github.com/HackYourFuture/" + obj.name);
		link2.setAttribute("target","_blank");
		link2.innerHTML = "HTML";
		/**************/
		
		let p1 = document.createElement('p');
		let p2 = document.createElement('p');
		let p3 = document.createElement('p');
		let p4 = document.createElement('p');
		let p5 = document.createElement('p');
		
		div.appendChild(p1);
		div.appendChild(p2);
		div.appendChild(p3);
		div.appendChild(p4);
		div.appendChild(p5);
		
		let label1 = document.createElement('span');
		label1.setAttribute("class", "label");
		label1.innerHTML = "Stargazers Count";
		let label2 = document.createElement('span');
		label2.setAttribute("class", "label");
		label2.innerHTML = "Watchers Count";
		let label3 = document.createElement('span');
		label3.setAttribute("class", "label");
		label3.innerHTML = "Forks Count";
		let label4 = document.createElement('span');
		label4.setAttribute("class", "label");
		label4.innerHTML = "Language";
		let label5 = document.createElement('span');
		label5.setAttribute("class", "label");
		label5.innerHTML = "Contributers";
		
		let val1 = document.createElement('span');
		val1.innerHTML = obj.stargazers_count;
		let val2 = document.createElement('span');
		val2.innerHTML = obj.watchers_count;
		let val3 = document.createElement('span');
		val3.innerHTML = obj.forks_count;
		let val4 = document.createElement('span');
		val4.innerHTML = obj.language==null?"-":obj.language;
		let val5 = document.createElement('span');
		let item_id = "repos_" + obj.id;
		val5.setAttribute("id", item_id);
		//val5.innerHTML = obj.contributors_url;
		makeRequest(obj.contributors_url, SetContributors , item_id);

		p1.appendChild(label1); 
		p1.appendChild(val1);
		p2.appendChild(label2);
		p2.appendChild(val2);
		p3.appendChild(label3);
		p3.appendChild(val3);
		p4.appendChild(label4);
		p4.appendChild(val4);
		p5.appendChild(label5);
		p5.appendChild(val5);
}
function clearData(){
	document.getElementById("repository_data").innerHTML = "";
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function ShowLoader(){
	var loaderEl = document.getElementById("resultLoader");
	loaderEl.classList.toggle("invisible");
}
function SetContributors(data , error , item_id){
	let item = document.getElementById(item_id);
	if(error != ""){
		item.innerHTML = "error";
	}
	else{
		/*let contributors_arr = [];
		let arr = JSON.parse(data);
		for(let obj of arr){	
			contributors_arr.push(obj.login);
		}
		item.innerHTML = "<br>" + contributors_arr.join(' - ');*/
		let json_arr = JSON.parse(data);
		item.innerHTML = "<br>" + json_arr.reduce( (result , item)=> {return result + item.login + ", "} , "");
	}
}
function renderUser(data,error){
	sleep(1000);//for test only to show loading
	ShowLoader();
	if(error != ""){
		console.log(error);
		document.getElementById("repository_data").innerHTML = error;
	}
	else{
		let obj = JSON.parse(data);
		let ul = document.createElement('ul');
		let li = document.createElement('li');
		ul.appendChild(li);
		
		let h3 = document.createElement('h3');
		li.appendChild(h3);
		h3.innerHTML = obj.login
		
		let div = document.createElement('div');
		div.setAttribute("class", "details");
		li.appendChild(div);
		
		let p1 = document.createElement('p');
		let p2 = document.createElement('p');
		
		div.appendChild(p1);
		div.appendChild(p2);
		
		let label1 = document.createElement('span');
		label1.setAttribute("class", "label");
		label1.innerHTML = "Public Repos";
		
		let val1 = document.createElement('span');
		val1.innerHTML = obj.public_repos;
		
		p1.appendChild(label1); 
		p1.appendChild(val1);
		
		let avatar = document.createElement('img');
		avatar.setAttribute("src", obj.avatar_url);
		avatar.setAttribute("class", "avatar");
		
		p2.appendChild(avatar);
		
		document.getElementById("repository_data").appendChild(ul);	
	}
}