import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header(props) {

  
    // extract Spanish word
    const spanishWord = props.globalStates.currentObject['spanishWord'];

    // If the wordphrase is too long, adjust size dynamically
    let content = <Text style={{ fontSize: 20, letterSpacing: 5, textAlignVertical: 'center', fontWeight: 'bold', color: 'skyblue'}}>{spanishWord}</Text>
    if (spanishWord && spanishWord.length > 20) {
        content = <Text style={{ fontSize: 18, letterSpacing: 3, textAlignVertical: 'center', fontWeight: 'bold', color: 'skyblue'  }}>{spanishWord}</Text>
    }

    

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.box}>
                    <View style={styles.icon}><Text style={styles.text}><Ionicons name="albums-outline" size={24} color="grey" />All</Text></View>
                </TouchableOpacity >
                <TouchableOpacity style={styles.box}>
                    <View style={styles.icon}><Text style={styles.text}><Ionicons name="trophy-outline" size={24} color="grey" />Known</Text></View>
                </TouchableOpacity >
                <TouchableOpacity style={styles.box}>
                    <View style={styles.icon}><Text style={styles.text}><Ionicons name="bookmark-outline" size={24} color="grey" />Saved</Text></View>
                </TouchableOpacity >
                <TouchableOpacity style={styles.box}>
                    <View style={styles.icon}><Ionicons name="menu-outline" size={24} color="grey" /></View>
                </TouchableOpacity >
            </View>
            

            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={[styles.icon, {}]}>
                        {content}
                    </View>
                </View>

            </View >
        </>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'row', borderStyle: 'solid', borderWidth: 0, padding: 1, },
    box: { flex: 1, flexDirection: 'column', borderStyle: 'solid', borderWidth: 0, },
    icon: { flex: 1, flexDirection: 'column', borderStyle: 'solid', borderWidth: 0, alignItems: 'center', justifyContent: 'center' },
    text: { fontSize: 8, color: 'white'},
});