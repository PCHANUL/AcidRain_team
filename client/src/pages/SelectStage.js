import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { StageListEntry, GuestLogin } from '../components';
import { MakeStage } from '../components/index'
import './css/SelectStage.css'
import "98.css"
const axios = require('axios');

class SelectStage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            a:0,
            savedStages: [],
            editStageName: '',
            editStageContents: '',
            gameLevel: 1,
            cursor:1
        }
        this.levelChange = this.levelChange.bind(this);
    }

    handleEditStageName = (stageName) => {
        this.setState({ editStageName: stageName })
    }

    handleEditStageContents = (editStageContents) => {
        this.setState({ editStageContents: editStageContents })
    }

    resetEditingHope = () => {
        this.setState({
            editStageName: '',
            editStageContents: ''
        })

    }

    levelChange(obj) {
        this.setState({
            gameLevel: document.getElementById('gameLevel').value
        });
    }

    componentDidMount  () {
        document.getElementById('SelectStage-window').focus()

        axios.get('http://localhost:5000/main/selectstage')
        .then(res => {
            this.setState({ savedStages: res.data })
        })
    }

    componentDidUpdate(prevProps, prevState) {
      //selectStage 경로로 이동하면 stage테이블에 저장된 데이터를 모두 가져오고 stageNames에 담김
      axios.get('http://localhost:5000/main/selectstage')
      .then(res => {
        if (JSON.stringify(res.data) !== JSON.stringify(prevState.savedStages)) {

          this.setState({ savedStages: res.data })
        }
      })
    }


    onKeyPressed = (e) => {
        if(e.key==='ArrowDown' && this.state.cursor < this.state.savedStages.length && !this.props.wantToMake ){
            this.props.clickStage(this.state.savedStages[this.state.cursor].stagename)
            this.setState ( prevState => ( {
               cursor : prevState.cursor + 1
           }))
        //   console.log(this.state.savedStages[this.state.cursor].stagename)
        //   console.log(`${e.key} ${this.state.cursor}`)
        }
        if(e.key==='ArrowUp' && this.state.cursor > 1 && !this.props.wantToMake ){
            this.props.clickStage(this.state.savedStages[this.state.cursor-2].stagename)
            this.setState ( prevState => ({
              cursor : prevState.cursor - 1
            }))
            // console.log(`${e.key} ${this.state.cursor}`)
        }
        if(e.key==='m'  && !this.props.wantToMake ){
            this.props.handleMakingStage()
        }if(e.key==='Enter' && !this.props.wantToMake ){
            this.getSelectedStageContents();
        }if(e.key==='Escape' && !this.props.wantToMake ){
            this.props.history.goBack()
        }
    }

//현재 선택한 stageName을 post요청으로 보내고, 해당 stageName에 대한 content를 받아오고 playstage로 이동
    getSelectedStageContents = () => {
      axios.post("http://localhost:5000/main/playstage", {
          stagename: this.props.selectedStageName,
          userid: this.props.userId
      })
          .then(res => {
              this.props.getContents(JSON.parse(res.data[0].contents), this.state.gameLevel)
          })
      this.props.history.push('/playstage');
    }

    refresh = async () => {
        await this.setState({a : this.state.a + 1});
    }
    // 비로그인 유저
    guestLogin = async () => {
      let randomName = Math.random().toString(36).substr(2, 5)
      await this.props.changeGuest(`Guest_${randomName}`)
    }

    render() {
        const { clickStage, selectedStageName, wantToMake, handleMakingStage, userId, updateStage, update } = this.props
        const { editStageContents, editStageName, gameLevel, cursor } = this.state
        return (
            <div className="window" id="SelectStage-window" onKeyDown={this.onKeyPressed} tabIndex="0">
                  <div className="title-bar">
                    <div className="title-bar-text">Select stage</div>
                  </div>
                <div className="window-body">

                    <fieldset>
                        <p className="description">스테이지를 선택하세요 !</p>
                        <div style={{ textAlign: 'right' }}>
                            스테이지 새로고침<input type='button' value='↺' onClick={this.refresh}/>
                        </div>
                        <ul className="tree-view selectStage-treeview">
                            <table>
                                <thead>
                                    <tr className="selectingHead">
                                        <th >스테이지</th>
                                        <th >만든이</th>
                                        <th >수정/삭제</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.savedStages.map((savedStage,i) => (

                                        <StageListEntry

                                            key={i}
                                        //isSelected:선택한 stage이름과 현재 stage가 같다면
                                            isSelected={(selectedStageName === savedStage.stagename)}
                                            stageName={savedStage.stagename}
                                            createdBy={savedStage.createdBy}
                                            clickStage={clickStage}
                                            resetEditingHope={this.resetEditingHope}
                                            editStageName={editStageName}
                                            editStageContents={editStageContents}
                                            selectedStageName={selectedStageName}
                                            handleEditStageContents={this.handleEditStageContents}
                                            handleEditStageName={this.handleEditStageName}
                                            handleMakingStage={handleMakingStage}
                                            userId={userId}

                                            updateStage={updateStage}
                                            refresh={this.refresh}
                                        />

                                    ))}
                                </tbody>
                            </table>
                        </ul>

                        <div className="selectGameLevel" style={{ textAlign: 'center' }}>
                            <div>플레이 할 난이도를 선택하세요 (1 - 10)</div>
                            <input type="range" id='gameLevel' defaultValue="1" min={1} max={10} step={1} onChange={this.levelChange} />
                            <div > 현재 난이도 : {gameLevel} </div>
                        </div>

                        <div className="field-row SelectStage-row" style={{ justifyContent: 'center' }}>
                            <button className="SelectStage-btn" onClick={() => {
                              if (userId === '') this.guestLogin()
                              this.getSelectedStageContents()
                            }}>
                              플레이
                            </button>
                            <button className="SelectStage-btn" onClick={() => {
                              if(userId.indexOf('Guest_') + userId.indexOf('Google_') === -2){
                                //모달의 오픈,클로즈 여부를 관리하는 이벤트를 실행시킴
                                handleMakingStage()
                              } else {
                                alert('오직 회원만 스테이지를 만들 수 있습니다! (회원가입해주세요)')
                              }
                            }}
                            >만들기</button>
                            {
                            wantToMake
                              ? <MakeStage handleMakingStage={handleMakingStage}
                                userId={userId}
                                editStageName={editStageName}
                                editStageContents={editStageContents}
                                resetEditingHope={this.resetEditingHope}
                                update={update} />
                              : ''
                            }
                        </div>
                    </fieldset>
                </div>
            </div>

        )
    }
}

export default withRouter(SelectStage)
