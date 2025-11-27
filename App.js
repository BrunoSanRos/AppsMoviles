import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, View, Image, Text, StyleSheet, TextInput, TouchableOpacity, Linking, Alert } from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Necesitas permitir acceso a la cámara</Text>
        <Button title="Dar permiso" onPress={requestPermission} />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result.uri);
      setShowCamera(false);
    }
  };

  const handleBarcodeScanned = ({ data }) => {
    setShowQRScanner(false);
    
    // Verificar si es una URL válida
    if (data.startsWith('http://') || data.startsWith('https://')) {
      Alert.alert(
        'Código QR Escaneado',
        `¿Deseas abrir este enlace?\n\n${data}`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Abrir', 
            onPress: () => {
              Linking.openURL(data).catch(err => {
                Alert.alert('Error', 'No se pudo abrir el enlace');
                console.error('Error al abrir URL:', err);
              });
            }
          }
        ]
      );
    } else {
      Alert.alert('Código QR Escaneado', data);
    }
  };

  const handleLogin = () => {
    console.log('Login:', username, password, photo);
    // Aquí va tu lógica de login
  };

  if (showQRScanner) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView 
          ref={cameraRef} 
          style={styles.camera} 
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={handleBarcodeScanned}
        />
        <View style={styles.qrOverlay}>
          <View style={styles.qrFrame} />
          <Text style={styles.qrInstructions}>
            Apunta al código QR para escanearlo
          </Text>
        </View>
        <View style={styles.cameraButtons}>
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => setShowQRScanner(false)}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.camera} facing="front" />
        <View style={styles.cameraButtons}>
          <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
            <Text style={styles.captureButtonText}>Capturar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setShowCamera(false)}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginCard}>
        <Text style={styles.title}>Inicio de Sesión</Text>
        
        <View style={styles.photoContainer}>
          <TouchableOpacity onPress={() => setShowCamera(true)}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.photoPreview} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <View style={styles.userIcon}>
                  <View style={styles.userIconHead} />
                  <View style={styles.userIconBody} />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.shareButton} onPress={() => setShowCamera(true)}>
          <Text style={styles.shareButtonText}>COMPARTIR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.photoButton} onPress={() => setShowCamera(true)}>
          <Text style={styles.photoButtonText}>TOMAR UNA FOTO</Text>
        </TouchableOpacity>

        {/* Nuevo botón para escanear QR */}
        <TouchableOpacity style={styles.qrButton} onPress={() => setShowQRScanner(true)}>
          <Text style={styles.qrButtonText}>📱 ESCANEAR CÓDIGO QR</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nombre de usuario:</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Usuario"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>ACEPTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#2d2d44',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4a4aff',
  },
  title: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 20,
    fontWeight: '500',
  },
  photoContainer: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  photoPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  userIcon: {
    alignItems: 'center',
  },
  userIconHead: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    marginBottom: 5,
  },
  userIconBody: {
    width: 60,
    height: 35,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#000',
  },
  shareButton: {
    backgroundColor: '#4a4aff',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  photoButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4a4aff',
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 15,
  },
  photoButtonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  qrButton: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 25,
    width: '100%',
    alignItems: 'center',
  },
  qrButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    color: '#999',
    fontSize: 12,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#4a4aff',
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraButtons: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
  },
  captureButton: {
    backgroundColor: '#4a4aff',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
  captureButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ff4a4a',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  permissionText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  qrOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrFrame: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: '#4a4aff',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  qrInstructions: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
  },
});