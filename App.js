import React, {Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import * as rssParser from 'react-native-rss-parser';

export default class App extends React.Component {
  constructor(props) {
            super(props);
            this.state = {
                isLoading: true,
                rss: [],
                rssBus: []
            };
        }

  componentDidMount() {
    var url = 'https://www.wmata.com/rider_tools/metro_service_status/feeds/mis/rail.xml';
    return fetch(url)
  .then((response) => response.text())
  .then((responseData) => rssParser.parse(responseData))
  .then((rss) => {
    this.setState({
      rss: rss.items,
      isLoading: false,
});
  });
//This is the end of 'Fetch' thingy //
  }
//end of CmponentDidMount //


render() {
  const { rss } = this.state;
  if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    } else

  return(

<ScrollView style={styles.container}>

      <View style={styles.textBit}>
      <Text style={styles.titleText}> Rail updates </Text>
      </View>

      <View style={styles.box}>
        <View style={styles.lineRow}>
        <View style={styles.leftColumn}>
          <Text style={styles.firstItem}>Line</Text>
          </View>
          <View style={styles.midColumn}>
          <Text style={styles.firstItem}>Travel alert</Text>
          </View>
          <View style={styles.rightColumn}>
          <Text style={styles.firstItem}>Issued</Text>
          </View>
        </View>
        <View style={styles.topBorder}>
            {
              rss.map(function(item, index) {
                return (
                    <View style={styles.cellHeight}>
                      <View style={styles.lineRow}>
                        <View style={styles.leftColumn}>
                          <Text style={styles.itemText}> {item.title} </Text>
                        </View>
                        <View style={styles.midColumn}>
                          <Text style={styles.itemText}> {item.description} </Text>
                        </View>
                        <View style={styles.rightColumn}>
                          <Text style={styles.itemText}> {item.published.slice(5, item.published.length-13)} </Text>
                        </View>
                      </View>
                      <View style={styles.lineBreak} />
                    </View>
                  )
                })
            }
        </View>
      </View>

      <Text> </Text>
    </ScrollView>

    )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '8%',
    paddingRight: '8%',
    paddingTop: '2%',
    paddingBottom: '5%',
    fontFamily: 'Ariel',
  },
  textBit: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 21,
    color: 'black',
    flex: 0.9,
  },
    box: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    borderLeftWidth: 0.5,
    borderLeftColor: 'black',
    borderRightWidth: 0.5,
    borderRightColor: 'black',
    borderTopWidth: 0.5,
    borderTopColor: 'black',
  },
  lineRow: {
    flexDirection: 'row',
  },
  firstItem: {
    color: 'black',
    fontWeight: 'bold',
  },
  itemText: {
    color: 'black'
  },
  rightColumnText: {
  },
  leftColumn: {
    width: '23%',
    borderRightWidth: 0.5,
    borderRightColor: 'grey',
    paddingLeft: 1,
    paddingRight: 0,
  },
  midColumn: {
    width: '60%',
    borderRightWidth: 0.5,
    borderRightColor: 'grey',
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 8
  },
  rightColumn: {
    width: '17%',
    paddingLeft: 1,
    paddingRight: 0,
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: 'grey',
  },
  lineBreak: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  cellHeight: {
    height: 'auto'
  },
});
