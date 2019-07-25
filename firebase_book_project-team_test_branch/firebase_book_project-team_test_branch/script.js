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
  //console.log("Edit button clicked for doc", doc.id);
  
}
  
// Remove button

removeButton.onclick = function() {

	db.collection("books").doc(doc.id).delete().then(function() {
    console.log("Document successfully deleted!");
	renderAllBooks();
	}).catch(function(error) {
    console.error("Error removing document: ", error);

});
			
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

/*function renderAllBooks(){
	bookTable.innerHTML = "";
db.collection('books').orderBy('title').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderBook(doc);
  });
});
}*/

// Real-time listener
db.collection('books').orderBy('title').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if(change.type == 'added') {
      renderBook(change.doc);
    }
    else if(change.type == 'removed') {
      let tr = bookTable.querySelector('[data-id=' + change.doc.id + ']');
      bookTable.removeChild(tr);
    }
    else if(change.type == 'modified') {
      let tr = bookTable.querySelector('[data-id=' + change.doc.id + ']');
      trChildren = tr.children;
      for(i=0;i<trChildren.length-1;i+=1){
        trChildren[i].textContent='';
      }
      trChildren[0].textContent = (change.doc.data().isbn);
      trChildren[1].textContent = (change.doc.data().semester);
      trChildren[2].textContent = (change.doc.data().course_num);
      trChildren[3].textContent = (change.doc.data().course_title);
      trChildren[4].textContent = (change.doc.data().course_lead);
      trChildren[5].textContent = (change.doc.data().course_lead_name);
      trChildren[6].textContent = (change.doc.data().notes);

      for(i=0;i<tr.children.length;i+=1){
        tr.removeChilrd(tr.childNodes[i]);
      }

      for(i=0;i<trChildren.length;i+=1){
        tr.append(trChildren[i]);
      }
      /*tr.appendChild(isbn);
  tr.appendChild(title);
  tr.appendChild(semester);
  tr.appendChild(course_num);
  tr.appendChild(course_title);
  tr.appendChild(course_lead);
  tr.appendChild(course_lead_name);
  tr.appendChild(notes);
  tr.appendChild(hidden_tab);*/
    }
  });
});


// End book database manipulation

// Start OAUTH token

const txtEmail = document.getElementById('defaultForm-email');
const txtPassword = document.getElementById('defaultForm-pass');
const btnLogin = document.getElementById('signInSubmit');
// const btnSignUp = document.getElementById('btnSignUp');
const btnLogOut = document.getElementById('btnLogout');
const btnSearch = document.getElementById('btnSearch');

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
        var reload = 0;
        if(performance.navigation.type == 1 && reload != 1){
          $('.isLogged').css({'display': 'none'});
          firebase.auth().signOut();
          $('#btnLogin').css('display', 'inline-block');
          $('#btnLogout').css('display', 'none');
          reload = 1;
        }
        
    }
    else {
        console.log('not logged in');
        btnLogin.style.display = 'inline-block';
          $('.isLogged').css({'display': 'none'});
          //btnSignUp.style.display = 'inline-block';
          //hidden_tab.style.display = 'none';
    }
  });

// Edit button
$('#edit_book').on('show.bs.modal', function(e) {
    console.log(doc_id);
    docRef = db.collection('books').doc(doc_id);
    docRef.get().then(function(doc) {
    $('#edit_isbn').val(doc.data().isbn);
    $('#edit_title').val(doc.data().title);
    $('#edit_semester').val(doc.data().semester);
    $('#edit_C-num').val(doc.data().course_num);
    $('#edit_C-lead').val(doc.data().course_lead);
    $('#edit_C-title').val(doc.data().course_title);
    $('#edit_C-lead-name').val(doc.data().course_lead_name);
    $('#edit_notes').val(doc.data().notes);
    });
  document.getElementById('edit_submit').addEventListener('click', e => {
    e.preventDefault();
    docRef.update({
      isbn: $('#edit_isbn').val(),
      title: $('#edit_title').val(),
      semester: $('#edit_semester').val(),
      course_num: $('#edit_C-num').val(),
      course_lead: $('#edit_C-lead').val(),
      course_title: $('#edit_C-title').val(),
      coures_lead_name: $('#edit_C-lead-name').val(),
      notes: $('#edit_notes').val(),
    });
  });
  
});

//Search function from https://www.w3schools.com/howto/howto_js_filter_table.asp
function mySearchFunction() {
  // Declare variables 
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("example-search-input");
  filter = input.value.toUpperCase();
  table = document.getElementById("book-table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
	//Temp is a variable that sees if a single column per row matches the search. If a column matches, it's set to 1 and tested at the end of the column
	temp = 0;
	//The .length-1 is to account for the edit/delete buttons so the innertext of those are not included
	for (j = 0; j < tr[i].getElementsByTagName("td").length - 1; j++){
		td = tr[i].getElementsByTagName("td")[j];
		console.log("td: " + td.innerText);
		if (td) {
		  txtValue = td.textContent || td.innerText;
		  if (txtValue.toUpperCase().indexOf(filter) > -1) {
			tr[i].style.display = "";
			temp = 1;
			//This is where the temp variable is tested. 0 if no columns match, when j is 7 it's at the last column.
		  }else if(j == 7 && temp == 0){
			tr[i].style.display = "none";
		  }
		} 
	}
  }
}