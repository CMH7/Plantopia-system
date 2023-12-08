// @ts-nocheck

import { db } from '$lib/configurations/firebase';
import { error } from '@sveltejs/kit';
import { getAuth, signInWithEmailAndPassword, updatePassword , signOut} from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }) {
  let data = {
    valid: false,
    message: ''
  }

  if (url.searchParams.get('pp') != null && url.searchParams.get('pp') !== '') {
    /**
     * @type {import('firebase/auth').User}
     */
    let user
  
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, url.searchParams.get('e'), url.searchParams.get('p'))
      .then(res => {
        user = auth.currentUser
        console.log('loggedin')
  
        updatePassword(user, url.searchParams.get("pp"))
        console.log('password change 1')
        
        updateDoc(doc(db, "users", user?.uid), {
          password: url.searchParams.get("pp"),
        })
        console.log('password change 2')
        data.valid = true;
        
        // signOut(auth)
        // console.log('logged out')
        
      }).catch(err => {
        console.log(err)
        data.valid = false
        data.message = 'Invalid credentials'
      })
      console.log(`datavalid ${data.valid}`)
      return data
    } else {
      return data
    }
}