import { Injectable } from '@angular/core';
import { Auth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         sendPasswordResetEmail, 
         signOut,
         user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$: Observable<any>;

  constructor(private auth: Auth, private router: Router) {
    // Observador del usuario logueado
    this.currentUser$ = user(this.auth);
  }


  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }


  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  forgotPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  logout() {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }
  getCurrentUser() {
    return this.auth.currentUser;
  }
}
