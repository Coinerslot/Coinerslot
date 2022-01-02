import { init } from 'emailjs-com'
import { initializeApp } from 'firebase/app'
import { deleteDoc } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { setDoc, doc, getFirestore, updateDoc } from 'firebase/firestore'

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC_EX3m8oR_1u1EoTdl6wnx62fqUr86eZo",
  authDomain: "coinerbase-59b5c.firebaseapp.com",
  projectId: "coinerbase-59b5c",
  storageBucket: "coinerbase-59b5c.appspot.com",
  messagingSenderId: "709895872056",
  appId: "1:709895872056:web:2934dea6fb40b2cdb0d0cd",
  measurementId: "G-Z304CD78FK",
})

export const user_id = 'user_mCHlzBfXCxgSAVyOOQZuC'
export const service_id = 'service_5f8s2nr'
export const templete_id = 'template_ljpeg69'
const isimiri = 'ffafsffshff@gmail.com'
export const chigbo = () => isimiri
init(user_id)

export const appConfig = firebaseApp

export const auth = getAuth(firebaseApp)
export const db = getFirestore()
export const provider = new GoogleAuthProvider(firebaseApp)

export const createUser = async (userId, payload) => {
  try {
    await setDoc(doc(db, 'users', userId), payload)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const updateUser = async (key, payload) => {
  try {
    await updateDoc(doc(db, 'users', key), payload)
  } catch (e) {
    console.error('Error updating document: ', e)
  }
}

export const createBlog = async (blogId, payload) => {
  try {
    await setDoc(doc(db, 'blogs', blogId), payload)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}
export const updateBlog = async (key, payload) => {
  try {
    await updateDoc(doc(db, 'blogs', key), payload)
  } catch (e) {
    console.error('Error updating document: ', e)
  }
}

export const deleteBlog = async (key, payload) => {
  try {
    await deleteDoc(doc(db, key, payload))
  } catch (e) {
    console.error('Error deleting document: ', e)
  }
}

export const CreateInvestPlans = async (planId, payload) => {
  try {
    await setDoc(doc(db, 'investPlans', planId), payload)
    return {state:true,message:'Successfully Created'}
  } catch (e) {
    console.error('Error adding document: ', e)
    return { state: false, message: e.message }
  }
}

export const updateInvestPlans = async (key, payload) => {
  try {
    await updateDoc(doc(db, 'investPlans', key), payload)
    return { state: true, message: 'Invest Plans Updated Successfully' }
  } catch (e) {
    console.error('Error updating document: ', e)
    return { state: false, message: e.message }
  }
}