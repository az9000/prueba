import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { memo } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const Footer = memo(function Footer(props) {

    const debugStatus = props.globalStates.debugStatus;
    
    let wordsLength = props.globalStates.currentObject['arraySize'];
    let prevLength = props.globalStates.currentObject['prevArraySize'];

    let isKnown = props.globalStates.isKnown;
    debugStatus ? console.log('Footer isKnown', isKnown) : null;
    let isFavorite = props.globalStates.isFavorite;
    debugStatus ? console.log('Footer isFavorite', isFavorite) : null;


    function next() {
        debugStatus ? console.log('next object') : null;
        wordsLength > 0 ? props.globalStates.nextObject() : null;
    }

    function prev() {
        if (prevLength === 0)
            return;
            debugStatus ? console.log('prev object') : null;
        prevLength > 0 ? props.globalStates.prevObject() : null;
    }

    function toggleIsKnown() {
        props.globalStates.toggleIsKnown(!isFavorite);
    }

    function toggleIsFav() {
        props.globalStates.toggleIsFav(!isKnown);
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={prevLength > 0 ? styles.box : styles.boxDisabled} onPress={prev} disabled={prevLength === 0}>
                    <View style={styles.inner}><Ionicons name="chevron-back-outline" size={32} color="grey" /></View>
                    <View style={styles.inner}><Text style={styles.text}>Prev ({prevLength})</Text></View>
                </TouchableOpacity >
                <TouchableOpacity style={styles.box} onPress={() => toggleIsKnown()}>
                    <View style={styles.inner}><Ionicons name={isKnown ? "trophy" : "trophy-outline"} size={32} color="grey" /></View>
                    <View style={styles.inner}><Text style={styles.text}>{isKnown ? 'Knew it' : 'Know it'}</Text></View>
                </TouchableOpacity >
                <TouchableOpacity style={styles.box} onPress={() => toggleIsFav()}>
                    <View style={styles.inner}><Ionicons name={isFavorite ? "bookmark" : "bookmark-outline"} size={32} color="grey" /></View>
                    <View style={styles.inner}><Text style={styles.text}>{isFavorite ? 'Liked it' : 'Like it'}</Text></View>
                </TouchableOpacity >
                <TouchableOpacity style={wordsLength > 0 ? styles.box : styles.boxDisabled} onPress={next} disabled={wordsLength === 0} >
                    <View style={styles.inner}><Ionicons name="chevron-forward-outline" size={32} color="grey" /></View>
                    <View style={styles.inner}><Text style={styles.text}>Next ({wordsLength})</Text></View>
                </TouchableOpacity >
            </View>

        </>
    )
});

export default Footer;

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'row', borderStyle: 'solid', borderWidth: 0, padding: 10, },
    box: { flex: 1, flexDirection: 'column', borderStyle: 'solid', borderWidth: 0, opacity: 1 },
    boxDisabled: { flex: 1, flexDirection: 'column', borderStyle: 'solid', borderWidth: 0, opacity: 0.3 },
    inner: { flex: 1, flexDirection: 'column', borderStyle: 'solid', borderWidth: 0, alignItems: 'center', justifyContent: 'center' },
    text: { fontSize: 10, color: 'powderblue' },
});