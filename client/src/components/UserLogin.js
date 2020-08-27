import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import cookie from 'react-cookies'
import { LoggedIn } from '../components'
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
const axios = require('axios');

class UserLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  

  componentDidMount(){
    if(!this.props.isLogin){
      document.querySelector("#inputEmail").focus();
    }
  }

    inputEmail(event){
      this.setState({email: event.target.value})
    }
    inputPassword(event){
      this.setState({password: event.target.value})
    }
    verifyEmail = function() {
      // 이메일 검증 스크립트 작성
      var emailVal = this.state.email;
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      // 검증에 사용할 정규식 변수 regExp에 저장
      if (emailVal.match(regExp) != null) {
        return true
      } else {
        return false
      }
    }
   
    enter = async (event) => {
      console.log('event: ', event.nativeEvent.type);

      if(event.key === 'Enter' || event.nativeEvent.type === 'click'){
        
        if(this.state.email === ''){
          alert('이메일을 입력하세요')
          document.querySelector("#inputEmail").focus();
        } else if (!this.verifyEmail()){
          alert('올바른 이메일 형식이 아닙니다')
          document.querySelector("#inputEmail").focus();
        } else if (this.state.password === '') {
          alert('비밀번호를 입력하세요')
          document.querySelector("#inputPassword").focus();
        } else {
          try{
            let result = await axios.post('http://localhost:5000/main/login', {
              email : this.state.email,
              password: this.state.password,
            })
            console.log('result: ', result.data.session);
            
            this.props.changeUserId(result.data.nickname, false)
            cookie.save('sessionKey', result.data.session)
            this.setState({email: '', password: ''})

          } catch(err) {
            console.log(err)
            alert('회원정보가 존재하지 않습니다 회원가입을 진행해주세요')
            this.setState({email: '', password: ''})
          }
        }
      }
    }
   
    socialLoggedin = (response) => {
      this.props.changeUserId(`Google_${response.Rt.Bd}`, true)
      
    }

    render() {
      const { isLogin, userId, logout } = this.props;
      if(isLogin){
        return (<LoggedIn userId={userId} logout={logout}/>)
      } else {
          return (
            <div className="window Login-window">
              <div className="title-bar">
                <div className="title-bar-controls">
                  <div className="title-bar-text">Login</div>
                  <button className="closeButton" aria-label="Close" onClick={() => {
                      this.props.history.goBack()
                  }}></button>
                </div>
              </div>
              <div className="window-body">
                <fieldset id="login">
                  {/* <p className="login-description" style={{ textAlign: "center", margin: "1rem"}}>로그인을 하시면 더 많은 서비스를 이용하실 수 있습니다.</p> */}
                  <input 
                    id="inputEmail" type="text" 
                    value={this.state.email}
                    onChange={this.inputEmail.bind(this)} 
                    onKeyDown={this.enter.bind(this)}
                    placeholder="이메일을 입력하세요"
                  />
                  <input 
                    id="inputPassword" type="password" 
                    value={this.state.password}
                    onChange={this.inputPassword.bind(this)} 
                    onKeyDown={this.enter.bind(this)}
                    placeholder="비밀번호를 입력하세요"
                  />
                  <button id="userLogin" onClick={this.enter.bind(this)}>로그인</button>
                  <button id="guestLogin" 
                    onClick={() => this.props.history.push('/guestLogin')}
                  >게스트로그인</button>
                  <button id="signupBtn" 
                    onClick={() => this.props.history.push('/signup')}
                  >회원가입</button>
                 
                  
                  <hr id="loginBar"/>
                  {/* <i class="fab fa-google-plus-g fa-3x"></i> */}
                  <GoogleLogin
                    clientId="1037438704815-ih3s6v1brfb4p5oksifqvd881ss953kd.apps.googleusercontent.com"
                    render={renderProps => (
                      <button id="socialLogin" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      <span style={{color:"white"}}>
                      <i  className="fab fa-google-plus-g fa-2x"></i>
                      </span>
                      구글 로그인</button>
                    )}
                    buttonText="Login"
                    cookiePolicy={'single_host_origin'}
                    onSuccess={this.socialLoggedin}
                  />
                  {/* <i class="fab fa-google-plus-square fa-3x"></i> */}
                </fieldset>
              </div>
            </div>
          )
        }
      }
}

export default withRouter(UserLogin)
