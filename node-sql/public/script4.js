/*<li class="flex justify-between items-center p-2  rounded cursor-pointer transition w-80" style="
    border-bottom: 1px solid #e6dfdf;"><span class="text-lg">${key}</span><span class="text-gray-600 text-sm text-right ml-3 flex flex-col" style="align-self: center;">${value.name}</span>  
</li>*/
let contactPersone=null;
let compList=null;
let historyAct = [
	{
		'date': 'Yesterday',
		'title': 'Product offer demonstration meeting',
		'rezult' : 'Demonstration delivered', 
		'notes' : 'Notes'
	},
	{
		'date': '20.03.2022',
		'title': 'RFP answeres meeting',
		'rezult' : 'RFP answers presented', 
		'notes' : 'Notes'
	}
];

let joinInfo = {
	
	'Camp':{
		"Inn": "inn",
		'Company size': "size",
		"Industry": "industry",
		"Address": "address",
		"Relationship type": "relationship_type",
		'Relationship term': "relationship_term"
	},
	'persInfo':{
		'Position':"position",
		'Decision maker': 'lpr',
		'Phone number':"telephone",
		'E-mail':"email"
	},
	'psychographicSegm':{
		'Life position':"life_position",
		'Attitude to innovations':"attitude",
		'Life values':	"values1"
	}
}

function makeCampTable(i, key,value, data){
return '<tr ' + (i%2==0?'style="background: #f9f9f9;"':'') + '><th style="width: 50%;"><b>'+key+'</b></th><th>'+ data[value]+'</th></tr>';}

function makePersoneInfo(i, key,value, data){
return '<tr><th style="width: 50%;"><b>'+key+'</b></th><th>'+ data[value]+'</th></tr>';}

function makeTable(data, func, pathInfo){
	rez='';
	i=0;
	console.log(joinInfo[pathInfo]);
	console.log(data);
	for(let [key,value] of Object.entries(joinInfo[pathInfo])){
		rez+=func(i++, key,value, data);
	}
	console.log(rez);
	return rez;
}

function makeContactPersonInfo(dataPerson){
	document.getElementById('generalInformation').innerHTML = makeTable(dataPerson, makePersoneInfo, 'persInfo');
	document.getElementById('psychographicSegmentation').innerHTML = makeTable(dataPerson, makePersoneInfo, 'psychographicSegm');
	
	document.getElementById('personImg').innerHTML = `<img src="${dataPerson.img}" style="display: block;
    min-width: 100%;
    min-height: 100%;max-width: 125%;max-height: 125%;">`;
	document.getElementById('namePepson').innerHTML = dataPerson.full_name;
	makeProductSection(dataPerson.person_id);
}

function makeContactPersonList(dataPersons){
	contactPersone=dataPersons;
	document.getElementById('myDropdown').lastElementChild.innerHTML = dataPersons.reduce(function(str, obj) {
		if(obj.is_select == 1) {
			console.log(obj);
			makeContactPersonInfo(obj);
		}
		str += `<li class="flex justify-between items-center p-2  rounded cursor-pointer transition" style="
		border-bottom: 1px solid #e6dfdf;"><span>${obj.full_name}</span><span class="text-gray-600 text-sm text-right ml-3 flex flex-col w-32" style="align-self: center;">${obj.position}</span>  </div>
		</li>`;
	return str;}, '');
	let a = document.getElementById("myDropdown").getElementsByTagName("li");
	for (i = 0; i < a.length; i++)
	a[i].addEventListener("click", function(event){document.getElementById("myInput").value = event.target.closest('li span').innerHTML;
		filterFunction();document.getElementById("myInput").focus();
	});
}

function fillingProductSection(dataProduct){
	document.getElementById('recommendedProducts').innerHTML = dataProduct.reduce((str, obj, index) => str + 
		`<li class="recom tabelForm longTabl">
		<a href="javascript:modalData(${obj.product_id});">
			<div class="contentProduct" data-toggle="modal" data-target="#exampleModal">
				<div style="width: 70px;height: 100%;position: relative;">
					<svg width="100%" height="100%" viewBox="0 0 42 42" class="donut">
						<circle stroke-dashoffset="0" stroke-width="1" stroke="${obj.stroke}" fill="${obj.fill}" r="15.91549430918954" cy="21" cx="21" stroke-dasharray="${obj.probability} ${100 - obj.probability}" class="donut-segment"></circle>
					</svg>
					<i class="fa-in-cercle ${obj.icon}" aria-hidden="true" style="color: ${obj.stroke};"></i>
				</div>
				<div class="contener-of-offers">
					<div style="text-transform: uppercase;">${obj.name}</div>
					<div style="font-size: 12px;color: #7f7f8a;">Offer propensity: ${obj.probability}%</div>
				</div>
			</div>
		</a>
	</li>`, '');
}

