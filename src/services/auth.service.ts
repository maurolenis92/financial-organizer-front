import { Injectable } from '@angular/core';
import {
  signUp,
  signIn,
  signOut,
  confirmSignUp,
  getCurrentUser,
  fetchAuthSession,
  resetPassword,
  confirmResetPassword,
  SignUpInput,
  SignInInput,
  ConfirmSignUpInput,
  ResetPasswordInput,
  ConfirmResetPasswordInput,
  SignUpOutput,
  ConfirmSignUpOutput,
  SignInOutput,
  GetCurrentUserOutput,
  ResetPasswordOutput,
} from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Register a new user
   */
  public async signUp(
    email: string,
    password: string,
    name: string
  ): Promise<SignUpOutput> {
    try {
      const signUpParams: SignUpInput = {
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
        },
      };

      const result = await signUp(signUpParams);
      return result;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  /**
   * Confirm sign up with verification code
   */
  public async confirmSignUp(email: string, code: string): Promise<ConfirmSignUpOutput> {
    try {
      const confirmParams: ConfirmSignUpInput = {
        username: email,
        confirmationCode: code,
      };

      const result = await confirmSignUp(confirmParams);
      return result;
    } catch (error) {
      console.error('Error confirming sign up:', error);
      throw error;
    }
  }

  /**
   * Sign in user
   */
  public async signIn(username: string, password: string): Promise<SignInOutput> {
    try {
      const signInParams: SignInInput = {
        username,
        password,
      };

      const result = await signIn(signInParams);
      return result;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  /**
   * Sign out current user
   */
  public async signOut(): Promise<void> {
    try {
      await signOut();
      // Limpiar cualquier estado local adicional si es necesario
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  /**
   * Get current authenticated user
   */
  public async getCurrentUser(): Promise<GetCurrentUserOutput | null> {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Get current user's JWT token
   */
  public async getCurrentUserToken(): Promise<string | null> {
    try {
      const session = await fetchAuthSession();
      return session.tokens?.idToken?.toString() || null;
    } catch (error) {
      console.error('Error getting user token:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  public async isAuthenticated(): Promise<boolean> {
    try {
      await getCurrentUser();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Request password reset
   */
  public async resetPassword(email: string): Promise<ResetPasswordOutput> {
    try {
      const resetParams: ResetPasswordInput = {
        username: email,
      };

      const result = await resetPassword(resetParams);
      return result;
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
  }

  /**
   * Confirm password reset with code
   */
  public async confirmResetPassword(
    email: string,
    code: string,
    newPassword: string
  ): Promise<void> {
    try {
      const confirmParams: ConfirmResetPasswordInput = {
        username: email,
        confirmationCode: code,
        newPassword,
      };

      const result = await confirmResetPassword(confirmParams);
      return result;
    } catch (error) {
      console.error('Error confirming password reset:', error);
      throw error;
    }
  }
}
