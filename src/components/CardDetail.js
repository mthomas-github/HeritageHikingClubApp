import React, {memo} from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import {colors} from '../constants';

const CardDetail = ({item, buttonStyle, buttonText, onPress, ...props}) => {
  return (
    <View style={styles.card} key={item.id}>
      <Image style={styles.cardImage} source={{uri: item.image}} />
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.timeContainer}>
            <Icon size={15} name="calendar" containerStyle={styles.iconData} />
            <Text style={styles.time}>
              {item.dates.isTenative ? 'Tenative: ' : 'Dates: '}
              {item.dates.startDate} - {item.dates.endDate}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.socialBarContainer}>
          <View style={styles.socialBarSection}>
              <Pressable color={colors.white} style={buttonStyle} onPress={onPress} {...props}>
              <Text>{buttonText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: colors.white,
    width: '98%',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
  },
  cardImage: {
    height: 250,
  },
  /******** card components **************/
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    color: colors.black,
    letterSpacing: 0.92,
    flexGrow: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  time: {
    fontSize: 13,
    color: colors.darkGray,
    marginTop: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  iconData: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 5,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white,
    backgroundColor: '#4BB543',
  },
});

export default memo(CardDetail);