function fillingProductOwnership(dataProduct){
	document.getElementById('ProductOwnership').innerHTML = dataProduct.reduce((str, obj, index) => str + `<li class="recom tabelForm longTabl">
		<a href="javascript:modalData(${obj.product_id});"><div class="contentProduct" data-toggle="modal" data-target="#exampleModal"><div style="
		height: 100%;
		position: relative;">
		<svg width="70px" height="100%" viewBox="0 0 42 42" class="donut">
		<circle stroke-dashoffset="0" stroke-width="1" stroke="${obj.stroke}" fill="${obj.fill}" r="15.91549430918954" cy="21" cx="21" class="donut-segment">
		</circle>
		</svg>
		<i class="fa-in-cercle ${obj.icon}" aria-hidden="false" style="color: ${obj.stroke};"></i></div><div class="contener-of-offers"><div style="
		text-transform: uppercase;
		">
	${obj.name}</div></div></div></a></li>`, '');
}

function makeProductSection(persone_id) {
	console.log("person_id", persone_id);
	fetch('/?act=Product', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json'
		},
		params:{'act':'Product'},
	body: JSON.stringify({'persone_id': persone_id})})
	.then(function(response) {
		if(response.ok) return response.json();
		throw new Error('Request failed.');
	})
	.then(function(data) {
		fillingProductSection(data);
		
	});
	fetch('/?act=ProductOwnership', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json'
		},
		params:{'act':'ProductOwnership'},
	body: JSON.stringify({'persone_id': persone_id})})
	.then(function(response) {
		if(response.ok) return response.json();
		throw new Error('Request failed.');
	})
	.then(function(data) {
		fillingProductOwnership(data);
		
	});
}
function fillingPersoneInfo(data){
	
	document.querySelector(".scroll-area").innerHTML = historyAct.reduce((str, obj, index) => str + `<div class="vertical-timeline-item vertical-timeline-element"><span class="vertical-timeline-element-icon bounce-in"> <i class="badge badge-dot badge-dot-xl badge-warning" style="
		background-color: #35428b;
		"> </i> </span>
		<div> <span class="vertical-timeline-element-icon bounce-in"> <i class="badge badge-dot badge-dot-xl badge-success"></i> </span>
		<div class="vertical-timeline-element-content bounce-in">
		<div class="CursorPointer collapsed" data-toggle="collapse" href="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}" data-abc="true"><div class="activitiesTime">${obj.date}</div>
		<p class="timeline-title">Встреча по обсуждению очень важных вещей</p> </div>
		<div id="collapse-${index}" class="collapse" role="tabpanel" style="margin: 8px 0px;" aria-labelledby="heading-1" data-parent="#accordion" style="height: 0px;" aria-expanded="false">
		<div class="row-1"><div class="col-1"> <b>Результат:</b></div><div class="col-2"> Результат</div></div><div class="row-1"><div class="col-1"> <b>Дополнение:</b></div><div class="col-2"> Дополнения</div></div></div>
		</div>
		</div>
	</div>`, '<div class="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">') + '</div>';
	makeContactPersonList(data);
}
function modalData(id){console.log(id);
	fetch('/?act=ProductDescription', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json'
		},
		params:{'act':'ProductDescription'},
	body: JSON.stringify({'product_id': id})})
	.then(function(response) {
		if(response.ok) return response.json();
		throw new Error('Request failed.');
	})
	.then(function(data) {
		document.getElementById('productNameModal').innerHTML=data[0].name;
		document.getElementById('productDescriptionModal').innerHTML=data[0].description;
		console.log(data);
	});
};
function fillingContactPerson(comp_id){
	fetch('/?act=ContactPerson', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json'
		},
		params:{'act':'ContactPerson'},
	body: JSON.stringify({'comp_id': comp_id})})
	.then(function(response) {
		if(response.ok) return response.json();
		throw new Error('Request failed.');
	})
	.then(function(data) {
		fillingPersoneInfo(data);
		console.log(data);
	})
	
}
function fillingInfoAboutCamp(dataCompany){
	document.getElementById('NameComp').innerHTML = dataCompany.name;
	document.getElementById('analiseModal').innerHTML = '<img src="https://sun9-60.userapi.com/impg/e0a8ldEQ0_FOUAYZ2uplsqt1Jdp6OcPi7AFT8A/EI5zYzvrTPQ.jpg?size=1024x439&amp;quality=96&amp;sign=0639e1052a2bdf08ab993cb7e7c1a62a&amp;type=album" style="width: 100%;">';
	document.getElementById('analiseInfo').innerHTML = '<img src="https://sun9-60.userapi.com/impg/e0a8ldEQ0_FOUAYZ2uplsqt1Jdp6OcPi7AFT8A/EI5zYzvrTPQ.jpg?size=1024x439&amp;quality=96&amp;sign=0639e1052a2bdf08ab993cb7e7c1a62a&amp;type=album" style="width: 100%;">';
							
	document.getElementById('info-about-camp').innerHTML =  makeTable(dataCompany, makeCampTable, 'Camp');
	
}
$('#innSearchButton').click(function(event){
	fetch('/?act=searchInn', {
		method: 'POST', 
		headers: {
			'Content-Type': 'application/json'
		},
		params:{'act':'searchInn'},
	body: JSON.stringify({'inn': searchInn.value})})
	.then(function(response) {
		if(response.ok) return response.json();
		throw new Error('Request failed.');
	})
	.then(function(data) {
		fillingInfoAboutCamp(data[0]);
		fillingContactPerson(data[0].mp_id);
	})
	.catch(function(error) {
		console.log(error);
	});
});
/*
	function clearAll(){
	document.getElementById('NameComp').innerHTML = '';
	document.getElementById('info-about-camp').innerHTML =  '';
	document.getElementById('myDropdown').lastElementChild.innerHTML = '';
	document.querySelector(".scroll-area").innerHTML = '';
	document.getElementById('ProductOwnership').innerHTML = '';
	document.getElementById('generalInformation').innerHTML = '';
	document.getElementById('psychographicSegmentation').innerHTML = '';
	document.getElementById('personImg').innerHTML = '';
	document.getElementById('namePepson').innerHTML = '';
	document.getElementById('recommendedProducts').innerHTML = '';}
*/

