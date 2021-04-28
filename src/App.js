import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Demography from './Components/patients/Demography/Demography';
import Dashboard from './Components/Dashboard';
import Login from './Components/authentication/Login'
import Register from './Components/authentication/Register'
import Users from './Components/user/Users';
import Add from './Components/user/Add'
import Edit from './Components/user/Edit';
import InitialPresentation from './Components/patients/InitialPresentation/InitialPresentation';
import Pathology from './Components/patients/Pathology/Pathology';
import Treatment from './Components/patients/Treatment/Treatment';
import FollowUp from './Components/patients/FollowUp/FollowUp';
import HealthEconomics from './Components/patients/HealthEconomics/HealthEconomics';
import DemographyEdit from './Components/patients/Demography/DemographyEdit';
import InitialPresentationEdit from './Components/patients/InitialPresentation/InitialPresentationEdit';
import EditPathology from './Components/patients/Pathology/EditPathology';
import EditTreatment from './Components/patients/Treatment/EditTreatment';
import EditFollowUp from './Components/patients/FollowUp/EditFollowUp';
import EditHealthEconomics from './Components/patients/HealthEconomics/EditHealthEconomics';
import Logout from './Components/authentication/Logout';

class App extends React.Component {    
    
    render(){
        return(
            <div>
                <Router>
                    <Switch>
                        <>
                        <Route path='/' component={Dashboard} exact></Route>
                        <Route path='/login' component={Login} exact></Route>
                        <Route path='/logout' component={Logout} exact></Route>
                        <Route path='/demography' component={Demography} exact></Route>
                        <Route path='/dashboard' component={Dashboard} exact></Route>
                        <Route path='/demography/edit/:code' component={DemographyEdit} exact></Route>
                        <Route path='/users' component={Users} exact></Route>                    
                        <Route path='/register' component={Register} exact></Route>
                        <Route path='/users/add' component={Add} exact></Route>
                        <Route path='/users/edit/:id' component={Edit} exact></Route>
                        <Route path='/initial-presentation/:code' component={InitialPresentation} exact></Route>
                        <Route path='/initial-presentation/edit/:code' component={InitialPresentationEdit} exact></Route>
                        <Route path='/pathology/:code' component={Pathology} exact></Route>
                        <Route path='/pathology/edit/:code' component={EditPathology} exact></Route>
                        <Route path='/treatment/:code' component={Treatment} exact></Route>
                        <Route path='/treatment/edit/:code' component={EditTreatment} exact></Route>
                        <Route path='/follow-up/:code' component={FollowUp} exact></Route>
                        <Route path='/follow-up/edit/:code' component={EditFollowUp} exact></Route>
                        <Route path='/health-economics/:code' component={HealthEconomics} exact></Route>
                        <Route path='/health-economics/edit/:code' component={EditHealthEconomics} exact></Route>
                        </>                    
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;