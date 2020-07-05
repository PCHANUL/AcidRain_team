import React, { Component } from 'react'
import { Play } from '../components'
import './css/PlayStage.css'
import "98.css"

class PlayStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStart: false,
    }
    //이벤트 처리 함수들
    this.enterkey = this.enterkey.bind(this);
    this.gameStartToggle = this.gameStartToggle.bind(this);
  }
  componentDidMount() {
    // this.inputStart.focus();
  }

  enterkey(event) {
    if (event.key === 'Enter') {
      console.log('hi');
      this.gameStartToggle();
      console.log('---')
    }
  }
  gameStartToggle() {
    console.log('Game Start');
    this.setState(current => ({
      gameStart: !current.gameStart
    }));
  }

  render() {

    const gameRule = (
    <div className='beforestart'>
    <div className="playStage-description-box">
        <p className="playStage-description" style={{ textAlign: "center" }}> 산성비 게임에 오신 여러분, 환영합니다.</p>
        <p className="playStage-description" style={{ textAlign: "center" }}>  코딩을 시작하는 우리에게는 타이핑마저 어렵다!</p>
        <br></br>
        <p className="playStage-description" style={{ textAlign: "center" }}>  추억의 산성비 게임이 개발자를 위한 타이핑 연습 게임으로 재탄생했습니다.</p>
        <p className="playStage-description" style={{ textAlign: "center" }}>  게임을 할수록 낯설었던 코드에 익숙해지는 여러분을 발견하실 수 있습니다. </p>
        <br></br>
        <p className="playStage-description" style={{ textAlign: "center" }}>  시작 버튼을 누르시거나, Enter를 누르면 게임이 시작됩니다.</p>
        <p className="playStage-description" style={{ textAlign: "center" }}>  되돌아가기 버튼으로 스테이지를 다시 골라보세요[아직] </p>
        <p className="playStage-description" style={{ textAlign: "center" }}>  그렇다면 이제부터 게임을 신나게 즐겨보세요.</p>
        <br></br>
        <p className="playStage-description" style={{ textAlign: "center" }}>   -ph.GGANG팀 일동-</p>
</div>
          
          <div className="field-row" style={{ justifyContent: 'center' }}>
            <button
              ref={ref => this.inputStart = ref}
              onMouseUp={this.gameStartToggle}
              onKeyUp={this.enterkey} >시작</button>


            <button>되돌아가기</button>
          </div>
          </div>
    )

    const { userId, stageContents, selectedStageName,  handleGameEnd } = this.props

    return (
      <div>
      
        {
          //1. 스테이지 선택 안한 상태, 게임 시작 안한 상태면 빈 화면 (메인화면)
          //2. 스테이지 선택했고, 게임이 아직 시작 안한 상태? 게임 설명화면 
          //3. 게임이 시작--> 게임화면
          (!stageContents && !this.state.gameStart)  ? <div className='beforestart'></div>
          : (stageContents &&  !this.state.gameStart) ? gameRule
         : <Play userId={userId} selectedStageName={selectedStageName} stageContents={stageContents} 
         handleGameEnd={handleGameEnd} gameStartToggle={this.gameStartToggle} />
          
        
        }
        


      </div>
    )
  }
}

export default PlayStage
