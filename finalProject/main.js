window.onload = function () {
	var urlOne = 'https://swapi.co/api/people/?page=1';
	urlSecond = 'https://swapi.co/api/people/?page=2';
	urlThird = 'https://swapi.co/api/people/?page=3';
	urlFourth = 'https://swapi.co/api/people/?page=4';
	urlFifth = 'https://swapi.co/api/people/?page=5';
	urlSixth = 'https://swapi.co/api/people/?page=6';
	urlSeventh = 'https://swapi.co/api/people/?page=7';
	urlEighth = 'https://swapi.co/api/people/?page=8';
	urlNinth = 'https://swapi.co/api/people/?page=9';
	var url = 'https://swapi.co/api/people/'
	var urlArr = [urlOne, urlSecond, urlThird, urlFourth, urlFifth, urlSixth, urlSeventh, urlEighth, urlNinth];
	var btnPrevious = document.querySelector('#previous');
	var	btnNext = document.querySelector('#next');
	var buttonsContainer = document.querySelector('buttons');
	var back = document.querySelector("#backToList");
	var count = 0; 
	var mainDiv = document.querySelector('.persons');
	var list = document.createElement('ul');
	list.classList.add("personsDescription");
	mainDiv.appendChild(list);	
	var liItem = document.querySelector("li");

	function getResponse (urlList) {
		 fetch(`${urlList}`).then(response => response.json())
	  .then(function (content) {
	  	for (var key of content.results) {
        var liItem = document.createElement("li");
        liItem.classList.add("liElement")
        liItem.innerText = key.name;
        liItem.dataset.name = key.name;
        liItem.dataset.gender = key.gender;
        liItem.dataset.birth_year = key.birth_year;
        liItem.dataset.homeworld = key.homeworld;
        liItem.dataset.species = JSON.stringify(key.species);
        liItem.dataset.films = JSON.stringify(key.films);
        list.appendChild(liItem)
        mainDiv.appendChild(list)
       };
	  });
	} 
	getResponse(urlOne);
	btnNext.onclick = function () {
		if (count <= urlArr.length - 2) {
			list.innerHTML = ' ';
			count++;
			getResponse(urlArr[count]);
		}	else {
			alert("The character list is over!")
		}
	}
	btnPrevious.onclick = function () {
		count--;
		if (count >= 0 ) {
			list.innerHTML = ' ';
			getResponse(urlArr[count]);
		} else {
			alert("You are on the first page!")
			count++
		}
	}
	list.onclick = function (e) {
		btnNext.hidden = true;
		btnPrevious.hidden = true;
		back.hidden = false;
		back.style.visibility = "visible";
		back.onclick = function () {
			list.innerHTML = " ";
			table.innerHTML = " ";
			getResponse(urlArr[count]);
			btnNext.hidden = false;
			btnPrevious.hidden = false;
			back.hidden = true; 
		}
    var target = e.target;
    mainDiv.innerHTML = `<table>
      <tr>
        <th width="200px">Name</th>
        <th width="100px">Year of birth</th>
        <th>Gender</th>
        <th>Planet</th>
        <th width="220px">Films</th>
        <th>Species</th>
      </tr>
    </table>`;
    var table = document.querySelector("table");
    var tbody = table.lastElementChild.firstElementChild;
    if (target.tagName == "LI") {
      table.innerHTML += `
        <tbody>
          <tr>
            <td><h3>${target.dataset.name}</h3></td>
            <td>${target.dataset.birth_year}</td>
            <td>${target.dataset.gender}</td>           
          </tr>
        </tbody>
       `
    }
    var tbody = table.lastElementChild.firstElementChild;
		var homePlanet = document.createElement('td');
		fetch(target.dataset.homeworld).then(response => response.json())
		.then(function (content) {
			homePlanet.innerHTML = content.name;
		})
		var filmsRequest = JSON.parse(target.dataset.films);	
		var filmsRezult = document.createElement('ol');
		var filmTd = document.createElement('td')
		filmTd = table.lastElementChild.firstElementChild;
		for(var i = 0; i < filmsRequest.length; i++) {
			fetch(filmsRequest[i]).then(response => response.json())
			.then(function (content) {
				filmsRezult.innerHTML += `<th>
					<li class="filmsLi">${content.title}</li>
				</th>`
			})
		}
		var speciesRequest = JSON.parse(target.dataset.species);
		var speciesRezult = document.createElement('td')
		for(var i = 0; i < speciesRequest.length; i++) {
			fetch(speciesRequest[i]).then(response => response.json())
			.then(function(content) {
				speciesRezult.innerHTML += content.name;
			})
		}
		tbody.appendChild(homePlanet);
		filmTd.appendChild(filmsRezult);
		tbody.appendChild(speciesRezult);
  }
}