import React from 'react';
import { View, Button } from 'react-native';

export default function LocationButton({ city, country }) {
  const handleOpenInMaps = () => {
    const location = `${city}, ${country}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    Linking.openURL(url);
  };

  return (
    <View>
      <Button title="Open in Google Maps" onPress={handleOpenInMaps} />
    </View>
  );
}
