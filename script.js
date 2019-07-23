// Begin book database manipulation
const bookTable = document.querySelector('#book-table-body');

var doc_id = '';

function renderBook(doc) {
  let tr = document.createElement('tr');
  let isbn = document.createElement('td');
  let title = document.createElement('td');
  let semester = document.createElement('td');
  let course_num = document.createElement('td');
  let course_title = document.createElement('td');
  let course_lead = document.createElement('td');
  let course_lead_name = document.createElement('td');
  let notes = document.createElement('td');
  let hidden_tab = document.createElement('td');
  hidden_tab.classList.add('isLogged');

  let removeButton = document.createElement('button');
  removeButton.innerText="Delete";
  removeButton.classList.add('btn');
  removeButton.classList.add('btn-danger');
  removeButton.classList.add('dlt_btn');  

  let editButton = document.createElement('button');
  editButton.innerText = "Edit";
  editButton.classList.add('btn');
  editButton.classList.add('btn-primary');
  editButton.classList.add('edit_btn');  
  editButton.dataset.target = "#edit_book";
  $(editButton).attr("data-toggle", "modal");

  tr.setAttribute('data-id', doc.id);
  isbn.textContent = doc.data().isbn;
  title.textContent = doc.data().title;
  semester.textContent = doc.data().semester;
  course_num.textContent = doc.data().course_num;
  course_title.textContent = doc.data().course_title;
  course_lead.textContent = doc.data().course_lead;
  course_lead_name.textContent = doc.data().course_lead_name;
  notes.textContent = doc.data().notes;

// Edit button
  
editButton.onclick = function() {
  doc_id = doc.id;
  console.log("Edit button clicked for doc", doc.id);
  
}

console.log(doc_id);
  
// Remove button

removeButton.onclick = function() {

	db.collection("books").doc(doc.id).delete().then(function() {
    console.log("Document successfully deleted!");
	renderAllBooks();
	}).catch(function(error) {
    console.error("Error removing document: ", error);

});
			
}

function editBook() {
  db.collection("books").doc(doc_id).update({
    isbn: 0,
  });
  renderAllBooks();
}

  //add book
  
  hidden_tab.appendChild(editButton);
  hidden_tab.appendChild(removeButton);
  //hidden_tab.innerHTML = '<button class="btn btn-primary edit_btn">edit</button> <button onclick=remove(doc) class="btn btn-danger dlt_btn">delete</button>';

  tr.appendChild(isbn);
  tr.appendChild(title);
  tr.appendChild(semester);
  tr.appendChild(course_num);
  tr.appendChild(course_title);
  tr.appendChild(course_lead);
  tr.appendChild(course_lead_name);
  tr.appendChild(notes);
  tr.appendChild(hidden_tab);

  bookTable.appendChild(tr);
}

function addbook(){
	
  console.log("hi")
  
  db.collection('books').add({
    isbn: document.getElementById("isbn").value,
    title: document.getElementById("title").value,
    semester:document.getElementById("semester").value,
    course_num: document.getElementById("C-num").value,
    course_title:document.getElementById("C-title").value,
    course_lead: document.getElementById("C-lead").value,
    course_lead_name:document.getElementById("C-lead name").value,
    notes: document.getElementById("notes").value,
  }).then(function(){
  //document.location.reload(true)
  // clears value of text fields
	document.getElementById("isbn").value = '';
  document.getElementById("title").value = '';
  document.getElementById("semester").value = '';
  document.getElementById("C-num").value = '';
  document.getElementById("C-title").value = '';
  document.getElementById("C-lead").value = '';
  document.getElementById("C-lead name").value = '';
  document.getElementById("notes").value = '';
	renderAllBooks();
	
})


		
		//document.location.reload(true)
}
  //deleting books
 /*
function remove(doc){
	doc.stopPropagation();
		let id = doc.target.parentElement.getAttribute('tr');
		db.collection('data-id').doc(id).delete();
}
*/

/*
db.collection('books').add({
  isbn: "421342314",
  title: "something",
  semester: "something",
  course_num: "something",
  course_title: "421342314",
  course_lead: "421342314",
  course_lead_name: "421342314",
  notes: "421342314",
})*/

// This refreshes the page -> gotta fix this with AJAX though.

function renderAllBooks(){
	bookTable.innerHTML = "";
db.collection('books').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderBook(doc);
  });
});
}

renderAllBooks();

// End book database manipulation

// Start OAUTH token

const txtEmail = document.getElementById('defaultForm-email');
const txtPassword = document.getElementById('defaultForm-pass');
const btnLogin = document.getElementById('signInSubmit');
// const btnSignUp = document.getElementById('btnSignUp');
const btnLogOut = document.getElementById('btnLogout');

// Add login event
btnLogin.addEventListener('click', e => {
  // Get email and password
  const email = txtEmail.value;
  const password = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(e => console.log(e.message));

  txtEmail.value = '';
  txtPassword.value = '';
});

btnLogOut.addEventListener('click', e => {
  firebase.auth().signOut().then(function() {
      console.log('signed out');
  }, function(error) {
      console.error('sign out error', error);
  });
});

// Add a realtime listener

  // ISSUE: (HIGH PRIORITY) -> .isLogged tab does not persist on refresh of page. Need to Asynchronously fix this OR use cookies some how to 
  // persist the state of the buttons being removed / added on state change. 


  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        console.log(user);
        btnLogOut.style.display = 'inline-block';
        // #btnLogin is the Sign in button on page, but btnLogin is javascript login button on login modal
        $('#btnLogin').css('display', 'none');
        var elems = document.getElementsByClassName('isLogged');
        for (var i=0;i<elems.length;i+=1){
          elems[i].style.display = 'table-cell';
        }
        //document.getElementsByClassName('isLogged').style.display = 'table-cell';
        //$('.isLogged').css({'display':'table-cell'});
        $('#thLogged').css('display', 'table-cell');
        //btnSignUp.style.display = 'none';
        
    }
    else {
        console.log('not logged in');
        btnLogin.style.display = 'inline-block';
        $('.isLogged').css({'display': 'none'});
        //btnSignUp.style.display = 'inline-block';
        //hidden_tab.style.display = 'none';
    }
  });




