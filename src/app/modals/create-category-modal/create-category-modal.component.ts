import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-create-category-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './create-category-modal.component.html',
  styleUrl: './create-category-modal.component.scss',
})
export class CreateCategoryModalComponent {
  private dialogRef = inject(MatDialogRef<CreateCategoryModalComponent>);

  public categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    color: new FormControl('#6366f1', Validators.required),
    icon: new FormControl('category', Validators.required),
  });

  public predefinedColors = [
    { name: 'Índigo', value: '#6366f1' },
    { name: 'Naranja', value: '#f59e0b' },
    { name: 'Verde', value: '#10b981' },
    { name: 'Rojo', value: '#ef4444' },
    { name: 'Rosa', value: '#ec4899' },
    { name: 'Púrpura', value: '#8b5cf6' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Gris', value: '#71717a' },
  ];

  public predefinedIcons = [
    { name: 'Hogar', value: 'home' },
    { name: 'Transporte', value: 'directions_car' },
    { name: 'Comida', value: 'restaurant' },
    { name: 'Compras', value: 'shopping_cart' },
    { name: 'Salud', value: 'local_hospital' },
    { name: 'Fitness', value: 'fitness_center' },
    { name: 'Entretenimiento', value: 'movie' },
    { name: 'Educación', value: 'school' },
    { name: 'Servicios', value: 'build' },
    { name: 'Facturas', value: 'receipt' },
    { name: 'Teléfono', value: 'phone_android' },
    { name: 'Internet', value: 'wifi' },
    { name: 'Streaming', value: 'play_circle' },
    { name: 'Ropa', value: 'checkroom' },
    { name: 'Mascota', value: 'pets' },
    { name: 'Viajes', value: 'flight' },
    { name: 'Café', value: 'local_cafe' },
    { name: 'Regalo', value: 'card_giftcard' },
    { name: 'Ahorro', value: 'savings' },
    { name: 'Otro', value: 'category' },
  ];

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.categoryForm.valid) {
      this.dialogRef.close({
        name: this.categoryForm.value.name,
        color: this.categoryForm.value.color,
        icon: this.categoryForm.value.icon,
      });
    }
  }

  public selectColor(color: string): void {
    this.categoryForm.patchValue({ color });
  }

  public selectIcon(icon: string): void {
    this.categoryForm.patchValue({ icon });
  }

  public get selectedColor(): string {
    return this.categoryForm.get('color')?.value || '#6366f1';
  }

  public get selectedIcon(): string {
    return this.categoryForm.get('icon')?.value || 'category';
  }

  public get previewName(): string {
    return this.categoryForm.get('name')?.value || 'Vista Previa';
  }
}
