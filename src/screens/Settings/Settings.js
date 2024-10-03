import React, { useContext, useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SwitchContext } from '../components/Switch';

function Settings({ navigation }) {
    const { isEnabled, toggleSwitch } = useContext(SwitchContext);
    const [isEnabledNotifi, setIsEnabledNotifi] = useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: isEnabled ? '#3F3F3F' : 'white' }}>

            <View>
                <Image source={require('../assests/images/logos/dw.jpg')}
                    style={{
                        width: 385, height: 210,
                        borderBottomRightRadius: 40, borderBottomLeftRadius: 40
                    }}
                    resizeMode="stretch" />
                <View style={{ margin: 10 }} />
            </View>


            <View style={styles.section}>

                <View style={styles.row}>
                    <Text style={{ color: isEnabled ? 'black' : 'black', fontSize: 17 }}>Dark mode</Text>
                    <Switch
                        style={{ marginHorizontal: 218 }}
                        trackColor={{ false: 'gray', true: 'blue' }}
                        thumbColor={isEnabled ? 'white' : 'white'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={{ color: isEnabled ? 'black' : 'black', fontSize: 17 }}>Notifications</Text>
                    <Switch
                        style={{ marginHorizontal: 204 }}
                        trackColor={{ false: 'gray', true: 'blue' }}
                        thumbColor={isEnabledNotifi ? 'white' : 'white'}
                        onValueChange={setIsEnabledNotifi}
                        value={isEnabledNotifi}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={{ color: isEnabled ? 'black' : 'black', fontSize: 17 }}>Language</Text>
                    <Text style={{ color: isEnabled ? 'black' : 'black', marginLeft: 190 }} >Sinhala </Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('About Us')}>
                    <View style={styles.row}>
                        <Text style={{ color: isEnabled ? 'black' : 'black', fontSize: 17 }}>About</Text>
                    </View>
                </TouchableOpacity>


            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        paddingVertical: 24
    },
    profile: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileAvatar: {
        width: 72,
        height: 72,
        borderRadius: 9999
    },
    profileAvatarWrapper: {
        position: 'relative'
    },
    section: {
        paddingTop: 10,
        paddingHorizontal: 10
    },
    sectionHeader: {
        color: 'black',
        paddingVertical: 12,
        fontSize: 18,
        letterSpacing: 1.1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: 17,
        paddingHorizontal: 12
    },
    rowIcon: {
        width: 30,
        height: 30,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
    },

})

export default Settings;
