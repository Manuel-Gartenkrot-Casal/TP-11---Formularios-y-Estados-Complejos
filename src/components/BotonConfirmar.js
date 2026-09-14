import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colores } from '../colores';

export default function BotonConfirmar({ onPress, deshabilitado, enviando, nota }) {
  return (
    <View style={styles.contenedor}>
      <Pressable
        style={({ pressed }) => [
          styles.boton,
          deshabilitado && styles.botonDeshabilitado,
          pressed && !deshabilitado && styles.botonPresionado,
        ]}
        onPress={onPress}
        disabled={deshabilitado}
      >
        {enviando ? (
          <ActivityIndicator color={colores.fondo} />
        ) : (
          <Text style={styles.textoBoton}>Confirmar inscripción</Text>
        )}
      </Pressable>

      <Text style={styles.nota}>{nota}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 20,
  },
  boton: {
    backgroundColor: colores.acento2,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 3,
  },
  botonDeshabilitado: {
    backgroundColor: colores.inputBorde,
    elevation: 0,
  },
  botonPresionado: {
    transform: [{ scale: 0.98 }],
  },
  textoBoton: {
    color: colores.fondo,
    fontSize: 16,
    fontWeight: '800',
  },
  nota: {
    color: colores.textoSuave,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});