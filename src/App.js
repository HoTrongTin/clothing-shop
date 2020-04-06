import React from 'react';
import {Switch, Route} from 'react-router-dom'

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx'
import ShopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'; // authentication functionality

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
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        //onSnapshot listening on change on userRef object in the database
        userRef.onSnapshot(snapShot => {
          //snapShot.data()  ==> return the data in the database of specified user
          this.setState({currentUser: {
            id: snapShot.id,
            ...(snapShot.data())
          }})
          console.log(this.state)
        })
      }
      this.setState({currentUser: userAuth}) //khi chưa đăng nhập hoặc đã đăng xuất
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