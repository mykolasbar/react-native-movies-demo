import React, { useContext } from 'react';
import { Text } from 'react-native';
import { ThemeContext } from './ThemeContext';

const TextColorSwitcher = ({style, children, onPress}) => {
    let theme = useContext(ThemeContext)
    let textStyle = {...style, color: theme.getColorTheme() === 'light' ? 'black' : 'white'}

    return (
        <Text style = {textStyle} >
            {children}
        </Text>
    );
};

export default TextColorSwitcher;


// onPress = {()=>{onPress !== null ? onPress() : null}}