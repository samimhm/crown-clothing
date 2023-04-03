import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAu2W-RetdaejMeQQ4LjceZyfOk348CzmE",
    authDomain: "crown-clothing-db-9aca6.firebaseapp.com",
    projectId: "crown-clothing-db-9aca6",
    storageBucket: "crown-clothing-db-9aca6.appspot.com",
    messagingSenderId: "286032290229",
    appId: "1:286032290229:web:d29c5d860a5354f1f4b9fc"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig)

  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

  export const db = getFirestore()

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }
        catch(err) { console.log(`Error at createUserDocumentFromAuth: `, err)}
    }

    return userDocRef
  }