# Generación de Iconos para FinanSmart

Este proyecto incluye scripts para generar todos los formatos de iconos necesarios.

## Iconos Generados

- `favicon.ico` - Multi-resolución (16x16, 32x32, 48x48)
- `favicon-16x16.png` - Para navegadores modernos
- `favicon-32x32.png` - Para navegadores modernos
- `apple-touch-icon.png` - Para dispositivos Apple (180x180)
- `android-chrome-192x192.png` - Para Android
- `android-chrome-512x512.png` - Para Android

## Método 1: Usando herramientas online

1. Visita: https://realfavicongenerator.net/
2. Sube el archivo `src/assets/icon.svg`
3. Descarga el paquete completo
4. Extrae los archivos en la carpeta `src/`

## Método 2: Usando npm (Recomendado)

```bash
# Instalar la herramienta
npm install --save-dev sharp-cli

# Generar iconos
npm run generate:icons
```

## Método 3: Usando ImageMagick (si está instalado)

```bash
# Convertir SVG a PNG de diferentes tamaños
convert -background none src/assets/icon.svg -resize 16x16 src/favicon-16x16.png
convert -background none src/assets/icon.svg -resize 32x32 src/favicon-32x32.png
convert -background none src/assets/icon.svg -resize 180x180 src/apple-touch-icon.png
convert -background none src/assets/icon.svg -resize 192x192 src/android-chrome-192x192.png
convert -background none src/assets/icon.svg -resize 512x512 src/android-chrome-512x512.png

# Crear favicon.ico multi-resolución
convert src/favicon-16x16.png src/favicon-32x32.png src/favicon.ico
```

## Archivos Creados

- `icon.svg` - Versión simplificada del logo para iconos
- El logo original permanece en `logo.svg`
