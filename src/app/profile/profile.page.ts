import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonIcon, 
  IonInput, 
  IonLabel, 
  IonItem, 
  IonRadio, 
  IonRadioGroup, 
  IonSelect, 
  IonSelectOption, 
  IonDatetime,
  ActionSheetController, 
  ToastController,
  AlertController,
  ModalController
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { 
  homeOutline, 
  flaskOutline, 
  timeOutline, 
  personOutline,
  cameraOutline,
  calendarOutline,
  imagesOutline,
  close,
  logIn,
  personAdd
} from 'ionicons/icons';

interface ProfileData {
  fullname: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phoneNumber: string;
  emergencyContact: string;
  emergencyContactNumber: string;
  profileImage: string;
  location: string;
}

interface AuthData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullname?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonInput,
    IonLabel,
    IonItem,
    IonRadio,
    IonRadioGroup,
  ]
})
export class ProfilePage implements OnInit {
  maxDate: string;
  emailError: string = '';
  phoneError: string = '';
  emergencyPhoneError: string = '';
  isLoggedIn: boolean = false;
  
  // Authentication data
  loginData: AuthData = {
    email: '',
    password: ''
  };

  signupData: AuthData = {
    email: '',
    password: '',
    confirmPassword: '',
    fullname: ''
  };
  
  profileData: ProfileData = {
    fullname: 'Juan Dela Cruz',
    address: 'Quezon City, Philippines',
    dateOfBirth: '1992-08-08',
    gender: 'male',
    email: 'juan.delacruz@email.com',
    phoneNumber: '9123456789',
    emergencyContact: 'Maria Dela Cruz',
    emergencyContactNumber: '9987654321',
    profileImage: '', // Empty by default to show icon
    location: 'Quezon City, Philippines'
  };

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    addIcons({ 
      homeOutline, 
      flaskOutline, 
      timeOutline, 
      personOutline,
      cameraOutline,
      calendarOutline,
      imagesOutline,
      close,
      logIn,
      personAdd
    });

    // Set max date to today for date of birth
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  async ngOnInit() {
    await this.loadProfile();
    this.checkAuthStatus();
    console.log('Profile page loaded, testing editability...');
  }

  checkAuthStatus() {
    // Check if user is logged in (you can implement your own logic here)
    // For now, we'll check if there's user data in memory
    const userData = this.getUserData();
    this.isLoggedIn = !!userData;
  }

  getUserData() {
    // In a real app, you might check localStorage or a service
    // For now, we'll use a simple in-memory check
    return null; // Return null for now, implement your storage logic
  }

