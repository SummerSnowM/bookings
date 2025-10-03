import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs, setDoc} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const saveUser = createAsyncThunk(
    'users/saveUser',
    async ({ userId, username, file }) => {
        try {
            let imageUrl = "";
            if (file != null) {
                //upload file to fire storage
                const imageRef = ref(storage, `users/${file.name}`);
                const response = await uploadBytes(imageRef, file);
                imageUrl = await getDownloadURL(response.ref);
            }

            //create a new reference for new user
            const usersRef = collection(db, `users/${userId}/profile`);
            const newUserRef = doc(usersRef);
            await setDoc(newUserRef, { username, imageUrl });
            const newUser = await getDoc(newUserRef);

            const user = {
                id: newUser.id,
                ...newUser.data(),
            }
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async ({ userId }) => {
        try {
            const userRef = collection(db, `users/${userId}/profile`);
            const querySnapshot = await getDocs(userRef);
            const user = querySnapshot.docs[0];
            const docs = {
                id: user.id,
                ...user.data(),
            }
            return docs;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)
const usersSlice = createSlice({
    name: 'users',
    initialState: { users: {} },
    extraReducers: (builder) => {
        builder
            .addCase(saveUser.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.users = action.payload;
            })
    }
})

export default usersSlice.reducer;