import { SafeAreaView, StatusBar, StyleSheet, Text, View, BackHandler, Modal, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IconButton, MD3Colors } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DatePicker from 'react-native-date-picker'
import { auth } from '../Firebase';
import { db } from '../components/Config';
import { getDatabase, ref, remove, set, update, onValue, get } from "firebase/database";


const Home = () => {

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSubmit = () => {
    update(ref(db, 'users/' + name), {
      id: id,
      name: name,
      email: email,
      age: age,
      address: address
    });

    setId('');
    setName('');
    setAge('');
    setAddress('');
  }

  const handleCreate = () => {
    setModal(true)
  }

  const handleCloseModal = () => {
    setModal(false)
  }

  const handleRead = (user) => {
    setSelectedUser(user);
    setModal1(true)
  };

  const handleReadClose = () => {
    setModal1(false)
  }

  const clearForm = () => {
    setId("")
    setName("")
    setAge("")
    setDate(new Date())
    setAddress("")
  }

  function readData() {
    const usersRef = ref(db, 'users/');
    get(usersRef)
      .then((snapshot) => {
        const usersData = snapshot.val();
        setUsersData(usersData);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  useEffect(() => {
    readData();
  }, []);

  useEffect(() => {
    readData();
  }, [selectedUser]);

  const reviewData = {
    labels: ['Performance', 'Communication', 'Teamwork', 'Leadership'],
    datasets: [
      {
        data: [4.5, 3.8, 4.2, 4.0], // Example ratings for each category
      },
    ],
  };


  return (
    <SafeAreaView style={styles.wrapper}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modal}
      >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.container}>

              <View style={{ marginBottom: 10, marginLeft: "38%", marginTop: 10, flexDirection: 'row' }}>
                <Image style={{ width: 80, height: 80 }} source={require('../assests/images/seller.png')} />
                <TouchableOpacity onPress={handleCloseModal} style={{ marginLeft: 80 }}>
                  <FontAwesome name='window-close' size={40} color="#ef233c" style={{ paddingTop: 5, marginRight: 5 }} />
                </TouchableOpacity>
              </View>

              <View style={{ paddingHorizontal: 25 }}>

                <Text style={styles.logintxt}>Edit employee profile</Text>

                <ScrollView>

                  <View style={styles.txtinput}>
                    <Ionicons name='people' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                    <TextInput
                      placeholderTextColor='gray'
                      color='black'
                      placeholder='ID number'
                      style={{ flex: 1, paddingVertical: 0 }}
                      value={id}
                      onChangeText={(text) => { setId(text) }}
                    />
                  </View>

                  <View style={styles.txtinput}>
                    <Ionicons name='person' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                    <TextInput
                      placeholderTextColor='gray'
                      color='black'
                      placeholder='Full Name'
                      style={{ flex: 1, paddingVertical: 0 }}
                      value={name}
                      onChangeText={(text) => { setName(text) }}
                    />
                  </View>

                  <View style={styles.txtinput}>
                    <Ionicons name='mail' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                    <TextInput
                      placeholderTextColor='gray'
                      color='black'
                      placeholder='Email'
                      style={{ flex: 1, paddingVertical: 0 }}
                      value={email}
                      onChangeText={(text) => { setEmail(text) }}
                      keyboardType={'email-address'}
                    />
                  </View>

                  <View style={styles.txtinput}>
                    <Ionicons name='calendar' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                    <TextInput
                      placeholderTextColor='gray'
                      color='black'
                      placeholder='Age'
                      style={{ flex: 1, paddingVertical: 0 }}
                      value={age}
                      onChangeText={(text) => { setAge(text) }}
                    />
                  </View>

                  <View style={styles.txtinput}>
                    <Ionicons name='home' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                    <TextInput
                      placeholderTextColor='gray'
                      color='black'
                      placeholder='Address'
                      style={{ flex: 1, paddingVertical: 0 }}
                      value={address}
                      onChangeText={(text) => { setAddress(text) }}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={handleSubmit} style={{ backgroundColor: '#AD40AF', padding: 10, borderRadius: 16 }}>
                    <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 18, color: 'white' }}>Edit </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={clearForm} style={{ backgroundColor: '#AD40AF', padding: 10, borderRadius: 16, marginTop: 19 }}>
                    <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 18, color: 'white' }}>Clear</Text>
                  </TouchableOpacity>

                  <View style={{ marginTop: 33 }}></View>

                </ScrollView>

              </View>
            </View>
          </View>
        </View>


      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={modal1}
      >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.container}>

              <View style={{ marginBottom: 10, marginLeft: "38%", marginTop: 10, flexDirection: 'row' }}>
                <Image style={{ width: 80, height: 80 }} source={require('../assests/images/seller.png')} />
                <TouchableOpacity onPress={handleReadClose} style={{ marginLeft: 80 }}>
                  <FontAwesome name='window-close' size={40} color="#ef233c" style={{ paddingTop: 5, marginRight: 5 }} />
                </TouchableOpacity>
              </View>

              {selectedUser && (
                <View
                  style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                    padding: 10
                  }}
                >
                  <Text style={{ color: 'black' }}>{selectedUser.name}</Text>
                </View>
              )}


            </View>
          </View>
        </View>

      </Modal>

      <View style={{ backgroundColor: '#F4E3FF', flex: 1 }}>

        <View style={styles.header}>
          <Text style={styles.headerTxt}>Employees Details...</Text>
          <IconButton
            style={styles.addBtn}
            icon="plus"
            iconColor={"white"}
            size={30}
            onPress={handleCreate}
          />
        </View>

        <View>

          <View style={{ marginTop: 20 }} />

          <ScrollView>

            {/* {selectedUser && console.log('Selected User:', selectedUser)} */}

            {usersData &&
              Object.values(usersData).map((user, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleRead(user);
                    console.log('Touched User:', user);
                  }}
                  style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: 'black' }}>Id: {user.id}</Text>
                  <Text style={{ color: 'black' }}>Name: {user.name}</Text>
                  <Text style={{ color: 'black' }}>Age: {user.age}</Text>
                  <Text style={{ color: 'black' }}>Address: {user.address}</Text>
                  <Text style={{ color: 'black' }}>Email: {user.email}</Text>
                </TouchableOpacity>
              ))}



            <View style={{ marginTop: 120 }} />

          </ScrollView>

        </View>
      </View>

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,

  },
  header: {
    backgroundColor: '#9d4edd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    borderBottomEndRadius: 16,
    borderBottomLeftRadius: 16
  },

  headerTxt: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
    padding: 10
  },

  addBtn: {
    padding: 10,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginHorizontal: 12
  },

  itemContainer: {
    flexDirection: 'row',
    margin: 16,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '90%'
  },

  container: {
    flex: 1,
    margin: -5,
    marginTop: 10
  },

  logintxt: {
    fontSize: 28,
    fontWeight: 500,
    color: '#240046',
    marginBottom: 30,
    textAlign: 'center'
  },

  txtinput: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25
  }

})