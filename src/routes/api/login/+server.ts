import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/configurations/firebase';
import { and, collection, getDocs, query, where } from "firebase/firestore";
import bcryptjs from 'bcryptjs'

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { email, password, level } = await request.json();
	
	if (level === bcryptjs.hashSync('admin', 'plantopia')) {
		const Q_UserAccount = query(
			collection(db, "admins"),  
			where("username", "==", email),
			where("password", '==', bcryptjs.hashSync(password))
		);
		const docSnaps = await getDocs(Q_UserAccount);
		
		if (docSnaps.empty) return json({ error: true, data: null })
		
		return json({error: false, data: docSnaps.docs})	
	} else {
		return json({error: false, data: null})
	}
};