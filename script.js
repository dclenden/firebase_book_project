const bookTable = document.querySelector('#book-table');

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

  tr.setAttribute('data-id', doc.id);
  isbn.textContent = doc.data().isbn;
  title.textContent = doc.data().title;
  semester.textContent = doc.data().semester;
  course_num.textContent = doc.data().course_num;
  course_title.textContent = doc.data().course_title;
  course_lead.textContent = doc.data().course_lead;
  course_lead_name.textContent = doc.data().course_lead_name;
  notes.textContent = doc.data().notes;
  hidden_tab.innerHTML = '<button class="btn btn-primary edit_btn">edit</button><button class="btn btn-danger dlt_btn">delete</button>';

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

//test
db.collection('books').add({
  isbn: "421342314",
  title: "something",
  semester: "something",
  course_num: "something",
  course_title: "421342314",
  course_lead: "421342314",
  course_lead_name: "421342314",
  notes: "421342314",
})

db.collection('books').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    renderBook(doc);
  })
})