import React from 'react';
import {Switch, Route} from 'react-router-dom'

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx'
import ShopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'

import { auth } from './firebase/firebase.utils'; // authentication functionality

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      currentUser: null
    }    
  }

  //method đừng để unsubcribe listen trạng thái đăng nhập, vì có thể dẫn tới memory leak
  unsubcribeFromAuth = null;

  componentDidMount(){
    //thông tin phiên đăng nhập được lưu trong Cookie
    //khi sign in, sign out, change pass... trong browser bằng firebase, thông tin user sẽ được lưu lại, và sử dụng thông tin đó bằng method onAuthStateChanged()
    //onAuthStateChanged() sẽ listen trạng thái đăng nhập của ng dùng liên tục, từ khi component mounted
    this.unsubcribeFromAuth = auth.onAuthStateChanged( user => {
      this.setState({currentUser: user})
      console.log(user);
    })
  }

  componentWillUnmount(){
    //ngưng listen trạng thái đăng nhập từ firebase authentication
    this.unsubcribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>    {/* pass current user detail về phần header, để hiện hoặc ẩn nút Sign In, Sign Out*/}
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;