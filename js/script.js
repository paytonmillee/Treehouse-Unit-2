
// this function will allow you to view the page in list form with the 9 students per page the index.html has provided you with.
// The variables start and endIndex are used to determine what student objects are going to be displayyed onto the webpage.
function showPage(list, page) { 

   let startIndex = (page * 9) - 9;
   let endIndex = (page * 9);
   
   const studentList = document.querySelector('.student-list'); // The query selector get the first tag/element with class student-list
   // template literals are being used to insert data in the <h3>, <img> and <span> tags to help collect the information in the orderly fashion it is called for.
   studentList.innerHTML = '';
      for(let i = 0; i < list.length; i++){
         if(i >= startIndex && i < endIndex)  {
            const studentItem = `
            <li class="student-item cf">
                <div class="student-details">
                   <img class="avatar" src=${list[i].picture.large} alt="Profile Picture"> 
                   <h3>${list[i].name.first} ${list[i].name.last}</h3>
                   <span class="email">${list[i].email} </span>
                </div>
                <div class="joined-details">
                   <span class="date">Joined ${list[i].registered.date}</span>
                </div>
             </li>
            `
            studentList.insertAdjacentHTML("beforeend", studentItem);
         };
       
      };
   console.log(list);
   console.log(page);
}


// addPagination is strictly for adding buttons to the pages. Using Math.ceil will help calculate
// the correct amount of buttons needed for based on the 9 students per page requirement.

function addPagination(list) {
       let numOfPages = Math.ceil(list.length/9);
       console.log(numOfPages);
         const linkList = document.querySelector('.link-list');
         linkList.innerHTML = '';
         for (let i = 1; i <= numOfPages; i++) { 
            const button = 
            ` <li>
            <button type="button">${i}</button>
            </li>`
            linkList.insertAdjacentHTML("beforeend", button);
         };

         linkList.querySelector("button").className = 'active';
         linkList.addEventListener('click', function(event){
            if(event.target.tagName === "BUTTON") { 
               console.log(event)
               linkList.querySelector('.active').className = ""
               event.target.className = `active`
               showPage(data, event.target.textContent)
            }
         });
 }

 // this function is focusing on making sure the searchbar is placed at the end
 // of the header and that it is provided with a button that allows you to serarch for 
 // the names you have requested to search for. It passed the value to the filterData
function searchBar() {

   let header = document.querySelector('.header')
   header.insertAdjacentHTML('beforeend', `<label for="search" class="student-search">
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`)
   let button = header.querySelector('button')
   button.addEventListener('click', function(event) {
      console.log(event);
      let searchInput = document.getElementById('search');
      console.log(searchInput.value)
      let input = searchInput.value.toLowerCase();
      filterData(input, data);
   })
}

 // for filterData function, it is basically comparing the data againt 
 // the search value, whether it be the whole name or just three letters of the name. 
function filterData(searchInput, list) {
   // it will either give you the name you are asking for or names that are close to the letters you have provided for the search bar.
   // the toLowerCase gives you the opportunity to type in the name in any fashion 
   // and still recieve a name from the student list you are searching for.

  let filteredDataArray = [] 
   for(let i = 0; i < list.length; i++){
      let name = `${list[i].name.first.toLowerCase()} ${list[i].name.last.toLowerCase()}`
      if(name.includes(searchInput)) {
         filteredDataArray.push(list[i])
      }
   }

   // calling functions upward to run with the new filtered data
   showPage(filteredDataArray, 1)
   addPagination(filteredDataArray);
}

// Call functions
showPage(data,1);
addPagination(data);
searchBar();