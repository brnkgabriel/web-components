
class FirebaseAuth {
  constructor(json) {
    this.collection   = json.collection
    this.config       = json.config
    this.user         = null
    this.app          = null
    this.auth         = null
    this.db           = null
    this.unsubscribe  = () => {}
  }

  init() {
    // Initialize Firebase
    this.app  = firebase.initializeApp(this.config)
    
    this.auth = this.app.auth()
    this.db   = this.app.firestore()
    return this
  }

  authListener() {
    this.auth.onAuthStateChanged(user => user ? this.in(user)  : this.out() )
    return this
  }

  in(user) { this.unsubscribe = this.subscribe(user) }

  out() { this.unsubscribe() }

  subscribe(user) {
    return this.db.collection('guides')
    .onSnapshot(snapshot => {
      var detail = { docs: snapshot.docs, user }
      this.dispatchEvent('setupui', detail)
    }, err => alert(err.message))
  }

  signUp() {
    this.auth.createUserWithEmailAndPassword(email, password)
    .then(cred => db.collection('users').doc(cred.user.uid).set({ bio }))
    .then(_ => this.dispatchEvent('signedup'))
    .catch(err => alert(err.message))
  }

  signIn() {
    this.auth.signInWithEmailAndPassword(email, password)
    .then(_ => this.dispatchEvent('signedin'))
    .catch(err => alert(err.message))
  }

  dispatchEvent(type, detail) {
    var evt = new CustomEvent(type, { detail })
    window.dispatchEvent(evt)
  }

  signOut() {
    this.auth.signOut()
  }
}

new FirebaseAuth({
  collection: 'guides',
  config: {
    apiKey: "AIzaSyBCXGhwiBT0iJSolBrVktz48ezRUtZxPPw",
    authDomain: "learn-dt.firebaseapp.com",
    databaseURL: "https://learn-dt.firebaseio.com",
    projectId: "learn-dt",
    appId: "1:816835870909:web:f9b4df6e9dbf5dc4"
  }
}).init()
.authListener()

window.addEventListener('signedup', () => {
  console.log('signed up')
})

window.addEventListener('signedin', () => {
  console.log('signed in')
})

window.addEventListener('setupui', (e) => {
  console.log('to set up ui with', e.detail)
})