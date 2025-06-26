// Web-compatible mock for react-native-maps
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Mock MapView component for web
const MapView = React.forwardRef((props, ref) => {
  const { children, style, onPress, ...otherProps } = props;
  
  return (
    <View 
      ref={ref}
      style={[styles.mapContainer, style]} 
      onTouchEnd={onPress}
      {...otherProps}
    >
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map View</Text>
        <Text style={styles.mapSubtext}>(Web Preview)</Text>
      </View>
      {children}
    </View>
  );
});

// Mock Marker component for web
const Marker = ({ coordinate, title, description, children, ...props }) => {
  return (
    <View style={styles.marker} {...props}>
      <View style={styles.markerPin}>
        <Text style={styles.markerText}>📍</Text>
      </View>
      {title && <Text style={styles.markerTitle}>{title}</Text>}
    </View>
  );
};

// Mock other common react-native-maps exports
const PROVIDER_GOOGLE = 'google';
const PROVIDER_DEFAULT = 'default';

const styles = StyleSheet.create({
  mapContainer: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  mapSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
  },
  markerPin: {
    backgroundColor: '#ff0000',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    fontSize: 16,
  },
  markerTitle: {
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 4,
    fontSize: 12,
    marginTop: 2,
  },
});

// Export all the components and constants that react-native-maps typically exports
export default MapView;
export {
  MapView,
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
};