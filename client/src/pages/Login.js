import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import { UserLogin, GuestLogin, Signup, LoggedIn } from '../components'
import { SelectStage } from './index'
import './css/Login.css'


class Login extends Component {


    render() {

        const { userId, isLogin, selectedStageName, handleStageButton , clickStage, getContents, stageContents, changeGuest, changeUserId,wantToMake,
            handleMakingStage, logout, updateStage, update } = this.props;

        return (
            <div className='Login-square'>
                <Switch>
                  <Route path='/login'><UserLogin changeGuest={changeGuest} changeUserId={changeUserId} isLogin={isLogin} userId={userId} logout={logout}/></Route>
                  <Route path='/signup'><Signup /></Route>
                  <Route path='/guestLogin'><GuestLogin changeGuest={changeGuest}/></Route>
                </Switch>

                <Route path='/selectstage' render={() => <SelectStage selectedStageName={selectedStageName} clickStage={clickStage}
                   handleStageButton ={handleStageButton} getContents={getContents} stageContents={stageContents} changeGuest={changeGuest}
                   wantToMake={wantToMake} handleMakingStage={handleMakingStage} userId={userId} update={update} updateStage={updateStage}
                   />} />

            </div>
        )
    }
}

export default Login
