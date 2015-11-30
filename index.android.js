/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var Camera = require('react-native-camera'); //require the camera component
var React = require('react-native');
var data = require('./data');
var { IconTextView } = require('react-native-android-iconify');
const MK = require('react-native-material-kit');
const { MKCardStyles } = MK;
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ViewPagerAndroid,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
  Navigator,
  Image,
  BackAndroid,
} = React;


var imgs = {};
imgs['Abutilon_hybridum'] = require('./img/Abutilon_hybridum.jpg');
imgs['Acacia_dealbata'] = require('./img/Acacia_dealbata.jpg');
imgs['Acacia_melanoxylon'] = require('./img/Acacia_melanoxylon.jpg');
imgs['Alnus_acuminata'] = require('./img/Alnus_acuminata.jpg');
imgs['Araucaria_angustifolia'] = require('./img/Araucaria_angustifolia.jpg');
imgs['Brugmansia_sanguinea'] = require('./img/Brugmansia_sanguinea.jpg');
imgs['Callistemon_speciosus'] = require('./img/Callistemon_speciosus.jpg');
imgs['Casuarina_equisetifolia'] = require('./img/Casuarina_equisetifolia.jpg');
imgs['Cedrela_montana'] = require('./img/Cedrela_montana.jpg');
imgs['Ceroxylum_quindiuense'] = require('./img/Ceroxylum_quindiuense.jpg');
imgs['Cotoneaster_pannosus'] = require('./img/Cotoneaster_pannosus.jpg');
imgs['Croton_bogotanus'] = require('./img/Croton_bogotanus.jpg');
imgs['Cupressus_lusitanica'] = require('./img/Cupressus_lusitanica.jpg');
imgs['Erythrina_rubrinervia'] = require('./img/Erythrina_rubrinervia.jpg');
imgs['Eucalyptus_globulus'] = require('./img/Eucalyptus_globulus.jpg');
imgs['Ficus_soatensis'] = require('./img/Ficus_soatensis.jpg');
imgs['Fraxinus_chinensis'] = require('./img/Fraxinus_chinensis.jpg');
imgs['Grevillea_robusta'] = require('./img/Grevillea_robusta.jpg');
imgs['Heliocarpus_americanus'] = require('./img/Heliocarpus_americanus.jpg');
imgs['Hibiscus_rosa-sinensis'] = require('./img/Hibiscus_rosa-sinensis.jpg');
imgs['Inga_ornata'] = require('./img/Inga_ornata.jpg');
imgs['Lafoensia_acuminata'] = require('./img/Lafoensia_acuminata.jpg');
imgs['Magnolia_grandiflora'] = require('./img/Magnolia_grandiflora.jpg');
imgs['Myrcianthes_leucoxyla'] = require('./img/Myrcianthes_leucoxyla.jpg');
imgs['Pinus_radiata'] = require('./img/Pinus_radiata.jpg');
imgs['Pittosporum_undulatum'] = require('./img/Pittosporum_undulatum.jpg');
imgs['Play_Store_Icon'] = require('./img/Play_Store_Icon.png');
imgs['Populus_nigra'] = require('./img/Populus_nigra.jpg');
imgs['Prunus_serotina'] = require('./img/Prunus_serotina.jpg');
imgs['Quercus_humboldtii'] = require('./img/Quercus_humboldtii.jpg');
imgs['Retrophyllum_rospigliosii'] = require('./img/Retrophyllum_rospigliosii.jpg');
imgs['Ricinus_communis'] = require('./img/Ricinus_communis.jpg');
imgs['Salix_humboldtiana'] = require('./img/Salix_humboldtiana.jpg');
imgs['Sambucus_nigra'] = require('./img/Sambucus_nigra.jpg');
imgs['Schinus_molle'] = require('./img/Schinus_molle.jpg');
imgs['Senna_viarum'] = require('./img/Senna_viarum.jpg');
imgs['Sparmannia_africana'] = require('./img/Sparmannia_africana.jpg');
imgs['Streptosolen_jamesonii'] = require('./img/Streptosolen_jamesonii.jpg');
imgs['Syzygium_paniculatum'] = require('./img/Syzygium_paniculatum.jpg');
imgs['Tecoma_stans'] = require('./img/Tecoma_stans.jpg');
imgs['Tetrapanax_papyrifer'] = require('./img/Tetrapanax_papyrifer.jpg');
imgs['Tibouchina_lepidota'] = require('./img/Tibouchina_lepidota.jpg');
imgs['Tibouchina_urvilleana'] = require('./img/Tibouchina_urvilleana.jpg');
var data = require("./data.json");

