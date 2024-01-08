import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function List(props) {

    const translations = props.globalStates.currentObject['translations'];    

    return (
        <>
            <View style={styles.container}>
                <View style={styles.box}>
                    <FlatList
                        scrollsToTop
                        data={translations}
                        renderItem={({ item }) =>
                            <View style={styles.item}>
                                <Text style={styles.title}>{item.translation}</Text>
                                <Text style={styles.text}>{item.example}</Text>
                            </View>
                        }
                        keyExtractor={(item, index) => item.id + '_' + index}
                    />
                </View>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, flexDirection: 'row', borderStyle: 'solid', borderWidth: 0, padding: 10, },
    box: { flex: 1, flexDirection: 'column', borderStyle: 'solid', borderWidth: 0, },
    inner: { flex: 1, flexDirection: 'column', borderStyle: 'solid', borderWidth: 0, alignItems: 'center', justifyContent: 'center' },
    item: {
        // backgroundColor: 'skyblue',
        border: '2px solid #00A4BD',      
        borderRadius: 12,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        color: 'skyblue',
    },
    text: {
        fontSize: 13,
        color: 'skyblue',
    }
});