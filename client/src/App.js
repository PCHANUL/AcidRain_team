import React, { Component } from 'react'
import { Nav, Login, PlayStage } from './pages'
import { Route, Redirect } from 'react-router-dom'
import { Play, Mypage } from './components'
import cookie from 'react-cookies'
import sea from './image/sea.png'
const axios = require('axios');

class App extends Component {
  state = {
    userId: '',
    //db에 저장된 제일 첫번째 스테이지를 보여줘서 첫리스트가 선택된 상태로 보여지도록
    selectedStageName: 'test12',
    stageContents: '',
    color: "#EFEFC0",
    // gameStart Flag
    gameStart: false,
    gameLevel: 0,
    //login상태가 되면 이 값이 true로 변하고 그 값을 이용해 로그인 여부 판단.
    isLogin: false,
    //게스트가 로그인 했을 때, 회원이 로그인 했을 때로 나눠서 Nav의 마이페이지버튼 생성, 비생성 조절
    isGuest: false,
    //makeStage컴포넌트의 노출 여부를 해당 state로 관리
    wantToMake: false,
    update: false,
    themaPageIsOpen: false,
    socialLogin: false,
    modalOpened: false
  }

resetGameLevel = () => {
  this.setState({gameLevel:0, gameStart:false})
}
resetStageContents = () => {
  this.setState({stageContents:''})
}


  // gameStart Toggle
  gameStartEndToggle = () => {
    this.setState(current => ({
      gameStart: !current.gameStart
    }));
  }

  // 로그인 유지
  async componentDidMount() {
    let result = await axios.post('http://localhost:5000/main/login', {
      'session': cookie.load('sessionKey')
    })
    console.log('result: ', result);
    if(result.data.socialLogin){
      this.setState({ isLogin: true, socialLogin: true, userId: result.data.nickname })
    } else {
      this.setState({ isLogin: true, userId: result.data.nickname })
    }
  }
  // 로그아웃
  logout = (social) => {
    this.setState({ isLogin: false, userId: '', socialLogin: false })
    cookie.remove('sessionKey')
  }


  handleColorChange = color => {
    this.setState({ color: color.hex });
  };


  clickStage = (name) => {
    if (name !== this.state.selectedStageName) {
      this.setState({ selectedStageName: name })
    }
  }
  // 유저의 로그인
  changeUserId = async (user, social) => {
    if(social){
      let result = await axios.post('http://localhost:5000/main/login', {
        nickname: user,
        social: social
      })
      this.setState({ userId: user, socialLogin: true, isLogin: true })
      cookie.save('sessionKey', result.data.session)
    } else {
      this.setState({ userId: user, isLogin: true })
    }

  }
  // 게스트의 로그인
  changeGuest = (guest) => {
    this.setState({ userId: guest, isGuest: true })
  }



  //스테이지 선택 버튼을 누르면 true로 값이 변하게
  handleStageButton = () => {
    this.setStage({ isSubmitedStage: true })
  }

  getContents = (clickedStage, selectedLevel) => {
    this.setState({
      stageContents: clickedStage,
      gameLevel: selectedLevel
    })
  }

  handleMakingStage = () => {
    this.setState({ wantToMake: !this.state.wantToMake })
  }
  updateStage = (stagename) => {
    this.setState({ update: stagename })
  }

  handleColorChange = color => {
    this.setState({ color: color.hex });
  };

  handleThemaPage = () => {
    this.setState({ themaPageIsOpen: !this.state.themaPageIsOpen })
  }

  opendMobal = () => {
    this.setState(current => ({
      modalOpened: !current.modalOpened
    }));
  }



  gameStatusToFalse = () => {
    this.setState({ gameStart: false });
  }

  render() {
    const { userId, isGuest, selectedStageName, stageContents, gameStart,
      wantToMake, isLogin, themaPageIsOpen, color, gameLevel, socialLogin, modalOpened, update } = this.state
      let footerState =
      !isLogin && !isGuest ? "로그인을 진행해주세요."
      : (isLogin && !stageContents && !wantToMake) ? "스테이지를 고르고 엔터를 누르거나 'M'을 눌러 스테이지를 만들어보세요."
      : (stageContents && !gameStart) ? "게임을 시작하려면 ctrl+엔터를 누르고 스테이지를 다시 선택하려면 ESC를 누르세요."
      : wantToMake ? "뒤로 돌아가려면 ESC를 누르세요."
      : !gameStart ? "엔터를 누르세요."
      : gameStart ? "게임을 중지하려면 ESC를 누르세요."
      : ''

    return (

      <div className='app' style={{ backgroundColor: this.state.color }}>



        <Nav
          userId={userId}
          isGuest={isGuest}
          isLogin={isLogin}
          changeUserId={this.changeUserId}
          themaPageIsOpen={themaPageIsOpen}
          handleThemaPage={this.handleThemaPage}
          color={color}
          handleColorChange={this.handleColorChange}
          logout={this.logout}
          socialLogin={socialLogin}
          gameStart={gameStart}
          wantToMake={wantToMake}
          gameStartEndToggle={this.gameStartEndToggle}
        
        />
        <Login
          userId={userId}
          isGuest={isGuest}
          isLogin={isLogin}
          logout={this.logout}
          changeUserId={this.changeUserId}
          changeGuest={this.changeGuest}
          stageContents={stageContents}
          clickStage={this.clickStage}
          getContents={this.getContents}
          selectedStageName={selectedStageName}
          wantToMake={wantToMake}
          update={update}
          updateStage={this.updateStage}
          handleMakingStage={this.handleMakingStage}
          socialLogin={socialLogin}
          gameStartEndToggle={this.gameStartEndToggle}
          resetGameLevel={this.resetGameLevel}
          resetStageContents={this.resetStageContents}
         
        />

        <Route
          path='/'
          render={() => {
            // if (!isLogin) {
            //   return <Redirect to='/login' />
            // }
            return <Redirect to='/selectstage' />
          }}
        />

        <Route
          path='/playstage'
          render={()=>
            <PlayStage userId={userId}
              selectedStageName={selectedStageName}
              stageContents={stageContents}
              color={color}
              gameLevel={gameLevel}
              gameStartEndToggle={this.gameStartEndToggle}
              gameStart={gameStart}
              opendMobal={this.opendMobal}
              modalOpened={modalOpened}
              resetGameLevel={this.resetGameLevel}
              resetStageContents={this.resetStageContents}
            />
          }></Route>
        <footer>
          <img className="footerImg" src={sea} />
          {/* <div className="footerImg" ></div> */}
          <div className="footer">
            <div className="footer-text">{footerState}</div>
            <hr id="footer-bar"/>
            <div className="footer-title">산성비</div>
          </div>

        </footer>




      </div>
    )
  }
}



export default App;
