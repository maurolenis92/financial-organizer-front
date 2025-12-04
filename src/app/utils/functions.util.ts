/**
 * Hace scroll al tope de la página de forma suave
 * Útil para llamar en ngOnInit() o al cambiar de ruta
 *
 * @example
 * ```typescript
 * ngOnInit(): void {
 *   scrollToTop();
 * }
 * ```
 */
export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

/**
 * Hace scroll al tope de la página de forma instantánea (sin animación)
 * Útil cuando necesitas un scroll inmediato
 *
 * @example
 * ```typescript
 * ngOnInit(): void {
 *   scrollToTopInstant();
 * }
 * ```
 */
export function scrollToTopInstant(): void {
  window.scrollTo(0, 0);
}

/**
 * Hace scroll a un elemento específico de la página
 *
 * @param elementId - El ID del elemento al que hacer scroll
 * @param behavior - Tipo de comportamiento: 'smooth' o 'auto'
 *
 * @example
 * ```typescript
 * scrollToElement('my-section', 'smooth');
 * ```
 */
export function scrollToElement(
  elementId: string,
  behavior: ScrollBehavior = 'smooth'
): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior, block: 'start' });
  }
}
