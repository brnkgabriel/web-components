

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBCXGhwiBT0iJSolBrVktz48ezRUtZxPPw",
  authDomain: "learn-dt.firebaseapp.com",
  databaseURL: "https://learn-dt.firebaseio.com",
  projectId: "learn-dt",
  appId: "1:816835870909:web:f9b4df6e9dbf5dc4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// make auth & firestore references
const auth  = firebase.auth()
const db    = firebase.firestore()

// update firestore settings
// db.settings({ timestampsInSnapshot: true })

// listen for auth status changes
var subscription = () => {}
auth.onAuthStateChanged(user => {
  console.log(user)
  if (user) {
    subscription = db.collection('guides')
      .onSnapshot(snapshot => {
        setupGuides(snapshot.docs)
        setupUI(user)
      }, err => alert(err.message))
  } else {
    subscription()
    setupGuides([])
    setupUI()
  }
})

// create new guide
const createForm = document.querySelector('#create-form')
createForm.addEventListener('submit', e => {
  e.preventDefault()
  db.collection('guides').add({
    title: createForm['title'].value,
    content: createForm['content'].value
  }).then(_ => {
    // close the modal & reset form
    const modal = document.querySelector('#modal-create')
    M.Modal.getInstance(modal).close()
    createForm.reset()
  }).catch(err => {
    alert(err.message)
  })
})

// signup
const signupForm = document.querySelector('#signup-form')
const logout = document.querySelector('#logout')
const loginForm = document.querySelector('#login-form')

signupForm.addEventListener('submit', e => {
  e.preventDefault()

  // get user info
  const email = signupForm['signup-email'].value
  const password = signupForm['signup-password'].value
  const bio = signupForm['signup-bio'].value

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password)
  .then(cred => db.collection('users').doc(cred.user.uid).set({ bio }))
  .then(_ => afterSignUp())
  .catch(err => console.log(err.message))
})


logout.addEventListener('click', e => {
  e.preventDefault()
  auth.signOut()
})

loginForm.addEventListener('submit', e => {
  e.preventDefault()

  // get user info
  const email = loginForm['login-email'].value
  const password = loginForm['login-password'].value

  auth.signInWithEmailAndPassword(email, password)
  .then(_ => afterSignIn(_))
})

function afterSignUp() {
  const modal = document.querySelector('#modal-signup')
  M.Modal.getInstance(modal).close()
  signupForm.reset()
}

function afterSignIn(cred) {
  const modal = document.querySelector('#modal-login')
  M.Modal.getInstance(modal).close()
  loginForm.reset()
}
