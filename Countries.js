import React from 'react';
import {useState,useEffect} from 'react'
import {View,Text,Button,StyleSheet,Image} from 'react-native';
import axios from 'axios';



export default function Countries({route,navigation}) {
  
    const [countries, setCountries] = useState([])
    const [loading,setLoading]=useState(true)
    const {name} = route.params;
    
    const getInformation = async ()=>{
      const result = await axios.get(`https://restcountries.com/v2/name/${name}`)
      setCountries(result.data)
      setLoading(false)
    }
    
    useEffect(()=>{ 
        getInformation()
    },[])
  return (
    <View style={styles.container} >
      {
        loading ? <Text>Loading.....</Text> : (
            countries?.map((country)=>(
                <View>
                    <Text key={country.id} style={styles.content}>Capital: {country.capital} </Text>
                    <Text key={country.id} style={styles.content}>Population: {country.population}</Text>
                    <Text key={country.id} style={styles.content} >Latitude and Longitude: {country.latlng}</Text> 
                    <View style={{justifyContent: 'center', alignItems: "center", marginBottom: 10}}>

                    <Image
        style={{width: 25, height: 25}}
        source={{
          uri: country.flags.png,
        }}
      />
      </View>
      <View>
      <Button title="Weather" onPress={()=>navigation.navigate('Weather', {capital:country.capital}) } color="#000"></Button>

      </View>
                    
                </View>
            ))
        )
      }
      

      

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      
      padding: 30,
      backgroundColor: "#eaeaea",
      marginTop: 100,
      borderRadius: 30,
      backgroundColor: "#D3D3D3",
      width: 250, //card width
      marginLeft:70, //centers the card
    },
    content:{
      marginTop: 20,
      margin: 10,
      fontWeight: '700'
    },
    text:{
      margin: 10,
      
    }
  });
