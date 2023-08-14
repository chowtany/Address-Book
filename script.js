let contacts = [];

 function addContact() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (name === "" || email === "" || address === "" || phone === "") {
    alert("Please fill in all fields.");
    return;
  }
  window.location.href = "contact-list.html";
  const newContact = {
    name,
    email,
    address,
    phone
  };

  contacts.push(newContact);
  saveContactsToLocalStorage();
  displayContacts();
  clearForm();
} 

function displayContacts() {
  const contactsList = document.getElementById('contacts-list');
  contactsList.innerHTML = '';

  contacts.forEach((contact, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${contact.name}</span>
      <span>${contact.email}</span>
      <span>${contact.address}</span>
      <span>${contact.phone}</span>
      <button class="edit-btn" onclick="editContact(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
     
    `;
    contactsList.appendChild(li);
  });
}


function deleteContact(index) {
  contacts.splice(index, 1);
  saveContactsToLocalStorage();
  displayContacts();
}




function saveContact(index) {
  const name = document.getElementById('edit-name').value.trim();
  const email = document.getElementById('edit-email').value.trim();
  const address = document.getElementById('edit-address').value.trim();
  const phone = document.getElementById('edit-phone').value.trim();

  if (name === "" || email === "" || address === "" || phone === "") {
    alert("Please fill in all fields.");
    return;
  }

  contacts[index] = { name, email, address, phone };
  saveContactsToLocalStorage();
  displayContacts();
  clearForm();
}

function clearForm() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('address').value = '';
  document.getElementById('phone').value = '';
}

function saveContactsToLocalStorage() {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadContactsFromLocalStorage() {
  const storedContacts = localStorage.getItem('contacts');
  if (storedContacts) {
    contacts = JSON.parse(storedContacts);
  }
}

loadContactsFromLocalStorage();
displayContacts();

function editContact(index) {
  const editForm = document.getElementById('edit-form');
  const nameInput = document.getElementById('edit-name');
  const emailInput = document.getElementById('edit-email');
  const addressInput = document.getElementById('edit-address');
  const phoneInput = document.getElementById('edit-phone');
  const saveEditBtn = document.getElementById('save-edit-btn');

  const contact = contacts[index];

  nameInput.value = contact.name;
  emailInput.value = contact.email;
  addressInput.value = contact.address;
  phoneInput.value = contact.phone;

  editForm.style.display = 'block';

  saveEditBtn.onclick = function() {
    saveContact(index);
    editForm.style.display = 'none';
  };
}
