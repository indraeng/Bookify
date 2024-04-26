import { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, getFirestore, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

//make a instance of context
const FirebaseContext = createContext()

//firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOpdt-GIyK3O2yTaYV-wBQiXgOMjaWeqA",
    authDomain: "bookify-e65e4.firebaseapp.com",
    projectId: "bookify-e65e4",
    storageBucket: "bookify-e65e4.appspot.com",
    messagingSenderId: "1022276438984",
    appId: "1:1022276438984:web:6df26a06ead9c54c258efd"
};

//firebase initialization
export const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);



//custom useContext hook
export const useFirebase = () => {
    return useContext(FirebaseContext)
}

//context Provider
export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null)
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null)
        })
    }, [])

    //signup function
    const signupUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password);

    //login function
    const loginUserWithEmailAndPassword = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password)

    //Signin with google function
    const signinUserWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

    const isLoggedIn = user ? true : false;
    // console.log(user)

    //store book list to fireStore
    const handleCreateNewListing = async (name, isbn, price, cover) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`)
        const uploadResult = await uploadBytes(imageRef, cover)
        // console.log('uploadResult', uploadResult);
        return await addDoc(collection(firestore, 'books'), {
            name,
            isbn,
            price,
            coverPic: uploadResult.ref.fullPath,
            userId: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        })
    }

    //get all books
    const listAllBooks = () => {
        return getDocs(collection(firestore, 'books'));
    }

    //get cover pic with path
    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path))
    }

    //get book with id
    const getBookById = async (id) => {
        const result = await getDoc(doc(firestore, 'books', id))
        return result;
    }

    //place a order
    const placeOrder = async (bookId, qty) => {
        const collectionRef = collection(firestore, 'books', bookId, 'orders')
        const result = await addDoc(collectionRef, {
            userId: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            quantity: Number(qty)
        });
        return result;
    }
    //get books
    const fetchMyBooks = async (userId) => {
        // if(!user) return null
        const collectionRef = collection(firestore, 'books')
        const q = query(collectionRef, where('userId', '==', userId))
        const result = await getDocs(q);
        return result;
    }

    const getOrders = async (bookId) => {
        const collectionRef = collection(firestore, 'books', bookId, 'orders')
        const result = await getDocs(collectionRef)
        return result;
    }

    return (
        <FirebaseContext.Provider
            value={{
                signupUserWithEmailAndPassword,
                loginUserWithEmailAndPassword,
                signinUserWithGoogle,
                isLoggedIn,
                handleCreateNewListing,
                listAllBooks,
                getImageURL,
                getBookById,
                placeOrder,
                fetchMyBooks,
                user,
                getOrders
            }} >
            {props.children}
        </FirebaseContext.Provider>
    )
}