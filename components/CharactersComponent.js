import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import CardContext from '../CardContext'
import Axios from '../Axios'
import { useTheme } from '@react-navigation/native'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import LoadingComponent from './LoadingComponent'


const { width, height } = Dimensions.get('window')

const CharactersComponent = () => {

    const { colors } = useTheme()
    //Axios.get('apis')  characters is character api urls
    const { CardContextState: { activeCategory: { characters } } } = useContext(CardContext)
    const [charactersInfo, setCharactersInfo] = useState([])

    const [ActiveCharacter, setActiveCharacter] = useState({
        index: 0,
        data: {
            origin: {},
            location: {},
        }
    })

    const flatlistRef = useRef(null)

    const ComponentStyles = StyleSheet.create({
        container: {
            marginTop: 20
        },
        card: {
            borderRadius: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: width,
            backgroundColor: colors.primary,
            paddingRight: 0,
        },
        characterImage: {
            width: width * .50,
            height: height * .40,

        },
        gendertxt: {
            fontSize: 15,
            fontWeight: 'bold',
        },
        infos: {
            width: width * .50,
            paddingHorizontal: 20,
            flexDirection: 'column',
            paddingVertical: 15,
            alignSelf: 'center'

        },
        name: {
            fontSize: 22,
            fontWeight: '700',
            color: 'black',
            textAlign: 'center',
            position: 'relative',
            paddingHorizontal: 5,
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: 'white',
            marginBottom: 15
        },
        textBoxView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            paddingVertical: 10,
            marginVertical: 8,
            borderColor: '#D1F0E8',
            borderWidth: 2

        },
        textBoxHead: {
            color: colors.primary,
            fontSize: 20,
            fontWeight: '500',
            letterSpacing: -0.50
        },
        textBoxInner: {
            fontSize: 17,
            color: colors.smokeGray,
            fontWeight: '400'
        },

        sliderLeftArrow: {
            color: colors.primary,
        },
        sliderRightArrow: {
            marginLeft: 7,
            color: colors.primary,
        },

        sliderArrowView: {
            position: 'absolute',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
            bottom: 15,
            left: 15,
            padding: 3,
            borderRadius: 15,
            zIndex: 10,
        },
        alertStyle: {
            color: 'red',
            borderColor: '#ffe3e3'
        }

    });

    useEffect(() => {
        async function getCharactersData() {

            if (characters) {
                const promises = characters
                    .map((character_url) => (
                        Axios.get(character_url)
                            .then(({ data }) => {
                                return data;
                            }).catch(({ message }) => console.log(message))
                    ));

                const data = await Promise.all(promises)
                    .then((values) => {
                        return values;
                    }).catch(errors => {
                        console.log(errors)
                    })

                setCharactersInfo(data)

                //for origin and location
                Axios
                    .get(charactersInfo[ActiveCharacter.index]?.origin.url)
                    .then((origindata) => {
                        Axios
                            .get(charactersInfo[ActiveCharacter.index]?.location.url)
                            .then((locationdata) => {
                                return setActiveCharacter({ index: 0, data: { origin: origindata.data, location: locationdata.data } })
                            })
                    })

                flatlistRef.current.scrollToIndex({ animated: true, index: 0 });
            }
        }
        getCharactersData()




    }, [characters])

    useEffect(() => {

        //for origin and location
        if (charactersInfo[ActiveCharacter.index]?.origin) {

            Axios
                .get(charactersInfo[ActiveCharacter.index]?.origin.url)
                .then((origindata) => {
                    Axios
                        .get(charactersInfo[ActiveCharacter.index]?.location.url)
                        .then((locationdata) => {
                            return setActiveCharacter({ index: 0, data: { origin: origindata.data, location: locationdata.data } })
                        })
                })
        }

    }, [charactersInfo])

    if (charactersInfo?.length === 0) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        )
    }

    //console.log('--rendered characters component')


    const TextBox = ({ head, inner, icon, unknown, nomargin }) => (
        <View style={[ComponentStyles.textBoxView, unknown && ComponentStyles.alertStyle, nomargin && { marginVertical: 0 }]}>
            {icon && icon}
            <Text style={[ComponentStyles.textBoxHead, unknown && ComponentStyles.alertStyle]}>{head}</Text>
            <Text style={[ComponentStyles.textBoxInner, unknown && ComponentStyles.alertStyle]}>{unknown ? `${inner.toUpperCase()}!!!` : inner}</Text>
        </View>)


    const OriginComponent = ({ type, dimension, unknown }) => {

        let myRed = { color: 'red' }

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: colors, paddingVertical: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={[{ color: colors.primary, fontSize: 19, }, unknown && myRed]}>Type</Text>
                    <Text style={{ color: colors.smokeGray, fontSize: 16 }} >{type}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={[{ color: colors.primary, fontSize: 19 }, unknown && myRed]}>Dimension</Text>
                    <Text style={{ color: colors.smokeGray, fontSize: 16 }} >{dimension}</Text>
                </View>
            </View >)
    }

    return (
        <View style={ComponentStyles.container}>
            <View>
                <View style={ComponentStyles.sliderArrowView}>
                    <AntDesign style={ComponentStyles.sliderLeftArrow} name="leftcircleo" size={35} />
                    <AntDesign style={ComponentStyles.sliderRightArrow} name="rightcircleo" size={35} />
                </View>
                <FlatList
                    ref={flatlistRef}
                    data={charactersInfo}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    horizontal
                    pagingEnabled
                    bounces={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                    keyExtractor={item => item.id}
                    onMomentumScrollEnd={(event) => {
                        const index = Math.floor(
                            Math.floor(event.nativeEvent.contentOffset.x) /
                            Math.floor(event.nativeEvent.layoutMeasurement.width)
                        );

                        //for origin and location
                        Axios
                            .get(charactersInfo[ActiveCharacter.index]?.origin.url)
                            .then((origindata) => {
                                Axios
                                    .get(charactersInfo[ActiveCharacter.index]?.location.url)
                                    .then((locationdata) => {
                                        return setActiveCharacter({ index, data: { origin: origindata.data, location: locationdata.data } })
                                    })
                            })
                        // work with: index
                    }}
                    renderItem={({ item }) => (
                        <View style={ComponentStyles.card}>
                            <Image style={ComponentStyles.characterImage} source={{ uri: item.image }} />
                            <View style={ComponentStyles.infos}>
                                <Text style={ComponentStyles.name}>{item.name}</Text>
                                <TextBox head='Gender' inner={item.gender} />
                                <TextBox head='Status' inner={item.status} />
                                <TextBox head='Species' inner={item.species} />
                            </View>
                        </View>
                    )}
                />

            </View>

            <View>
                <TextBox
                    nomargin
                    unknown={charactersInfo[ActiveCharacter.index].origin.name === 'unknown'}
                    icon={<Ionicons name="planet-outline" size={35} color={charactersInfo[ActiveCharacter.index].origin.name === 'unknown' ? 'red' : colors.primary} />}
                    head='Origin'
                    inner={charactersInfo[ActiveCharacter.index].origin.name}
                />
                {
                    charactersInfo[ActiveCharacter.index].location.name !== 'unknown' ? ActiveCharacter.data.origin !== undefined ? <View>
                        <OriginComponent unknown={charactersInfo[ActiveCharacter.index].origin.name === 'unknown'} type={ActiveCharacter.data.location.type} dimension={ActiveCharacter.data.location.dimension} />
                        <TextBox icon={<Entypo name="location" size={35} color={charactersInfo[ActiveCharacter.index].location.name === 'unknown' ? 'red' : colors.primary} />} head='Location' inner={charactersInfo[ActiveCharacter.index].location.name} />
                        <OriginComponent unknown={charactersInfo[ActiveCharacter.index].location.name === 'unknown'} type={ActiveCharacter.data.location.type} dimension={ActiveCharacter.data.location.dimension} />
                    </View>
                        :
                        <LoadingComponent />
                        : <></>
                }


            </View>

        </View>
    )
}

export default CharactersComponent