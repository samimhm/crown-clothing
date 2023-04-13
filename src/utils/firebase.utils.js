import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
 } from 'firebase/auth'
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'
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
  // eslint-disable-next-line
  const firebaseApp = initializeApp(firebaseConfig)

  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

  export const db = getFirestore()

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    //THIS FUNCTION WAS TO USE IT ONLY ONCE TO UPLOAD OUR PRODUCTS IN FIRESTORE
    //THIS COULD BE REMOVED NOW BUT I'LL KEEP IT AS AN EXAMPLE
    const collectionRef = collection(db, collectionKey)
    //we need a transaction (batch) for wrtiting completly to db
    const batch = writeBatch(db)

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase())
      batch.set(docRef, object)
    })

    await batch.commit()
    console.log('done')
  }

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data()
      acc[title.toLowerCase()] = items
      return acc
    }, {})

    return categoryMap
  }

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }
        catch(err) { console.log(`Error at createUserDocumentFromAuth: `, err)}
    }

    return userDocRef
  }

  export const creatAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
  }

  export const signOutUser = async () => await signOut(auth)

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)