var routes = [
  {loc : 'explore', name: 'Explorar', icon: '{md-pageview}'},
  {loc : 'camera', name: 'Identificar', icon: '{md-photo-camera}'},
  {loc : 'info', name: 'Acerca', icon: '{md-people}'},
  {loc : 'help', name: 'Ayuda', icon: '{md-help}'},
];

import {
    TYPO,
    COLOR,
    Button,
    Icon,
    Toolbar,
    IconButton,
    List,
} from 'mrn';

var drawerRef;
var navigatorRef;

BackAndroid.addEventListener('hardwareBackPress', function() {
  if (navigatorRef && navigatorRef.getCurrentRoutes().length > 1) {
    navigatorRef.pop();
    return true;
  }
  return false;
});

var UNArbolApp = React.createClass({
  render: function() {
    var navigationView = (
      <View style={styles.container}>
        <Image
          style={{height: 150}}
          source={require('./img/eucal.png')}
        />
        {routes.map(list => (
        <List
          leftIcon={
            <IconTextView text={list.icon} style={styles.icon} />
          }
          onPress={()=>{
            drawerRef.closeDrawer();
            navigatorRef.push({name:list.loc});
          }}
          primaryText={list.name}/>
        ))}
        </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerWidth={286}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={()=> navigationView}
        ref={(drawer)=> {drawerRef = drawer}}
        >
        <ToolbarAndroid
          style={styles.toolbar}
          >
          <IconTextView onPress={()=> { drawerRef.openDrawer() }}
              text='{fa-bars}'
              style={styles.barsIcon}/>
          <Text onPress={()=> { drawerRef.openDrawer() }} style={styles.barsText}>  UNárbol</Text>
        </ToolbarAndroid>
        <Navigator
          initialRoute={{name: 'home',}}
          configureScene={()=> Navigator.SceneConfigs.FadeAndroid}
          renderScene={RouteMapper}
        />
      </DrawerLayoutAndroid>
    );
  }
});

var RouteMapper = (router, navigator) => {
  navigatorRef = navigator;
  switch(router.name) {
    case 'home':
      return (
        <View style={styles.page}>
          <ScrollView style={styles.page}>
            {routes.map(list => (
            <List
              leftIcon={
              <IconTextView text={list.icon} style={styles.icon} />
              }
              onPress={()=>{
                drawerRef.closeDrawer();
                navigatorRef.push({name:list.loc});
                }}
              primaryText={list.name}/>
            ))}
          </ScrollView>
        </View>
      );
    case 'explore':
      return (
        <View style={styles.page}>
          <ScrollView style={styles.page}>
            {data.map(list => (
            <List
              onPress={()=>{
                drawerRef.closeDrawer();
                navigatorRef.push({name: "detail", arbol : list});
                }}
              primaryText={list.nombreComún}/>
            ))}
          </ScrollView>
        </View>
      );
    case 'camera':
      return (
        <View style={styles.container}>
          <ScrollView style={styles.page}>
            <Camera style={{width: 480, height: 580}}></Camera>
            <Text style={styles.welcome}>
              Welcome to React Native!
            </Text>
          </ScrollView>
        </View>
      );
    case 'detail':
      var img = imgs[router.arbol.nombreCientífico.replace(' ', '_')];
      return (
        <View style={styles.container}>
          <ScrollView style={styles.page}>
            <Image
              style={{height: 250}}
              source={img}
            />
            <Text style={styles.welcome}>
              {router.arbol.nombreComún}
            </Text>
            <Text style={styles.instructions}>
              {router.arbol.nombreCientífico}
            </Text>
          </ScrollView>
        </View>
      );
    case 'info':
      return (
        <View style={styles.container}>
          <ScrollView style={styles.page}>
            <Text style={styles.welcome}>
              Te damos la bienvenida a UNárbol
            </Text>
            <Text style={styles.instructions}>
              Shake or press menu button for dev menu
            </Text>
          </ScrollView>
        </View>
      );
    case 'help':
      return (
        <View style={styles.container}>
          <ScrollView style={styles.page}>
            <Text style={styles.welcome}>
              Te damos la bienvenida a UNárbol
            </Text>
            <Text style={styles.instructions}>
              Shake or press menu button for dev menu
            </Text>
          </ScrollView>
        </View>
      );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  page: {
    flex:1
  },
  icon: {
    width:20,
    height: 24,
    fontSize:24,
    color:'#417505',
  },
  barsIcon: {
    width:60,
    height: 56,
    fontSize:20,
    color:'#417505',
  },
  barsText: {
    fontSize:24,
    height: 56,
    color:'#FFFFFF',
  },
  toolbar: {
    backgroundColor: '#80ae4a',
    height: 56,
  },
});

AppRegistry.registerComponent('UNArbolApp', () => UNArbolApp);
