
import { SafeAreaView, ActivityIndicator, StyleSheet, View, Text, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import List from './List';
import * as Services from './services';
import Toast from 'react-native-toast-message';


export default function App() {

  let windowH = Dimensions.get('screen').height;
  let windowW = Dimensions.get('screen').width;

  const [windowHeight, setWindowHeight] = useState(windowH);
  const [windowWidth, setWindowWidth] = useState(windowW);

  const [toastVisible, setToastVisible] = useState(false);

  const [currentObject, setCurrentObject] = useState(Services.getWordObject);
  const [isFavorite, setIsFavorite] = useState(Services.isFavorite);
  const [isKnown, setIsKnown] = useState(Services.isKnown);

  const [debugStatus, setDebugStatus] = useState(true);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Services.openDB().then((resolve) => {
      setTimeout(() => {
        setCurrentObject(Services.getWordObject);
        setIsFavorite(Services.isFavorite);
        setIsKnown(Services.isKnown);
        setLoading(false);
      }, 5000);
    })
  }, []);

  globalStates = {

    isLoading,

    currentObject: currentObject,
    nextObject: () => {
      setCurrentObject(Services.getWordObject)
      setIsFavorite(Services.isFavorite)
      setIsKnown(Services.isKnown)
    },
    prevObject: () => {
      setCurrentObject(Services.getPrevWordObject)
      setIsFavorite(Services.isFavorite)
      setIsKnown(Services.isKnown)
    },
    isFavorite,
    toggleIsFav: (status) => {
      setIsFavorite(status);
      status ? Services.addToFavorites() : Services.removeFromFavorites();
      setCurrentObject(Services.updateWordObject);
    },
    isKnown,
    toggleIsKnown: (status) => {
      setIsKnown(status);
      status ? Services.addToKnowns() : Services.removeFromKnowns();
      setCurrentObject(Services.updateWordObject);
    },

    toastVisible: toastVisible,

    debugStatus: debugStatus,

  }

  updateToastStatus = (status) => {
    debugStatus ? console.log('toast status:', status) : null;
    setToastVisible(status);
  };

  if (isLoading) {
    
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator color="skyblue" size="large"></ActivityIndicator>
        <Text style={{ color: 'skyblue', padding: 20 }}>Loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView>

      <View style={styles.container}>

        {/* HEADER */}
        <View style={[styles.header,]}>
          <Header globalStates={globalStates} />
        </View>

        <View style={styles.box}>
          <List globalStates={globalStates} />
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Footer globalStates={globalStates} />
        </View>

        {/* TOAST */}
        <Toast position='bottom' bottomOffset={0.5 * windowHeight} onHide={() => updateToastStatus(false)} onShow={() => updateToastStatus(true)} />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height - 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282c34',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.14,
  },
  box: {

    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.62,
    borderStyle: 'solid',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.13,
  },
  horizontal: {
    flexDirection: 'column',
    padding: 10,
  },
});
