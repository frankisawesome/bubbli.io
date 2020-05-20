import { createContext } from 'react';
import { firebaseConfig } from './config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

interface UserProps {
  email: string;
  password: string;
  name?: string;
}

export class Firebase {
  public auth: firebase.auth.Auth;
  public db: firebase.firestore.Firestore;
  public storage: firebase.storage.Storage;

  constructor(config: Object) {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }

  public static initialiseWithLocalConfig(): Firebase {
    return new Firebase(firebaseConfig);
  }

  async register({ email, name, password }: UserProps): Promise<any> {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (newUser.user) {
      await newUser.user.updateProfile({
        displayName: name,
      });
      await this.db
        .collection('portfolios')
        .doc(newUser.user.uid)
        .set({ name: name, bubbles: [] });
      return Promise.resolve();
    } else {
      return Promise.reject('Failed to register new user');
    }
  }

  async login({
    email,
    password,
  }: UserProps): Promise<firebase.auth.UserCredential> {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout(): Promise<any> {
    return await this.auth.signOut();
  }

  async resetPassword(email: string): Promise<any> {
    await this.auth.sendPasswordResetEmail(email);
  }
}

export const FirebaseContext = createContext(
  Firebase.initialiseWithLocalConfig()
);
