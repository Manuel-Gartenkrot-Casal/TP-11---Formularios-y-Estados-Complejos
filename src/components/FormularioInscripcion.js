import { StyleSheet, View } from 'react-native';
import { Controller } from 'react-hook-form';

import BotonConfirmar from './BotonConfirmar';
import CabeceraFormulario from './CabeceraFormulario';
import CampoFormulario from './CampoFormulario';
import SelectorEntrada from './SelectorEntrada';
import { colores } from '../colores';

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_NUMEROS = /^\d+$/;

const reglas = {
  nombreCompleto: {
    required: { value: true, message: 'Ingresá tu nombre completo' },
    validate: (v) =>
      (v && v.trim().length >= 3) || 'Ingresá tu nombre completo',
  },
  email: {
    required: { value: true, message: 'Ingresá un email válido' },
    pattern: { value: REGEX_EMAIL, message: 'Ingresá un email válido' },
  },
  edad: {
    required: { value: true, message: 'La edad tiene que ser mayor a 12' },
    validate: (v) => {
      const n = Number(v);
      return (n >= 12 && n <= 99) || 'La edad tiene que ser mayor a 12';
    },
  },
  tipoEntrada: {
    required: { value: true, message: 'Elegí un tipo de entrada' },
  },
  telefono: {
    required: false,
    validate: (v) => {
      if (!v || v.trim() === '') return true;
      return REGEX_NUMEROS.test(v) || 'Solo se permiten números';
    },
  },
};

export default function FormularioInscripcion({
  control,
  errors,
  tocados,
  marcarTocado,
  isValid,
  enviando,
  onConfirmar,
}) {
  const nota = !isValid
    ? 'Completá todos los campos para poder confirmar'
    : '¡Todo listo! Cuando confirmes te mostramos tu pase.';

  return (
    <>
      <CabeceraFormulario
        badge="🎸 SONIDO SUR"
        titulo="Inscribite al festival"
        subtitulo="Un finde entero de música en el campo. Completá tus datos y guardá tu pase en 30 segundos."
      />

      <View style={styles.tarjeta}>
        <Controller
          name="nombreCompleto"
          control={control}
          rules={reglas.nombreCompleto}
          render={({ field: { onChange, onBlur, value } }) => (
            <CampoFormulario
              etiqueta="Nombre completo"
              valor={value}
              onChangeText={onChange}
              onBlur={() => marcarTocado('nombreCompleto')}
              placeholder="Ej.: Carla Gómez"
              error={
                tocados.nombreCompleto ? errors.nombreCompleto?.message : undefined
              }
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={reglas.email}
          render={({ field: { onChange, onBlur, value } }) => (
            <CampoFormulario
              etiqueta="Email"
              valor={value}
              onChangeText={onChange}
              onBlur={() => marcarTocado('email')}
              placeholder="carla@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={tocados.email ? errors.email?.message : undefined}
            />
          )}
        />

        <Controller
          name="edad"
          control={control}
          rules={reglas.edad}
          render={({ field: { onChange, onBlur, value } }) => (
            <CampoFormulario
              etiqueta="Edad"
              valor={value}
              onChangeText={onChange}
              onBlur={() => marcarTocado('edad')}
              placeholder="Ej.: 25"
              keyboardType="numeric"
              maxLength={2}
              error={tocados.edad ? errors.edad?.message : undefined}
            />
          )}
        />

        <Controller
          name="tipoEntrada"
          control={control}
          rules={reglas.tipoEntrada}
          render={({ field: { onChange, value } }) => (
            <SelectorEntrada
              valor={value}
              onSeleccionar={(v) => {
                onChange(v);
                marcarTocado('tipoEntrada');
              }}
              error={
                tocados.tipoEntrada ? errors.tipoEntrada?.message : undefined
              }
            />
          )}
        />

        <Controller
          name="telefono"
          control={control}
          rules={reglas.telefono}
          render={({ field: { onChange, onBlur, value } }) => (
            <CampoFormulario
              etiqueta="Teléfono"
              valor={value}
              onChangeText={onChange}
              onBlur={() => marcarTocado('telefono')}
              placeholder="Ej.: 1145454545"
              keyboardType="phone-pad"
              maxLength={15}
              pista="Opcional"
              error={tocados.telefono ? errors.telefono?.message : undefined}
            />
          )}
        />
      </View>

      <BotonConfirmar
        onPress={onConfirmar}
        deshabilitado={!isValid || enviando}
        enviando={enviando}
        nota={nota}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colores.inputBorde,
    marginBottom: 20,
  },
});