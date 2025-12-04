# Modal de Creación de Categorías

## Descripción

Modal implementado con Angular Material Dialog que permite a los usuarios crear nuevas categorías de gastos desde el formulario de presupuestos.

## Características

- **Selección de nombre**: Input para el nombre de la categoría (mínimo 3 caracteres)
- **Selección de color**: Grid con 8 colores predefinidos
- **Vista previa**: Chip que muestra cómo se verá la categoría con el nombre y color seleccionados
- **Validación**: El botón "Crear" se deshabilita hasta que el formulario sea válido

## Componentes

### CreateCategoryModalComponent

`/src/app/modals/create-category-modal/`

**Props:**

- Ninguno (se abre mediante MatDialog)

**Retorna:**

```typescript
{
  name: string,
  color: string  // Hex color ej: '#6366f1'
}
```

**Colores disponibles:**

- Índigo: `#6366f1`
- Naranja: `#f59e0b`
- Verde: `#10b981`
- Rojo: `#ef4444`
- Rosa: `#ec4899`
- Púrpura: `#8b5cf6`
- Cyan: `#06b6d4`
- Gris: `#71717a`

## Uso

### En BudgetExpensesStepComponent

1. **Import necesario:**

```typescript
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateCategoryModalComponent } from '../../../../../modals/create-category-modal/create-category-modal.component';
```

2. **Agregar "+ Nueva Categoría" a las opciones:**

```typescript
public categories: SelectOption[] = [
  ...categoriesFromUserService,
  { label: '+ Nueva Categoría', value: 'new-category' }
];
```

3. **Detectar selección y abrir modal:**

```typescript
ngOnInit(): void {
  this.formExpense.get('category')?.valueChanges.subscribe(value => {
    if (value === 'new-category') {
      this.openCreateCategoryModal();
    }
  });
}
```

4. **Abrir el modal:**

```typescript
private openCreateCategoryModal(): void {
  const dialogRef = this.dialog.open(CreateCategoryModalComponent, {
    width: '500px',
    maxWidth: '90vw',
    disableClose: false,
    panelClass: 'custom-dialog-container',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Usuario creó la categoría
      const newCategoryId = `temp-${Date.now()}`;

      // Agregar a la lista
      this.categories = [
        ...this.categories.filter(cat => cat.value !== 'new-category'),
        { label: result.name, value: newCategoryId },
        { label: '+ Nueva Categoría', value: 'new-category' }
      ];

      // Auto-seleccionar la nueva categoría
      this.formExpense.patchValue({ category: newCategoryId });
    } else {
      // Usuario canceló
      this.formExpense.patchValue({ category: '' });
    }
  });
}
```

## Estilos Globales

En `styles.scss` se agregó:

```scss
.custom-dialog-container {
  .mat-mdc-dialog-container {
    background: transparent !important;
    box-shadow: none !important;

    .mdc-dialog__surface {
      background: transparent !important;
      box-shadow: none !important;
    }
  }
}
```

Esto permite que el modal use los estilos personalizados del componente.

## TODO

- [ ] Persistir la nueva categoría en el backend/UserService
- [ ] Manejar duplicados (validar si el nombre ya existe)
- [ ] Agregar opción de eliminar categorías creadas
- [ ] Sincronizar categorías entre diferentes pasos del wizard
- [ ] Agregar animación de entrada/salida del modal

## Notas

- Las categorías creadas actualmente tienen un ID temporal: `temp-${Date.now()}`
- Se debe implementar la lógica para persistir en el UserService o backend
- El modal se cierra automáticamente al hacer clic fuera o presionar ESC
- La validación requiere mínimo 3 caracteres en el nombre
