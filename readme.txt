expo init .

// app.json: agregar package en android

// Builds: 
1- Instalar EAS Cli - npm install -g eas-cli - si no está instalado.
2- eas login (puedo verificar si estoy logeado con - eas whoami -)
3- eas build:configure

.apk: Agregar en eas.json -> build ->  "nombreAEleccion": {
                                          "android": {
                                            "buildType": "apk"
                                          }
                                        },
// production: npx expo start --no-dev
eas build -p android --profile nombreAEleccion