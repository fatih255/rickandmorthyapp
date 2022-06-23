import { View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Axios from '../Axios';
import CardComponent from '../components/CardComponent';
import CharactersComponent from '../components/CharactersComponent';
import CardContext from '../CardContext';
import { useTheme } from '@react-navigation/native';

const HomeScreen = () => {

    const [Episodes, setEpisodes] = useState([]);
    const { changeActiveCategory } = useContext(CardContext)
    const { styles } = useTheme();

    useEffect(() => {
        Axios.get('episode')
            .then(({ data: { results } }) => {
                setEpisodes(results.reverse());
                changeActiveCategory(results[0]) //get first results for default 
            })
    }, []);



    return (



        <View style={styles.standartTopPadding}>
            <CardComponent
                headerText="Episodes"
                data={Episodes}
                loadingState={Episodes.length === 0} />
            <CharactersComponent />
        </View>

    )
}




export default HomeScreen