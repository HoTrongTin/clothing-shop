import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx'
import ShopPage from './pages/shop/shop.component.jsx'
import Header from './components/header/header.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'; // authentication functionality
import { setCurrentUser } from './redux/user/user.actions'

class App extends React.Component{
  
  //method đừng để unsubcribe listen trạng thái đăng nhập, vì có thể dẫn tới memory leak
  unsubcribeFromAuth = null;

  componentDidMount(){

    // destructure redux action from props
    const { setCurrentUser } = this.props;

    //thông tin phiên đăng nhập được lưu trong Cookie
    //khi sign in, sign out, change pass... trong browser bằng firebase, thông tin user sẽ được lưu lại, và sử dụng thông tin đó bằng method onAuthStateChanged()
    //onAuthStateChanged() sẽ listen trạng thái đăng nhập của ng dùng liên tục, từ khi component mounted
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        //onSnapshot listening on change on userRef object in the database
        userRef.onSnapshot(snapShot => {
          //snapShot.data()  ==> return the data in the database of specified user
          setCurrentUser({
            id: snapShot.id,
            ...(snapShot.data())
          })
        })
      }
      setCurrentUser(userAuth) //khi chưa đăng nhập hoặc đã đăng xuất
    })
  }

  componentWillUnmount(){
    //ngưng listen trạng thái đăng nhập từ firebase authentication
    this.unsubcribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>) }/>    {/* redirect về home nếu đã đăng nhập */}
        </Switch>
      </div>
    );
  }
}
                        // destruct user reducer from combineReducers
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser   // now we have access to currentUser in redux store
})


// gán action setCurrentUser as props của <App>, action này sẽ modify data trong redux store
const mapDispatchToProps = dispatch => ({
  // thực hiện hàm setCurrentUser(user)
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

// vì <App> ko cần state nên mapStateToProps để là null
export default connect(mapStateToProps, mapDispatchToProps)(App);