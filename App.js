import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');

  const calcular = () => {
    const p = parseFloat(peso);
    const a = parseFloat(altura);
    
    if (p > 0 && a > 0) {
      const imc = (p / (a * a)).toFixed(2);
      let categoria = '';
      
      if (imc < 18.5) categoria = 'Bajo peso';
      else if (imc < 25) categoria = 'Normal';
      else if (imc < 30) categoria = 'Sobrepeso';
      else categoria = 'Obesidad';
      
      setResultado(`IMC: ${imc} - ${categoria}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora IMC</Text>
      
      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
        placeholder="Ej: 70"
      />

      <Text style={styles.label}>Altura (m):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
        placeholder="Ej: 1.75"
      />

      <TouchableOpacity style={styles.button} onPress={calcular}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {resultado ? (
        <View style={styles.resultado}>
          <Text style={styles.resultadoText}>{resultado}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  resultadoText: {
    fontSize: 20,
    textAlign: 'center',
  },
});