  async loadProfile() {
    try {
      console.log('Profile data loaded:', this.profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  // Authentication Methods
  async showLoginModal() {
    const alert = await this.alertController.create({
      header: 'Login',
      cssClass: 'login-alert',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          value: this.loginData.email
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password',
          value: this.loginData.password
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, 
        {
          text: 'Login',
          cssClass: 'login-button',
          handler: (data) => {
            this.loginData.email = data.email;
            this.loginData.password = data.password;
            return this.handleLogin();
          }
        }
      ]
    });

    await alert.present();
  }

  async showSignupModal() {
    const alert = await this.alertController.create({
      header: 'Sign Up',
      cssClass: 'signup-alert',
      inputs: [
        {
          name: 'fullname',
          type: 'text',
          placeholder: 'Full Name',
          value: this.signupData.fullname
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          value: this.signupData.email
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password',
          value: this.signupData.password
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirm Password',
          value: this.signupData.confirmPassword
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, 
        {
          text: 'Sign Up',
          cssClass: 'signup-button',
          handler: (data) => {
            this.signupData.fullname = data.fullname;
            this.signupData.email = data.email;
            this.signupData.password = data.password;
            this.signupData.confirmPassword = data.confirmPassword;
            return this.handleSignup();
          }
        }
      ]
    });

    await alert.present();
  }

  async handleLogin(): Promise<boolean> {
    try {
      // Validate login data
      if (!this.loginData.email || !this.loginData.password) {
        await this.showToast('Please enter both email and password.', 'danger');
        return false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.loginData.email)) {
        await this.showToast('Please enter a valid email address.', 'danger');
        return false;
      }

      // Here you would implement your actual login logic
      // For now, we'll simulate a successful login
      console.log('Login attempt with:', this.loginData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data (in a real app, you'd get this from your API)
      this.storeUserData({
        email: this.loginData.email,
        fullname: 'Logged In User',
        isLoggedIn: true
      });

      this.isLoggedIn = true;
      await this.showToast('Login successful!', 'success');
      
      // Clear login data
      this.loginData = { email: '', password: '' };
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      await this.showToast('Login failed. Please try again.', 'danger');
      return false;
    }
  }

  async handleSignup(): Promise<boolean> {
    try {
      // Validate signup data
      if (!this.signupData.fullname || !this.signupData.email || 
          !this.signupData.password || !this.signupData.confirmPassword) {
        await this.showToast('Please fill in all fields.', 'danger');
        return false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.signupData.email)) {
        await this.showToast('Please enter a valid email address.', 'danger');
        return false;
      }

      // Password validation
      if (this.signupData.password.length < 6) {
        await this.showToast('Password must be at least 6 characters long.', 'danger');
        return false;
      }

      // Confirm password validation
      if (this.signupData.password !== this.signupData.confirmPassword) {
        await this.showToast('Passwords do not match.', 'danger');
        return false;
      }

      // Here you would implement your actual signup logic
      console.log('Signup attempt with:', this.signupData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data (in a real app, you'd get this from your API)
      this.storeUserData({
        email: this.signupData.email,
        fullname: this.signupData.fullname || 'New User',
        isLoggedIn: true
      });

      // Update profile with signup data
      this.profileData.fullname = this.signupData.fullname || '';
      this.profileData.email = this.signupData.email;

      this.isLoggedIn = true;
      await this.showToast('Account created successfully!', 'success');
      
      // Clear signup data
      this.signupData = { email: '', password: '', confirmPassword: '', fullname: '' };
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      await this.showToast('Signup failed. Please try again.', 'danger');
      return false;
    }
  }

  async handleLogout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    // Clear user data
    this.clearUserData();
    this.isLoggedIn = false;
    
    // Reset profile to default
    this.profileData = {
      fullname: '',
      address: '',
      dateOfBirth: '',
      gender: 'male',
      email: '',
      phoneNumber: '',
      emergencyContact: '',
      emergencyContactNumber: '',
      profileImage: '',
      location: ''
    };

    this.showToast('Logged out successfully!', 'success');
  }

  storeUserData(userData: any) {
    // In a real app, you might use Ionic Storage or localStorage
    // For now, we'll just store in memory
    console.log('User data stored:', userData);
  }

  clearUserData() {
    // Clear stored user data
    console.log('User data cleared');
  }

  // Email validation
  validateEmail() {
    const email = this.profileData.email.trim();
    if (!email) {
      this.emailError = 'Email is required';
      return false;
    }
    
    // Check for @ and .com
    if (!email.includes('@') || !email.includes('.com')) {
      this.emailError = 'Email must be valid';
      return false;
    }
    
    // More thorough email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRegex.test(email)) {
      this.emailError = 'Please enter a valid email address ending with .com';
      return false;
    }
    
    this.emailError = '';
    return true;
  }

  // Phone number validation - only numbers, exactly 10 digits with formatting
  validatePhoneNumber(type: 'phone' | 'emergency') {
    const phoneNumber = type === 'phone' ? this.profileData.phoneNumber : this.profileData.emergencyContactNumber;
    
    // Remove non-numeric characters and spaces
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Format the number as XXX XXXX XXX
    let formattedNumber = '';
    if (cleanNumber.length > 0) {
      if (cleanNumber.length <= 3) {
        formattedNumber = cleanNumber;
      } else if (cleanNumber.length <= 7) {
        formattedNumber = cleanNumber.slice(0, 3) + ' ' + cleanNumber.slice(3);
      } else {
        formattedNumber = cleanNumber.slice(0, 3) + ' ' + cleanNumber.slice(3, 7) + ' ' + cleanNumber.slice(7, 10);
      }
    }
    
    // Update the model with formatted number
    if (type === 'phone') {
      this.profileData.phoneNumber = formattedNumber;
    } else {
      this.profileData.emergencyContactNumber = formattedNumber;
    }
    
    // Validate length
    if (cleanNumber.length > 0 && cleanNumber.length !== 10) {
      const errorMessage = 'Phone number must be valid';
      if (type === 'phone') {
        this.phoneError = errorMessage;
      } else {
        this.emergencyPhoneError = errorMessage;
      }
      return false;
    }
    
    // Clear error if valid
    if (type === 'phone') {
      this.phoneError = '';
    } else {
      this.emergencyPhoneError = '';
    }
    return true;
  }

  async changeProfileImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera-outline',
          handler: () => {
            this.takePicture(CameraSource.Camera);
          }
        },
        {
          text: 'Photo Library',
          icon: 'images-outline',
          handler: () => {
            this.takePicture(CameraSource.Photos);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async takePicture(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: source
      });

      if (image.dataUrl) {
        this.profileData.profileImage = image.dataUrl;
        await this.showToast('Profile image updated successfully!');
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      await this.showToast('Error updating profile image. Please try again.');
    }
  }

  async saveProfile() {
    try {
      // Reset all errors
      this.emailError = '';
      this.phoneError = '';
      this.emergencyPhoneError = '';

      // Validate full name
      if (!this.profileData.fullname || !this.profileData.fullname.trim()) {
        await this.showToast('Please enter your full name.', 'danger');
        return;
      }

      // Validate email
      if (!this.validateEmail()) {
        await this.showToast('Please enter a valid email address.', 'danger');
        return;
      }

      // Get clean numbers for validation
      const cleanPhoneNumber = this.profileData.phoneNumber.replace(/\D/g, '');
      const cleanEmergencyNumber = this.profileData.emergencyContactNumber.replace(/\D/g, '');

      // Check if phone numbers are exactly 10 digits
      if (cleanPhoneNumber.length !== 10) {
        this.phoneError = 'Phone number must be valid';
        await this.showToast('Phone number must be valid.', 'danger');
        return;
      }

      if (cleanEmergencyNumber.length !== 10) {
        this.emergencyPhoneError = 'Emergency contact number must be valid';
        await this.showToast('Emergency contact number must be valid.', 'danger');
        return;
      }

      console.log('Profile would be saved:', {
        ...this.profileData,
        phoneNumber: '+63' + cleanPhoneNumber,
        emergencyContactNumber: '+63' + cleanEmergencyNumber
      });
      
      await this.showToast('Profile saved successfully!');
      
    } catch (error) {
      console.error('Error saving profile:', error);
      await this.showToast('Error saving profile. Please try again.', 'danger');
    }
  }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  }

  navigateToHome() {
    console.log('Navigating to home from profile...');
    this.router.navigate(['/emergency-types']);
  }

  navigateToChemicals() {
    console.log('Navigating to chemicals from profile...');
    this.router.navigate(['/chemical-list']);
  }

  navigateToHistory() {
    console.log('History feature coming soon');
  }

  navigateToProfile() {
    console.log('Already on Profile page');
  }

  testInput() {
    console.log('Input test triggered, current name:', this.profileData.fullname);
  }
}