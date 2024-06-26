import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

export default function WorldExplorer({ country , interval, setCiudad }) {
  const [isLoading, setIsLoading] = useState(true);
  const [ciudadLocal, setCiudadLocal] = useState('');
  const [temp, setTemp] = useState('');
  const [hora, setHora] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [clima, setClima] = useState('');
  const [imagenCiudad, setImagenCiudad] = useState('');
  const [error, setError] = useState(null);
  const [shouldFetchData, setShouldFetchData] = useState(true);

  useEffect(() => {
    if (shouldFetchData) {
      fetchDataAndCiudad();
      const intervalId = setInterval(fetchDataAndCiudad, interval);
      return () => clearInterval(intervalId);
    }
  }, [shouldFetchData, country, interval]);

  useEffect(() => {
    console.log('Weather Icon URL:', weatherIcon);
  }, [weatherIcon]);

  const fetchDataAndCiudad = async () => {
    console.log('fetchDataAndCiudad');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "country": country
        })
      });

      const data = await response.json();

      if (!data.error) {
        console.log('data: ' + JSON.stringify(data));
        const states = data.data.states.map(state => state.name);
        console.log('states: ' + states);

        const randomIndex = Math.floor(Math.random() * states.length);
        const randomState = states[randomIndex];

        const cleanedState = randomState.replace(/Autonomous City Of | Province| Department| United States| Region| archipielago of/g, "").trim();
        console.log('Estado al Azar:', cleanedState);

        setCiudadLocal(cleanedState);
        setCiudad(cleanedState); // Actualizar el estado de `ciudad` en `App`

        const weatherResponse = await fetch(`http://api.weatherapi.com/v1/current.json?key=0e67c64fdda040e2b25195132230806&q=${cleanedState}&aqi=no`);
        const weatherData = await weatherResponse.json();

        if (!weatherResponse.ok) {
          throw new Error('Error al obtener datos meteorológicos');
        }

        console.log('CLIMA:', weatherData);
        setTemp(weatherData.current.temp_c);
        const localTime = weatherData.location.localtime;
        const time = localTime.split(' ')[1];
        setHora(time);

        const iconUrl = weatherData.current.condition.icon;
        const fullIconUrl = iconUrl.startsWith('//') ? `https:${iconUrl}` : iconUrl;
        setWeatherIcon(fullIconUrl);

        //Resumiendo clima //
        const cleanedClima = weatherData.current.condition.text.replace(/Patchy | Shower| Moderate or heavy | xxxxxx| xxxx| xxxxxxx xx/g, "").trim();
        console.log('Clima resumido:', cleanedClima);
        

        setClima(cleanedClima);
        getCityImage(cleanedState);
        setIsLoading(false);
        console.log("Temp:", temp);
        console.log("Horario:", time);
        console.log("Weather Icon:", fullIconUrl);
      } else {
        console.error("Error al obtener los estados de Argentina:", data.msg);
      }
    } catch (error) {
      console.error("Error al obtener los datos de la ciudad y el clima:", error);
      setIsLoading(false);
      setError(error);
    }
  };

  const getCityImage = (city) => {
    console.log('getCityImage');
    console.log('Buscando imagen de ', city);
    fetch(`https://api.unsplash.com/photos/random?query=${city}&client_id=s3au4VbClKzincnLNdLBE0tl7ws1C8KKtGORW8dW5ms`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al obtener la imagen de la ciudad');
        }
        return res.json();
      })
      .then(result => {
        if (result.urls && result.urls.regular) {
          setImagenCiudad(result.urls.regular);
          setIsLoading(false);
        } else {
          setImagenCiudad(require('../assets/splash1.png'));
          throw new Error('Datos de imagen inválidos');
        }
      })
      .catch(error => {
        console.error('Error al obtener la imagen de la ciudad:', error);
        setIsLoading(false);
      });
  };

  const determineWeatherImage = (clima) => {
    const climaLowerCase = clima.toLowerCase(); // Convertir la cadena a minúsculas

    if (climaLowerCase.includes('rain')) {
      return require('../assets/light-rain.png');
    }
    if (climaLowerCase.includes('cloudy')) {
      return require('../assets/cloudy.png');
    }
    if (climaLowerCase.includes('fog')) {
      return require('../assets/light-drizzle.png');
    }
    if (climaLowerCase.includes('snow')) {
      return require('../assets/snow.png');
    }

    switch (clima) {
      case 'Sunny':
        return require('../assets/sunny.png');
      case 'Cloudy':
        return require('../assets/cloudy.png');
      case 'Rainy':
        return require('../assets/light-rain.png');
      case 'Light rain':
        return require('../assets/light-rain.png');
      case 'Light drizzle':
        return require('../assets/light-drizzle.png');
      case 'Mist':
        return require('../assets/light-drizzle.png');
      case ('Partly cloudy' || 'Partly Cloudy'):
        return require('../assets/partly-cloudy.png');
      case 'Clear':
        return require('../assets/partly-cloudy.png');
      case 'Overcast':
        return require('../assets/overcast.png');
      case 'Patchy rain nearby':
        return require('../assets/Patchy-rain-nearby.png');
      default:
        return require('../assets/splash.png');
    }
  };

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${ciudadLocal},${country}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size='large' />
      ) : (
        <View>
          <Image
            source={imagenCiudad ? { uri: imagenCiudad } : require('../assets/splash1.png')}
            style={styles.imagen}
          />
          <View style={styles.textBox}>
            <ImageBackground
              source={determineWeatherImage(clima)}
              style={styles.backgroundImage}
              resizeMode="cover"
            >
              {/* CIUDAD */}
              <View style={styles.txContainer}>
                <Entypo name="location-pin" size={32} color="black" />
                <Text style={styles.city}>
                  {ciudadLocal.length > 18 ? ciudadLocal : `${ciudadLocal}, ${country}`}
                </Text>
              </View>

              <View style={styles.contenedorDatos}>

                {/* CLiMA */}
                <View style={styles.contenedorClima}>
                  {weatherIcon ? (
                    <Image source={{ uri: weatherIcon }} style={styles.weatherIcon} />
                  ) : (
                    <Text>No disponible</Text>
                  )}
                  <Text style={styles.time}>{clima}</Text>
                </View>

                {/* TEMPERATURA */}
                <View style={styles.contenedorClima}>
                  <View style={styles.contenedorTemp}>
                    <FontAwesome5 name="temperature-low" size={26} color="black" />
                    <Text style={styles.temperature}>{temp} °C</Text>
                  </View>
                  <View style={styles.contenedorHora}>
                    <Entypo name="clock" size={24} color="black" />
                    <Text style={styles.time}>{hora}</Text>
                  </View>

                </View>

              </View>

            </ImageBackground>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //  borderWidth:1,
    //  borderColor:'green',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 1,
    marginTop: '0%',
    marginBottom: '1%',
  },
  imagen: {
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    //  borderWidth:2,
    //  borderColor:'blue',
    width: 400,
    height: 550,
    resizeMode: 'cover',
    marginTop: '2%',
  },
  contenedorDatos: {
    flexShrink: 1,
    justifyContent: 'space-around',
    //  borderWidth:2,
    //  borderColor:'red',
    flexDirection: 'row',

  },
  contenedorClima: {
    alignItems: 'center',
    flexDirection: 'column',
    //  borderColor:'pink',
    height: 100,
    marginTop: 5,
    paddingBottom: 1,
    marginBottom: 12,
    backgroundColor: '#fffaf0',
    opacity: 1.8,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 4,
    alignContent: 'center',
    justifyContent: 'space-around'
  },
  contenedorHora: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 0,
    backgroundColor: '#fffaf0',
    opacity: 0.8,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  contenedorTemp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    borderColor: '#000000',

  },
  textBox: {
    flex: 0.35,
    backgroundColor: '#FFFFFF',
    // padding: 2,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  txContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 0,
    backgroundColor: '#fffaf0',
    opacity: 0.8,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  city: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',


  },
  temperature: {
    fontSize: 26,
    color: '#000000',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Color de la sombra del texto
    textShadowOffset: { width: 1, height: 1 }, // Desplazamiento de la sombra del texto
    textShadowRadius: 1, // Radio de la sombra del texto
    marginLeft: 5,

  },
  time: {
    fontSize: 24,
    color: '#000000',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Color de la sombra del texto
    textShadowOffset: { width: 1, height: 1 }, // Desplazamiento de la sombra del texto
    textShadowRadius: 1, // Radio de la sombra del texto
    marginLeft: 5,
    paddingVertical: 2,
  },
  weatherIcon: {
    //  borderWidth:1,
    borderColor: 'black',
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 0,
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.85,
    borderWidth: 2,
    //  borderColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
  },

});