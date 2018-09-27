import { http } from './http';
import { ui } from './ui';

// Get notes on DOM load
document.addEventListener('DOMContentLoaded', getNotes);

// Listen for add note
document.querySelector('.note-submit').addEventListener('click', submitNote);

// Listen for delete
document.querySelector('#notes').addEventListener('click', deleteNote);

// Listen for edit state
document.querySelector('#notes').addEventListener('click', enableEdit);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Get Notes
function getNotes() {
  http.get('http://localhost:3000/notes')
    .then(data => ui.showNotes(data))
    .catch(err => console.log(err));
}

// Submit Note
function submitNote() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }

  // Validate input
  if(title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else {
    // Check for ID
    if(id === '') {
      // Create Note
      http.post('http://localhost:3000/notes', data)
      .then(data => {
        ui.showAlert('Note added', 'alert alert-success');
        ui.clearFields();
        getNotes();
      })
      .catch(err => console.log(err));
    } else {
      // Update Note
      http.put(`http://localhost:3000/notes/${id}`, data)
      .then(data => {
        ui.showAlert('Note updated', 'alert alert-success');
        ui.changeFormState('add');
        getNotes();
      })
      .catch(err => console.log(err));
    }

  }
}

// Delete Note
function deleteNote(e) {
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/notes/${id}`)
        .then(data => {
          ui.showAlert('Note removed', 'alert alert-success');
          getNotes();
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault();
}

// Enable Edit State
function enableEdit(e) {
  if(e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    
    const data = {
      id,
      title,
      body
    }

    // Fill form with current note
    ui.fillForm(data);
  }
  
  e.preventDefault();
}

// Cancel Edit State
function cancelEdit(e) {
  if(e.target.classList.contains('note-cancel')) {
    ui.changeFormState('add');
  }

  e.preventDefault();
}