// Importaciones de las configuraciones y plugins necesarios para ESLint
import eslint from '@eslint/js'; // Configuración base recomendada de ESLint
import tseslint from 'typescript-eslint'; // Plugin y configuraciones para TypeScript
import angular from '@angular-eslint/eslint-plugin'; // Plugin de reglas específicas de Angular
import angularTemplate from '@angular-eslint/eslint-plugin-template'; // Plugin para templates HTML de Angular
import angularTemplateParser from '@angular-eslint/template-parser'; // Parser para analizar templates HTML
import tsParser from '@typescript-eslint/parser'; // Parser para analizar código TypeScript

/**
 * Configuración de ESLint en formato Flat Config (ESLint v9+)
 * Esta configuración define las reglas de linting para archivos TypeScript y HTML en el proyecto Angular
 */
export default [
  // Configuración de archivos a ignorar durante el análisis de ESLint
  {
    ignores: ['projects/**/*', 'dist/**', 'node_modules/**', '.angular/**', 'coverage/**'],
  },

  // Configuración base recomendada de ESLint para JavaScript/TypeScript
  eslint.configs.recommended,

  // Configuración específica para archivos TypeScript (.ts)
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser, // Utiliza el parser de TypeScript
      parserOptions: {
        project: './tsconfig.json', // Referencia al archivo de configuración de TypeScript
      },
    },
    plugins: {
      '@angular-eslint': angular, // Plugin para reglas de Angular
      '@typescript-eslint': tseslint.plugin, // Plugin para reglas de TypeScript
    },
    rules: {
      // Incluye las reglas recomendadas de TypeScript ESLint
      ...tseslint.configs.recommended[1].rules,

      // Regla: Los selectores de directivas deben usar el prefijo 'app' y estilo camelCase
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],

      // Regla: Los selectores de componentes deben usar el prefijo 'app' y estilo kebab-case
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],

      // Regla: Todas las funciones deben tener un tipo de retorno explícito
      '@typescript-eslint/explicit-function-return-type': ['error'],

      // Regla: No permite constructores vacíos o inútiles
      '@typescript-eslint/no-useless-constructor': ['error'],

      // Regla: No permite funciones vacías (sin contenido)
      '@typescript-eslint/no-empty-function': ['error'],

      // Regla: Exige modificadores de accesibilidad explícitos (public, private, protected)
      // Excepción: Los métodos de ciclo de vida de Angular no requieren modificadores explícitos
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit', // Requiere modificadores explícitos en todos los miembros
          overrides: {
            constructors: 'no-public', // Los constructores no necesitan 'public' explícito
            parameterProperties: 'explicit', // Parámetros del constructor requieren modificador explícito
            methods: 'explicit', // Métodos requieren modificador explícito
          },
          ignoredMethodNames: [
            // Métodos de ciclo de vida de Angular que no requieren modificador de accesibilidad
            'ngOnInit',
            'ngOnDestroy',
            'ngOnChanges',
            'ngDoCheck',
            'ngAfterContentInit',
            'ngAfterContentChecked',
            'ngAfterViewInit',
            'ngAfterViewChecked',
          ],
        },
      ],
    },
  },

  // Configuración específica para archivos HTML de templates de Angular
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser, // Utiliza el parser específico para templates de Angular
    },
    plugins: {
      '@angular-eslint/template': angularTemplate, // Plugin para reglas de templates
    },
    rules: {
      // Advertencia: Los eventos de click deben tener eventos de teclado correspondientes (accesibilidad)
      '@angular-eslint/template/click-events-have-key-events': 'warn',

      // Advertencia: Los elementos interactivos deben ser enfocables (accesibilidad)
      '@angular-eslint/template/interactive-supports-focus': 'warn',
    },
  },
];
