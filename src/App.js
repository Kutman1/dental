import React from 'react';
import Auth from "./pages/authorization/auth";
import {Switch, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import Register from "./pages/authorization/register/register";
import Menu from "./components/menu/menu";
import MenuAppBar from "./components/header/header";
import Box from "@material-ui/core/Box";
import {routes} from "./utils/routes";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

function App() {
    const token = useSelector(state => state.auth.token);
    return (
        <MuiThemeProvider>
            <div className="App">
                {!token ? <Switch>
                        <Route exact path="/" component={Register}/>
                        <Route exact path="/register" component={Auth}/>
                    </Switch> :
                    <>
                        <div className="app-wrapper">
                            <Menu/>
                            <Box className="content">
                                <MenuAppBar/>
                                <div className="content-wrap">
                                    <Switch>
                                        {routes.map(({path, component}, key) => (
                                            <Route exact path={path} component={component} key={key}/>
                                        ))}
                                    </Switch>
                                </div>
                            </Box>
                        </div>
                    </>
                }
            </div>
        </MuiThemeProvider>
    );
}

export default App;
