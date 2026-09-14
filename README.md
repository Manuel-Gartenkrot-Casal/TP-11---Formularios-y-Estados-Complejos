# Sonido Sur — Inscripción

TP de React Native con Expo, React Hook Form y AsyncStorage.

## Correr

```bash
npm install
npx expo install --fix
npx expo start
```

Presionar `w` para web, o escanear el QR con Expo Go.

## Validación

Se usa React Hook Form (`useForm` + `Controller` + `rules`): maneja el estado
de todos los campos en un solo lugar, valida en vivo (`mode: 'onChange'`) y
expone `formState.isValid` para deshabilitar el botón mientras haya errores.

| Campo            | Regla                                   | Mensaje                              |
| ---------------- | --------------------------------------- | ------------------------------------ |
| nombreCompleto   | obligatorio, mínimo 3 (con trim)        | Ingresá tu nombre completo           |
| email            | obligatorio, regex con @ y dominio      | Ingresá un email válido              |
| edad             | obligatorio, entre 12 y 99              | La edad tiene que ser mayor a 12     |
| tipoEntrada      | obligatorio (general / vip)             | Elegí un tipo de entrada             |
| telefono         | opcional, solo números si se completa   | Solo se permiten números             |

Los errores aparecen debajo de cada campo y el botón queda deshabilitado
mientras el formulario no esté completo.

## Estructura

```
src/
├── colores.js                       # paleta compartida
├── components/
│   ├── CabeceraFormulario.js        # encabezado del formulario
│   ├── CampoFormulario.js           # campo de texto reutilizable
│   ├── SelectorEntrada.js           # selector general/vip
│   ├── FormularioInscripcion.js     # arma los campos con los controllers
│   ├── BotonConfirmar.js            # botón con estado deshabilitado
│   ├── LoaderEnvio.js               # overlay de envío simulado
│   └── TicketConfirmacion.js        # ticket, recibe los datos por props
└── screens/
    └── InscripcionScreen.js         # dueña del estado: useForm + participante
```

InscripcionScreen levanta el estado (lifting state up), valida y muestra el
formulario o el TicketConfirmacion según si la inscripción fue confirmada.
Cada componente usa StyleSheet propio y no guarda datos.

## Bonus

- AsyncStorage: guarda y precarga el último email inscripto.
- Envío simulado de 1 segundo con overlay + animación de entrada del ticket.

## Capturas

Ver `/capturas`.