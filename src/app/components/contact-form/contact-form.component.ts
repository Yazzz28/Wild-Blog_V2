import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  imports: [ReactiveFormsModule]
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.contactForm = this.fb.group({
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      content: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Formulaire soumis', this.contactForm.value);
    } else {
      console.log('Le formulaire est invalide');
    }
  }

  onReset(): void {
    this.contactForm.reset();
  }
}
