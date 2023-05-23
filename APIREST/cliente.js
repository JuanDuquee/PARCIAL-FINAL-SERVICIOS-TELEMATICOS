// URL base de la API
const base_url = 'http://localhost:5000';

// Obtener todos los libros
function get_books() {
  const url = `${base_url}/books`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los libros.');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}


// Obtener un libro por su ID
function get_book(book_id) {
  const url = `${base_url}/books/${book_id}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error('Error al obtener el libro:', error);
      alert('El libro solicitado no existe.');
      throw error; 
    });
}


// Agregar un nuevo libro
function create_book(title, description, author) {
  const url = `${base_url}/books`;
  const data = {
    title: title,
    description: description,
    author: author
  };
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json());
}

// Actualizar un libro existente
function update_book(book_id, title, description, author) {
  const url = `${base_url}/books/${book_id}`;
  const data = {
    title: title,
    description: description,
    author: author
  };
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json());
}

// Eliminar un libro
function delete_book(book_id) {
  const url = `${base_url}/books/${book_id}`;
  return fetch(url, {
    method: 'DELETE'
  })
    .then(response => response.json());
}

// Ejemplos de uso
// Obtener todos los libros
/*
get_books()
  .then(books => {
    console.log('==================== Lista de libros: ====================');
    console.log(books);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Obtener un libro por su ID
const book_id = 2;
get_book(book_id)
  .then(book => {
    console.log(`==================== Información del libro con ID ${book_id}: ====================`);
    console.log(book);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Agregar un nuevo libro
const new_book = {
  title: 'New book',
  description: 'My awesome book',
  author: 'Duque'
};
create_book(new_book.title, new_book.description, new_book.author)
  .then(book => {
    console.log('==================== Nuevo libro agregado: ====================');
    console.log(book);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Actualizar un libro existente
const updated_book = {
  id: 1,
  title: 'Libro actualizado',
  description: 'Descripción actualizada',
  author: 'Autor actualizado'
};
update_book(updated_book.id, updated_book.title, updated_book.description, updated_book.author)
  .then(book => {
    console.log(`==================== Libro con ID ${updated_book.id} actualizado: ====================`);
    console.log(book);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Eliminar un libro
const book_id_to_delete = 2;
delete_book(book_id_to_delete)
  .then(result => {
    console.log(`==================== Libro con ID ${book_id_to_delete} eliminado: ====================`);
    console.log(result);
  })
  .catch(error => {
    console.error('Error:', error);
  });*/
