import { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colores } from '../colores';

export default function TicketConfirmacion({ datos, onVolver }) {
  const opacidad = useRef(new Animated.Value(0)).current;
  const deslizamiento = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacidad, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(deslizamiento, { toValue: 0, useNativeDriver: true, speed: 14 }),
    ]).start();
  }, [opacidad, deslizamiento]);

  const esVip = datos.tipoEntrada === 'vip';
  const folio =
    'SS-2026-' +
    (datos.nombreCompleto.length * 7 + datos.email.length * 3 + Number(datos.edad || 0));

  const filas = [
    { etiqueta: 'Nombre completo', valor: datos.nombreCompleto },
    { etiqueta: 'Email', valor: datos.email },
    { etiqueta: 'Edad', valor: `${datos.edad} años` },
    { etiqueta: 'Teléfono', valor: datos.telefono || 'No informado' },
  ];

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.prologo}>🎸 Sonido Sur · Inscripción confirmada</Text>

      <Animated.View
        style={[
          styles.ticket,
          {
            opacity: opacidad,
            transform: [{ translateY: deslizamiento }],
          },
        ]}
      >
        <View style={[styles.banda, esVip ? styles.bandaVip : styles.bandaGeneral]}>
          <Text style={styles.nombreFestival}>SONIDO SUR</Text>
          <Text style={styles.slogan}>Festival de música · 2026</Text>
        </View>

        <View style={styles.cuerpo}>
          <View style={styles.filaEntrada}>
            <View>
              <Text style={styles.etiquetaEntrada}>Tipo de entrada</Text>
              <Text style={[styles.tipoEntrada, esVip && styles.tipoEntradaVip]}>
                {esVip ? '★ VIP' : 'GENERAL'}
              </Text>
            </View>
            <Text style={styles.evento}>12/03 · Campo Sur</Text>
          </View>

          <View style={styles.divisorHueco}>
            <View style={styles.perforacionIzq} />
            <View style={styles.lineaDividida} />
            <View style={styles.perforacionDer} />
          </View>

          <View style={styles.filas}>
            {filas.map(({ etiqueta, valor }) => (
              <View key={etiqueta} style={styles.filaDato}>
                <Text style={styles.etiquetaDato}>{etiqueta}</Text>
                <Text style={styles.valorDato}>{valor}</Text>
              </View>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.folio}>FOLIO {folio}</Text>
            <Text style={styles.nota}>
              Presentá este código en el ingreso. ¡Nos vemos en la fiesta! 🎉
            </Text>
          </View>
        </View>
      </Animated.View>

      <Pressable
        style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}
        onPress={onVolver}
      >
        <Text style={styles.textoBoton}>Volver a inscribir a otra persona</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    padding: 20,
    paddingTop: 48,
  },
  prologo: {
    color: colores.textoSuave,
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  ticket: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colores.tarjeta,
    borderWidth: 1,
    borderColor: colores.inputBorde,
    marginBottom: 20,
  },
  banda: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  bandaGeneral: {
    backgroundColor: colores.acento,
  },
  bandaVip: {
    backgroundColor: colores.acento2,
  },
  nombreFestival: {
    color: colores.fondo,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
  },
  slogan: {
    color: colores.fondo,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
    opacity: 0.75,
  },
  cuerpo: {
    padding: 20,
  },
  filaEntrada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  etiquetaEntrada: {
    color: colores.textoSuave,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tipoEntrada: {
    color: colores.acento,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  tipoEntradaVip: {
    color: colores.acento2,
  },
  evento: {
    color: colores.textoSuave,
    fontSize: 13,
    marginTop: 4,
  },
  divisorHueco: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  lineaDividida: {
    flex: 1,
    borderStyle: 'dashed',
    borderTopWidth: 1,
    borderColor: colores.inputBorde,
  },
  perforacionIzq: {
    position: 'absolute',
    left: -30,
    top: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colores.fondo,
  },
  perforacionDer: {
    position: 'absolute',
    right: -30,
    top: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colores.fondo,
  },
  filas: {
    gap: 14,
  },
  filaDato: {
    borderBottomWidth: 1,
    borderBottomColor: colores.inputBorde,
    paddingBottom: 10,
  },
  etiquetaDato: {
    color: colores.textoSuave,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valorDato: {
    color: colores.texto,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 3,
  },
  footer: {
    marginTop: 18,
    alignItems: 'center',
  },
  folio: {
    color: colores.exito,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  nota: {
    color: colores.textoSuave,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  boton: {
    backgroundColor: colores.acento2,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 3,
  },
  botonPresionado: {
    transform: [{ scale: 0.98 }],
  },
  textoBoton: {
    color: colores.fondo,
    fontSize: 15,
    fontWeight: '800',
  },
});