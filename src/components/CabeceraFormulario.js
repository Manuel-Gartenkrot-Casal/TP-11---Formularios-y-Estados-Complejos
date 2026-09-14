import { StyleSheet, Text, View } from 'react-native';

import { colores } from '../colores';

export default function CabeceraFormulario({ badge, titulo, subtitulo }) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.badge}>{badge}</Text>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.subtitulo}>{subtitulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colores.acento,
    color: colores.fondo,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  titulo: {
    color: colores.texto,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 12,
  },
  subtitulo: {
    color: colores.textoSuave,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
});