import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colores } from '../colores';

const OPCIONES = [
  { valor: 'general', etiqueta: 'General', detalle: '$25.000' },
  { valor: 'vip', etiqueta: 'VIP', detalle: '$75.000' },
];

export default function SelectorEntrada({ valor, onSeleccionar, error }) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>Tipo de entrada</Text>

      <View style={styles.filaOpciones}>
        {OPCIONES.map((opcion) => {
          const seleccionada = valor === opcion.valor;
          return (
            <Pressable
              key={opcion.valor}
              style={[styles.opcion, seleccionada && styles.opcionSeleccionada]}
              onPress={() => onSeleccionar(opcion.valor)}
            >
              <Text
                style={[
                  styles.opcionEtiqueta,
                  seleccionada && styles.opcionEtiquetaSeleccionada,
                ]}
              >
                {opcion.etiqueta}
              </Text>
              <Text
                style={[
                  styles.opcionDetalle,
                  seleccionada && styles.opcionDetalleSeleccionada,
                ]}
              >
                {opcion.detalle}
              </Text>
            </Pressable>
          );
        })}
      </View>

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
  filaOpciones: {
    flexDirection: 'row',
    gap: 10,
  },
  opcion: {
    flex: 1,
    backgroundColor: colores.input,
    borderColor: colores.inputBorde,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  opcionSeleccionada: {
    backgroundColor: colores.acento,
    borderColor: colores.acento,
  },
  opcionEtiqueta: {
    color: colores.texto,
    fontSize: 16,
    fontWeight: '700',
  },
  opcionEtiquetaSeleccionada: {
    color: colores.fondo,
  },
  opcionDetalle: {
    color: colores.textoSuave,
    fontSize: 12,
    marginTop: 4,
  },
  opcionDetalleSeleccionada: {
    color: colores.fondo,
    opacity: 0.8,
  },
  error: {
    color: colores.error,
    fontSize: 13,
    marginTop: 6,
  },
});