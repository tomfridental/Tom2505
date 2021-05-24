import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './css/globa.styles';
import Themes from './css/themes';
import TopBar from './components/topBar';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ADD_USERS_PAGE, VIEW_USERS_PAGE } from './Consts';
import CreatePage from './components/createPage';
import ViewPage from './components/viewUsers';

const App = () => {

    const themeName = 'purpleTheme';

    return (
        <ThemeProvider theme={Themes[themeName]}>
            <Wrapper>
                <GlobalStyles />
                <Router>
                    <TopBar />
                    <Switch>
                        <Route path={VIEW_USERS_PAGE}>
                            <ViewPage />
                        </Route>
                        <Route path={ADD_USERS_PAGE}>
                            <CreatePage />
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

