import {
  hTTp
} from "./http";
import {
  ui
} from "./ui";

//Get posts on DOM Load
document.addEventListener("DOMContentLoaded", getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click',
  submitPost)

//listen for delete post 
document.querySelector('#posts').addEventListener('click',
  deletePost)

//Listen for edit states
document.querySelector('#posts').addEventListener('click',
  enableEdit)

//Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit)


//Get posts from the server
function getPosts() {
  hTTp
    .get("http://localhost:3000/posts")
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err));
}


//Add posts to the server
function submitPost() {
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value
  const id = document.querySelector('#id').value
  const data = {
    title,
    body
  }


  //Validate input
  if (title === '' && body === '') {
    ui.showAlert('You need to complete both forms before submitting', 'alert alert-danger')
  } else if (title === '') {
    ui.showAlert('You need to complete the title before submitting', 'alert alert-danger')
  } else if (body === '') {
    ui.showAlert('You need to complete the body before submitting', 'alert alert-danger')
  } else {



    //Check for id
    if (id === '') {
      //Create Post 
      hTTp.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post Added', 'alert alert-success')
          ui.clearFields()
          getPosts()
        })
        .catch(err => console.log(err))

    } else {
      //Update the post 
      hTTp.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post Updated', 'alert alert-success')
          ui.changeFormState('add')
          getPosts()
        })
        .catch(err => console.log(err))

    }
  }
}

//Delete Post 
function deletePost(e) {

  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id
    if (confirm('Are You Sure?')) {
      hTTp.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Removed', 'alert alert-success')
          getPosts()
        })
        .catch(err => console.log(err))
    }
  }
  e.preventDefault()
}

//Enable edit state
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id

    //traversing the DOM
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    const body = e.target.parentElement.previousElementSibling.textContent

    //object to store the things
    const data = {
      id,
      title,
      body
    }

    //Fill form with current post 
    ui.fillForm(data)
  }


  e.preventDefault()
}


//Cancel edit state
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add')
  }
  e.preventDefault()
}