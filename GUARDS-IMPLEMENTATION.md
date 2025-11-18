# 🛡️ Guards de Autenticación - FinanSmart

## Guards Implementados

### 1. 🔐 **authGuard** (`src/app/guards/auth.guard.ts`)

**Propósito**: Proteger rutas que requieren autenticación básica
**Formato**: CanActivateFn (Functional Guard)

**Funcionamiento**:

- ✅ Verifica si el usuario está autenticado
- ❌ Si NO → Redirige a `/login`
- ✅ Si SÍ → Permite acceso

**Uso**: Para rutas que solo necesitan verificar autenticación

### 2. 🚪 **loginGuard** (`src/app/guards/login.guard.ts`)

**Propósito**: Evitar que usuarios ya logueados accedan al login
**Formato**: CanActivateFn (Functional Guard)

**Funcionamiento**:

- ✅ Si está autenticado → Redirige a `/dashboard`
- ❌ Si NO está autenticado → Permite acceso al login

**Uso**: Para la ruta `/login` únicamente

### 3. 🎫 **tokenGuard** (`src/app/guards/token.guard.ts`)

**Propósito**: Validación robusta con token JWT
**Formato**: CanActivateFn (Functional Guard)

**Funcionamiento**:

1. Verifica autenticación básica
2. Valida que existe un token JWT válido
3. Si falla cualquiera → Redirige a `/login`

**Uso**: Para rutas críticas que requieren token válido

## 🗺️ Configuración de Rutas

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 🚪 Login protegido contra acceso de usuarios ya logueados
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard], // ← Redirige a dashboard si ya está logueado
  },

  // 🛡️ Dashboard protegido con validación de token
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [tokenGuard], // ← Valida token JWT
    children: [
      { path: '', component: DashboardComponent },
      { path: 'budgets', component: BudgetsComponent },
    ],
  },
];
```

## 🔄 Flujos de Autenticación

### **Flujo 1: Usuario no autenticado intenta acceder a dashboard**

```
Usuario → /dashboard
         ↓
    tokenGuard ejecuta
         ↓
   No hay token válido
         ↓
   Redirect → /login
```

### **Flujo 2: Usuario autenticado intenta acceder a login**

```
Usuario → /login
         ↓
    loginGuard ejecuta
         ↓
   Usuario ya logueado
         ↓
   Redirect → /dashboard
```

### **Flujo 3: Login exitoso**

```
Login exitoso → AuthService.signIn()
              ↓
         Token almacenado
              ↓
         Navigate → /dashboard
              ↓
         tokenGuard valida
              ↓
         Acceso permitido ✅
```

### **Flujo 4: Logout**

```
Click logout → DashboardLayout.logout()
             ↓
        AuthService.signOut()
             ↓
        Tokens limpiados
             ↓
        Navigate → /login
```

## 🔧 Características Técnicas

### **Observables y RxJS**

- Todos los guards usan `Observable<boolean>`
- Manejo de errores con `catchError`
- Transformaciones con `map` y `switchMap`

### **Error Handling**

- Fallos de red → Redirect a login
- Tokens expirados → Redirect a login
- Errores de Cognito → Redirect a login

### **Performance**

- Guards son lazy-loaded
- Validaciones asíncronas optimizadas
- Cache de estado de autenticación

## 🎯 Beneficios

1. **🔒 Seguridad Robusta**
   - Validación de tokens JWT
   - Protección contra acceso no autorizado
   - Limpieza automática de sesiones

2. **📱 UX Mejorada**
   - No más pantallas de login innecesarias
   - Redirects automáticos inteligentes
   - Estados de carga consistentes

3. **🛠️ Mantenibilidad**
   - Guards reutilizables
   - Lógica centralizada
   - Fácil testing y debugging

4. **⚡ Performance**
   - Validaciones asíncronas eficientes
   - Guards independientes y modulares
   - Mínimo overhead

## 🧪 Testing

Para testear los guards:

```typescript
// Ejemplo de test para authGuard (Functional Guard)
describe('authGuard', () => {
  it('should redirect to login if not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(of(false));

    TestBed.runInInjectionContext(() => {
      authGuard().subscribe(result => {
        expect(result).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
      });
    });
  });
});
```

## 🚀 Próximas Mejoras

- [ ] **Role-based access** (Admin, User roles)
- [ ] **Route-specific permissions**
- [ ] **Session timeout** automático
- [ ] **Refresh token** automático
- [ ] **Multi-factor authentication**

Los guards están completamente implementados y listos para proteger tu aplicación! 🛡️✨
