import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colores } from '../colores';

export default function CampoFormulario({
  etiqueta,
  valor,
  onChangeText,
  onBlur,
  error,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
  maxLength,
  pista,
}) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>

      <TextInput
        style={[styles.input, error && styles.inputConError]}
        value={valor}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={colores.textoFondo}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        maxLength={maxLength}
      />

      {pista && !error ? <Text style={styles.pista}>{pista}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 18,
  },
  etiqueta: {
    color: colores.textoSuave,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colores.input,
    borderColor: colores.inputBorde,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colores.texto,
    fontSize: 16,
  },
  inputConError: {
    borderColor: colores.error,
  },
  pista: {
    color: colores.textoFondo,
    fontSize: 12,
    marginTop: 6,
  },
  error: {
    color: colores.error,
    fontSize: 13,
    marginTop: 6,
  },
});