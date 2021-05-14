import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './css/globa.styles';
import Themes from './css/themes';
import TopBar from './components/topBar';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { SEARCH_PAGE, FAVORITES_PAGE } from './consts';
import SearchPage from './components/searchPage';
import FavoritesPage from './components/favoritePage';
import { useSelector } from 'react-redux';

const App = () => {

    const { themeName } = useSelector(state => state.config);

    return (
        <ThemeProvider theme={Themes[themeName]}>
            <Wrapper>
                <GlobalStyles />
                <Router>
                    <TopBar />
                    <Switch>
                        <Route path={FAVORITES_PAGE}>
                            <FavoritesPage />
                        </Route>
                        <Route path={SEARCH_PAGE}>
                            <SearchPage />
                        </Route>

                    </Switch>
                </Router>
            </Wrapper>
        </ThemeProvider>
    )
}

export default App;


// CSS //
const Wrapper = styled.div`
background: #f2f2f2;
min-height: 100vh;
`

