import { Platform, StyleSheet, Dimensions } from "react-native";
var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;
var bagi = width >= 580 ? Math.floor(width / 186) : 2;
var widthPortrait = height > width ? width - 90 : height - 90;
var buttonHomePort = height > width ? (width - 40) / 3 : (height - 40) / 3;
var imageTopPort = height > width ? width - 140 : height - 140;

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    marginTop:40,
    marginBottom:20,
    marginLeft:20,
    marginRight:20,
    // backgroundColor:'blue'
  },
  imageHomeMagazine: {
    width: '70%', 
    height: '70%',
  },
  buttonTopHome: {
    alignItems: "center", 
    marginTop:20, 
    flexDirection:'column'
  },
  imageHome: {
    width: widthPortrait, 
    height: widthPortrait * 1.333, 
    marginBottom:20
  },
  viewdetailHome: {
    alignItems: "flex-start",
    flex:1, 
    flexDirection:'row', 
    flexWrap: 'wrap',
    marginTop:30
  },
  buttonHome: {
    width: buttonHomePort, 
    height: buttonHomePort, 
    alignItems:'center',
    padding:20,
    marginBottom:20
  },
  textImageHome: {
    marginTop:8,
    fontSize:12,
    color:'white'
  },
  image: {
    width: '100%', 
    height: '100%',
    maxWidth:186,
    maxHeight:249,
  },
  viewdetail: {
    alignItems: "flex-start",
    flex:1, 
    flexDirection:'row', 
    flexWrap: 'wrap',
    marginBottom:50
  },
  viewimage: {
    width: (width - 40) / bagi, 
    height: ((width - 40) / bagi) * 1.333, 
    alignItems:'center',
    padding:10,
    marginBottom:30
  },  
  viewTitle:{
      flex:1,      
      alignItems:'center',
      paddingBottom:20,
      paddingLeft:20,
      paddingRight:20,
  },
  imageTop: {
    width: imageTopPort, 
    height: imageTopPort * 1.333, 
    marginBottom:20,
    marginLeft:200,
    marginRight:200
  },
  textTitle: {
    marginBottom:20,
    fontWeight:'bold',
    color:'white'
  },
  textImage: {
    marginTop:5,
    color:'white'
  },
  footer: {
    backgroundColor:'#6CBBF3',
  },
  textFooter: {
    textAlign: 'center', 
    padding:15, 
    color:'white'
  }
});

export default styles;
