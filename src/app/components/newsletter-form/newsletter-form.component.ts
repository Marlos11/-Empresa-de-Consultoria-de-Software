import { Component, signal } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
/* import { emit } from 'process'; */
import { NewsletterService } from '../../services/newsletter.service';

@Component({
  selector: 'app-newsletter-form',
  standalone: true,
  imports: [
    BtnPrimaryComponent,
    ReactiveFormsModule
  ],
  providers: [
    NewsletterService
  ],
  templateUrl: './newsletter-form.component.html',
  styleUrl: './newsletter-form.component.scss'
})
export class NewsletterFormComponent {
  newslettersForm!: FormGroup
  loading = signal(false)

  constructor(private service: NewsletterService) {
    this.newslettersForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  onSubmit() {
    this.loading.set(true)
    if (this.newslettersForm.valid) {
      this.service.sendData(this.newslettersForm.value.name, this.newslettersForm.value.email).subscribe({
        next: () => {
          this.newslettersForm.reset()
        }
      })
    }
  }
}
