import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { useTheme } from '@react-navigation/native';
import CardContext from '../CardContext';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import LoadingComponent from './LoadingComponent';

const CardComponent = ({ headerText, data, loadingState }) => {

    const { CardContextState: { activeCategory }, changeActiveCategory } = useContext(CardContext)
    const { colors, styles } = useTheme()
    const ComponentStyles = StyleSheet.create({

        container: {
            alignItems: 'left',
            justifyContent: 'start',
            flex: 1
        },
        loadingContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        card: {
            flexDirection: 'row',
            marginHorizontal: 10,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: colors.primary
        },

        cardName: {
            fontSize: 18,
            fontWeight: '500',

        },
        TimeText: {
            fontSize: 15,
            color: colors.primary,
            fontWeight: '400',
            marginLeft: 10,
        },
        calendarView: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        episodeNum: {
            fontSize: 30,
            fontWeight: 'bold',
            marginRight: 10,
            color: colors.primary,
            alignSelf: 'center',
        },

        CalendarIcon: {
            color: colors.primary,
        },

        //active classes
        Activecard: {
            backgroundColor: colors.primary,
            color: 'white'
        },
        ActivecardName: {
            color: 'white'
        },
        ActiveCalendarIcon: {
            color: 'white'
        },
        ActiveTimeText: {
            color: 'white'
        },
        ActiveEpisodeNum: {
            color: 'white'
        },
        ActiveTimeCalendarIcon: {
            color: 'white'
        }

    });

    //console.log('--rendered card component')

    if (loadingState) {
        return (<LoadingComponent />)
    }
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                <Text style={styles.title}>{headerText}</Text>
                <Text style={[colors.smokeGray, { opacity: 0.6 }]}>(You Can Slide Episodes)</Text>
            </View>
            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                horizontal
                bounces={false}
                contentContainerStyle={{ alignItems: 'center' }}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                    const activeCategoryCondition = activeCategory.id === item.id
                    return (
                        <TouchableOpacity onPress={() => { activeCategory.id !== item.id ? changeActiveCategory(item) : {} }} style={[ComponentStyles.card, activeCategoryCondition && ComponentStyles.Activecard]}>
                            <Text style={[ComponentStyles.episodeNum, activeCategoryCondition && ComponentStyles.ActiveEpisodeNum]}>{item.id}</Text>
                            <View>
                                <Text style={[ComponentStyles.cardName, activeCategoryCondition && ComponentStyles.ActivecardName]}>{item.name}</Text>
                                <View style={[ComponentStyles.calendarView]}>
                                    <AntDesign name="calendar" size={24} style={[activeCategoryCondition ? ComponentStyles.ActiveCalendarIcon : ComponentStyles.CalendarIcon]} />
                                    <Text style={[ComponentStyles.TimeText, activeCategoryCondition && ComponentStyles.ActiveTimeText]}>{moment().format("MM/DD/YYYY")}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>)
                }
                } />
        </View>
    )
}

export default CardComponent