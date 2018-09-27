class UI {
  constructor() {
    this.note = document.querySelector('#notes');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.noteSubmit = document.querySelector('.note-submit');
    this.forState = 'add';
  }

  // Show all notes
  showNotes(notes) {
    let output = '';

    notes.forEach((note) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${note.title}</h4>
            <p class="card-text">${note.body}</p>
            <a href="#" class="edit card-link" data-id="${note.id}">
              <i class="fa fa-pencil"></i>
            </a>

            <a href="#" class="delete card-link" data-id="${note.id}">
            <i class="fa fa-remove"></i>
          </a>
          </div>
        </div>
      `;
    });

    this.note.innerHTML = output;
  }

  // Show alert message
  showAlert(message, className) {
    this.clearAlert();

    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.notesContainer');
    // Get notes
    const notes = document.querySelector('#notes');
    // Insert alert div
    container.insertBefore(div, notes);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if(currentAlert) {
      currentAlert.remove();
    }
  }

  // Clear all fields
  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  // Fill form to edit
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  // Clear ID hidden value
  clearIdInput() {
    this.idInput.value = '';
  }

  // Change the form state
  changeFormState(type) {
    if(type === 'edit') {
      this.noteSubmit.textContent = 'Update Note';
      this.noteSubmit.className = 'note-submit btn btn-warning btn-block';

      // Create cancel button
      const button = document.createElement('button');
      button.className = 'note-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));

      // Get parent
      const cardForm = document.querySelector('.card-form');
      // Get element to insert before
      const formEnd = document.querySelector('.form-end');
      // Insert cancel button
      cardForm.insertBefore(button, formEnd);
    } else {
      this.noteSubmit.textContent = 'Note It';
      this.noteSubmit.className = 'note-submit btn btn-primary btn-block';
      // Remove cancel btn if it is there
      if(document.querySelector('.note-cancel')) {
        document.querySelector('.note-cancel').remove();
      }
      // Clear ID from hidden field
      this.clearIdInput();
      // Clear text
      this.clearFields();
    }
  }
}

export const ui = new UI();