function filterFunction(event=0) {
	var input, filter, ul, li, a, i;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	a = document.querySelectorAll("#myDropdown li span");
	
	for (i = 0; i < a.length/2; i++) {
		txtValue = a[i*2].textContent || a[i*2].innerText;
		txtValue1 = a[i*2 + 1].textContent || a[i*2 + 1].innerText;
		
		if (a[i*2].innerText.toUpperCase().indexOf(filter) > -1 || a[i*2 + 1].innerText.toUpperCase().indexOf(filter) > -1 ) {
			a[i*2].parentElement.style.display = "";
			} else {
			a[i*2].parentElement.style.display = "none";
		}
	}
	
	if(event!=0 && event.which == 13) {
		makeContactPersonInfo(contactPersone.filter(persone=>persone.full_name==input.value)[0]);
		input.value="";
		filterFunction();
		document.getElementById("myDropdown").classList.toggle("show");
	}
}
let is_short = false;
function newLoaut(){
	is_short = !is_short;
	
	document.getElementById('hideArea').classList.toggle("NoDisplay");
	document.getElementById('Additional-Section').classList.toggle("NoDisplay");
	
	document.querySelector(".mainTable").classList.toggle("ShortTable");
	
	let a = document.querySelectorAll(".longtext");
	
	for (i = 0; i < a.length; i++) {
		a[i].classList.toggle("NoDisplay");
	}
	a = document.querySelectorAll(".shortTitle");
	for (i = 0; i < a.length; i++) {
		a[i].classList.toggle("NoDisplay");
	}
	document.querySelector(".leftSideHeader").classList.toggle("highlightingTitle");
	document.getElementById('NameComp').classList.toggle("titleRight");
	document.getElementById("searchFild").classList.toggle("titleRight");
	
}


$('#buttonSearch').click(function(event){document.getElementById("myDropdown").classList.toggle("show");})
$('#myInput').click(filterFunction);
$('#myInput').keyup(filterFunction, event);
$('#searchInn').keyup(function(event){
	let inn = document.getElementById("searchInn").value;
	if(inn.length == 2) {
		let a = document.querySelector('.dropdown-menu');
		console.log(a);
		while(a.firstChild){
			console.log(a.firstChild);
			a.firstChild.remove();
			}
		return;}
	if(inn.length == 3){
		
		fetch('/?act=searchInnLike', {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json'
			},
			params:{'act':'searchInnLike'},
		body: JSON.stringify({'inn': searchInn.value})})
		.then(function(response) {
			if(response.ok) return response.json();
			throw new Error('Request failed.');
		})
		.then(function(data) {
			compList=data;
			document.querySelector('.dropdown-menu').innerHTML = data.reduce((str, obj)=>str+`<li inn='${obj.inn}' class="flex justify-between items-center p-2  rounded cursor-pointer transition w-80" style="
				border-bottom: 1px solid #e6dfdf;"><span class="text-lg">${obj.inn}</span><span class="text-gray-600 text-sm text-right ml-3 flex flex-col" style="align-self: center;">"${obj.name}"</span>  
			</li>`, '');
			
			let a = document.querySelector('.dropdown-menu').getElementsByTagName("li");
			for (i = 0; i < a.length; i++)
			a[i].addEventListener("click", function(event){document.getElementById("searchInn").value = event.target.closest('li').getAttribute('inn');});
			
		})
	}
});
$('button.iconBlock.nav-link').click(function(event){
	if(is_short) return;
	newLoaut();
});

$('#hideArea').click(function(event){
	newLoaut();
	document.querySelector(".leftSideHeader").querySelector(".active").classList.toggle("active");
	
});

let with_recom =true;

$('#addRecom').click(function(event){
	with_recom = !with_recom;
	document.getElementById('recommProductBlock').classList.toggle('NoDisplay');
	let a= document.querySelectorAll(".fourth");
	for (i = 0; i < a.length; i++)
			a[i].classList.toggle("third");
	if(with_recom)
		document.getElementById('analiseInfoBlock').setAttribute('colspan', 3);
	else
		document.getElementById('analiseInfoBlock').setAttribute('colspan', 2);
});

var down = false;

$('#bell').click(function(e){
	
	var color = $(this).text();
	document.getElementById('box').classList.toggle('NoDisplay');
	
	
})
		