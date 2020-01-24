import React from 'react';
//import './homepage.styles.scss';
// Styled Components
import { HomePageContainer } from './homepage.styles';
// Components
import Directory from '../../components/directory/directory.component';

const HomePage = () => (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
);

export default HomePage;
