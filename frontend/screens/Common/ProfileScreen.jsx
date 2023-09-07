import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const ProfileScreen = () => {
  // State variables to store user information
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [houseNumber, setHouseNumber] = React.useState('');
  const [streetName1, setStreetName1] = React.useState('');
  const [streetName2, setStreetName2] = React.useState('');
  const [city, setCity] = React.useState('');
  const [stateProvince, setStateProvince] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');

  // Function to update user information
  const updateProfile = () => {
    // Implmentation needed here
    // Need authentication for fingerprint
  };

  // Function to cancel update
  const cancelUpdate = () => {
    // Implmentation needed here
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Profile Information</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            accessibilityLabel="First Name Input"
            accessibilityRole="text"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            accessibilityLabel="Last Name Input"
            accessibilityRole="text"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            accessibilityLabel="Email Input"
            accessibilityRole="text"
            inputMode="email"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            accessibilityLabel="Phone Number Input"
            accessibilityRole="text"
            inputMode="tel"
          />
        </View>
        <Text style={styles.header}>Shipping Information</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>House Number</Text>
          <TextInput
            style={styles.input}
            placeholder="House Number"
            value={houseNumber}
            onChangeText={setHouseNumber}
            accessibilityLabel="House Number Input"
            accessibilityRole="text"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Street Name 1</Text>
          <TextInput
            style={styles.input}
            placeholder="Street Name 1"
            value={streetName1}
            onChangeText={setStreetName1}
            accessibilityLabel="Street Name 1 Input"
            accessibilityRole="text"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Street Name 2</Text>
          <TextInput
            style={styles.input}
            placeholder="Street Name 2"
            value={streetName2}
            onChangeText={setStreetName2}
            accessibilityLabel="Street Name 2 Input"
            accessibilityRole="text"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput

            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
            accessibilityLabel="City Input"
            accessibilityRole="text"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>State/Province</Text>
          <TextInput
            style={styles.input}
            placeholder="State/Province"
            value={stateProvince}
            onChangeText={setStateProvince}
            accessibilityLabel="State/Province Input"
            accessibilityRole="text"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
            accessibilityLabel="Country Input"
            accessibilityRole="text"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Zip Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Zip Code"
            value={zipCode}
            onChangeText={setZipCode}
            accessibilityLabel="Zip Code Input"
            accessibilityRole="text"
            inputMode="numeric"
          />
        </View>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: 'gray' }}
          onPress={cancelUpdate}
          accessibilityLabel="Cancel Update Button"
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: 'blue' }}
          onPress={updateProfile}
          accessibilityLabel="Update Profile Button"
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  button: {
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default ProfileScreen;
