import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';

import FormularioInscripcion from '../components/FormularioInscripcion';
import LoaderEnvio from '../components/LoaderEnvio';
import TicketConfirmacion from '../components/TicketConfirmacion';
import { colores } from '../colores';

const CLAVE_ULTIMO_EMAIL = 'sonido-sur:ultimo-email';

const VALORES_INICIALES = {
  nombreCompleto: '',
  email: '',
  edad: '',
  tipoEntrada: '',
  telefono: '',
};

export default function InscripcionScreen() {
  const {
    control,
    handleSubmit,
    trigger,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: VALORES_INICIALES,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [participante, setParticipante] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [tocados, setTocados] = useState({});

  const marcarTocado = (campo) =>
    setTocados((prev) => (prev[campo] ? prev : { ...prev, [campo]: true }));

  useEffect(() => {
    void trigger();
    AsyncStorage.getItem(CLAVE_ULTIMO_EMAIL)
      .then((guardado) => {
        if (guardado) setValue('email', guardado, { shouldValidate: true });
      })
      .catch(() => {});
  }, []);

  const confirmarInscripcion = handleSubmit((datos) => {
    setEnviando(true);
    setTimeout(() => {
      AsyncStorage.setItem(CLAVE_ULTIMO_EMAIL, datos.email).catch(() => {});
      setParticipante(datos);
      setEnviando(false);
    }, 1000);
  });

  const volverAInscribir = () => {
    reset(VALORES_INICIALES);
    setParticipante(null);
    setTocados({});
    void trigger();
  };

  if (participante) {
    return (
      <TicketConfirmacion datos={participante} onVolver={volverAInscribir} />
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.pantalla}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
      >
        <FormularioInscripcion
          control={control}
          errors={errors}
          tocados={tocados}
          marcarTocado={marcarTocado}
          isValid={isValid}
          enviando={enviando}
          onConfirmar={confirmarInscripcion}
        />
      </ScrollView>

      <LoaderEnvio visible={enviando} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    flexGrow: 1,
    padding: 20,
    paddingTop: Platform.select({ ios: 56, android: 44, default: 24 }),
  },
});