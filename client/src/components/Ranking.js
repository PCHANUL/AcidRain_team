import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import "98.css"
import "./css/Ranking.css"
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const axios = require('axios')


class Ranking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ranking: [

            ]
        }
    }

    onKeyPressed=(e)=>{
        if(e.key==='Enter'){
            this.props.history.push('/selectstage')
        }
        if(e.key==='Escape'){
          this.props.history.push('/selectstage')
        }
    }

    //rank링크로 이동하면 db에 저장된 playlog를 받아온다.
    async componentDidMount() {
        document.getElementById('RankingFocus').focus()
        const { userId } = this.props
        await axios.get('http://localhost:5000/main/rank', {
            nickname: userId
        })
            // await axios.get('http://localhost:5000/main/rank')
            .then(res => {
                this.setState({ ranking: res.data })
            })
    }

    render() {
        //react-bootstrap-table을 이용하여 table을 구현, data를 지정하고 키 값을 지정하면 저절로 표를 구현할 수 있음
        const { isLogin } = this.props;
        return (
            <div className="window Ranking-window" id="RankingFocus" onKeyDown={this.onKeyPressed} tabindex="0">
                <div className="title-bar">
                    <div className="title-bar-controls">
                        <div className="title-bar-text">Rank</div>
                        <button className="closeButton" aria-label="Close" onClick={() => {
                            this.props.history.push('/selectstage')
                        }}></button>
                    </div>
                </div>
                <div className="window-body">


                    <p className="title" style={{ textAlign: "center" }}>점수판</p>

                    <fieldset className="Ranking-fieldset">
                        <div className="Ranking-field-row" style={{ justifyContent: 'center' }}>
                            <BootstrapTable data={this.state.ranking}
                                bordered={false}
                                headerStyle={{ 'borderBottom': 'black 0.05rem solid', 'marginBottom': '1rem', 'marginTop': '1rem', 'paddingBottom': '1rem' }}
                                containerStyle={{ 'paddingBottom': '1rem' }}
                            // tableStyle={ { 'border': 'blue solid 1px'  } }
                            >
                                <TableHeaderColumn dataField='rank' dataAlign='center' isKey={true} tdStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }}>순위</TableHeaderColumn>
                                <TableHeaderColumn dataField='nickname' dataAlign='center' tdStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }}>이름</TableHeaderColumn>
                                <TableHeaderColumn dataField='stagename' dataAlign='center' tdStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }}>스테이지</TableHeaderColumn>
                                <TableHeaderColumn dataField='score' dataAlign='center' tdStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} >점수</TableHeaderColumn>
                                <TableHeaderColumn dataField='createdAt' dataAlign='center' tdStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} thStyle={{ 'fontSize': '1rem', 'width': '50%', 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' }} >일자</TableHeaderColumn>
                            </BootstrapTable>
                        </div>


                        <div className="field-row Ranking-field-row-btn" style={{ justifyContent: 'center' }}>
                            {

                                isLogin ?
                                    <button className="Ranking-button" onClick={() => {
                                        //스테이지 선택 버튼을 누르면 스테이지 선택 페이지로 이동
                                        this.props.history.push('/selectStage')
                                        if( document.getElementById('SelectStage-window')){
                                            document.getElementById('SelectStage-window').focus()
                                        }
                                      
                                    }}>스테이지 선택</button>
                                    : ''
                            }

                        </div>


                    </fieldset>




                </div>
            </div>
        )
    }
}

export default withRouter(Ranking)