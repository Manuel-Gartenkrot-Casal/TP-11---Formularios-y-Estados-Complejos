import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colores } from '../colores';

export default function LoaderEnvio({ visible }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.tarjeta}>
        <ActivityIndicator size="large" color={colores.acento} />
        <Text style={styles.titulo}>Enviando tu inscripción…</Text>
        <Text style={styles.subtitulo}>
          Sonido Sur te está reservando la entrada ✨
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(14, 15, 29, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tarjeta: {
    backgroundColor: colores.tarjeta,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colores.inputBorde,
    maxWidth: 280,
  },
  titulo: {
    color: colores.texto,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12,
  },
  subtitulo: {
    color: colores.textoSuave,
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
  },
});