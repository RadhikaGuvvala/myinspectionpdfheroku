import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import { EditRounded } from '@material-ui/icons';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Card from '../components/Card/Card';
import CardBody from '../components/Card/CardBody';
import CardHeader from '../components/Card/CardHeader';
import Button from '../components/CustomButtons/Button';
import CustomInput from '../components/CustomInput/CustomInput';
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js"; 
import UpperHeader from '../components/Header/UpperHeader';
// import connection from '../lib/axiosInstance';
 import { func, shape, string } from '../lib/commonImports';
import image from '../public/img/bg7.jpg';
import { changeLoginUser } from '../redux/action/loginUserAction';
 import { changeUser } from '../redux/action/userAction';
import loginPageStyle from '../styles/jss/nextjs-material-kit-pro/pages/loginPageStyle';
import { useDispatch } from "react-redux";
import { updatePassword } from '../redux/action/action';
const useStyles = makeStyles(loginPageStyle);

function UpdatePassword(props) {
  const [oldPassword, setOldPassword] = React.useState('');
  const [viewOldPassword, setViewOldPassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState('');
  const [viewNewPassword, setViewNewPassword] = React.useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
  const [viewconfirmNewPassword, setViewconfirmNewPassword] = React.useState(false);
  const dispatch = useDispatch();


  const handleResetPassword = async (e) => {
    e.preventDefault();
    let email = localStorage.getItem('checkInspector')
   
let data = {
    email:email,
    oldPassword:oldPassword,
    newPassword:newPassword,
}
const result = await dispatch(updatePassword(data));
    if (result) {
           toast.success('Password Updated Successfully');
           Router.push('/login');
      
        } else {
            toast.error('Cannot Update');
        }

   };
  const validateLength = (str) => {
    return str.length > 7;
  };
  const validateLower = (str) => {
    const re = /[a-z]+/;
    return re.test(String(str));
  };
  const validateUpper = (str) => {
    const re = /[A-Z]+/;
    return re.test(String(str));
  };
  const validateNumber = (str) => {
    const re = /[0-9]+/;
    return re.test(String(str));
  };
  const validateSpecialChar = (str) => {
    const re = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return re.test(String(str));
  };
  const back = () => {
    Router.push('/');
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[A-Za-z\d `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,}$/;
    return re.test(String(password));
  };
  const handleChange = (e, t) => {
      if(t == 'oldPassword'){
        setOldPassword(e.target.value)
      }else if(t == 'newPassword'){
        setNewPassword(e.target.value)
      }else if(t == 'confirmNewPassword'){
       setConfirmNewPassword(e.target.value)
      }
     
    if (t == 'email' && validateEmail(e.target.value)) {
    
    }
  };

  const handleClickShowOldPassword = (e) => {
    setViewOldPassword(!viewOldPassword)

  };
  const handleClickShowNewPassword = () => {
    setViewNewPassword(!viewNewPassword)
  };

  const handleClickShowConfPassword = () => {
      setViewconfirmNewPassword(!viewconfirmNewPassword)
    
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();
  return (
    <div>
      <UpperHeader />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={classes.container}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={8} md={4}>
              <Card>
                <form className={classes.form}>
                  <CardHeader color='success' signup className={classes.cardHeader}>
                    <h4 className={classes.cardTitle}>Update Password</h4>
                  </CardHeader>
                  <CardBody signup>
                    <CustomInput
                      id='old-password'
                      formControlProps={{
                        fullWidth: true
                      }}
                      error={
                        oldPassword &&
                        !validatePassword(oldPassword) 
                      }
                      success={validatePassword(oldPassword) }
                      inputProps={{
                        placeholder: 'Old Password...',
                        type: viewOldPassword ? 'text' : 'password',
                        value: oldPassword ,
                        onChange: (e) => handleChange(e, 'oldPassword'),
                        onKeyDown: (event) => {
                          if (event.keyCode === 13) {
                            const form = event.target.form;
                            const index = Array.prototype.indexOf.call(form, event.target);
                            form.elements[index + 1].focus();
                            event.preventDefault();
                          }
                        },
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon
                              aria-label='toggle password visibility'
                              onClick={(e) => {
                                handleClickShowOldPassword(e);
                              }}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {viewOldPassword ? <Visibility /> : <VisibilityOff />}
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      id='new-password'
                      formControlProps={{
                        fullWidth: true
                      }}
                      error={
                        newPassword &&
                        !validatePassword(newPassword) 
                    
                      }
                      success={ newPassword && validatePassword(newPassword) }
                      inputProps={{
                        placeholder: 'New Password...',
                        type: viewNewPassword ? 'text' : 'password',
                        value: newPassword || '',
                        onChange: (e) => handleChange(e, 'newPassword'),
                        onKeyDown: (event) => {
                          if (event.keyCode === 13) {
                            const form = event.target.form;
                            const index = Array.prototype.indexOf.call(form, event.target);
                            form.elements[index + 1].focus();
                            event.preventDefault();
                          }
                        },
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon
                              aria-label='toggle password visibility'
                              onClick={handleClickShowNewPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {viewNewPassword ? <Visibility /> : <VisibilityOff />}
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                    {newPassword && !validatePassword(newPassword) && (
                      <ul
                        style={{
                          color: 'red',
                          paddingLeft: '10px',
                          fontSize: '11px'
                        }}
                      >
                        {!validateLength(newPassword) && (
                          <li>The password must be 8 digits in length</li>
                        )}
                        {!validateLower(newPassword) && (
                          <li>The password must must have a lowercase character</li>
                        )}
                        {!validateUpper(newPassword) && (
                          <li>The password must must have a uppercase character</li>
                        )}
                        {!validateNumber(newPassword) && <li>The password must must have a number</li>}
                        {!validateSpecialChar(newPassword) && (
                          <li>The password must must have a special character</li>
                        )}
                      </ul>
                    )}
                    {newPassword && (
                      <CustomInput
                        id='conf-new-password'
                        formControlProps={{
                          fullWidth: true
                        }}
                        error={confirmNewPassword && newPassword !== confirmNewPassword}
                      success={confirmNewPassword && newPassword == confirmNewPassword}
                        inputProps={{
                          placeholder: 'Confirm New Password...',
                          type: viewconfirmNewPassword ? 'text' : 'password',
                          value: confirmNewPassword || '',
                          onChange: (e) => handleChange(e, 'confirmNewPassword'),
                          onKeyDown: (event) => {
                            if (event.keyCode === 13) {
                              const form = event.target.form;
                              const index = Array.prototype.indexOf.call(form, event.target);
                              form.elements[index + 1].focus();
                              event.preventDefault();
                            }
                          },
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Icon
                                aria-label='toggle password visibility'
                                onClick={handleClickShowConfPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {viewconfirmNewPassword ? <Visibility /> : <VisibilityOff />}
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                    )}
                     {confirmNewPassword && newPassword !== confirmNewPassword && (
                      <ul
                        style={{
                          color: 'red',
                          paddingLeft: '10px',
                          fontSize: '11px'
                        }}
                      >
                        <li>New Password and Confirm Password must match</li>
                        
                      </ul>
                    )}
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button
                      type='submit'
                      round
                      color={newPassword != confirmNewPassword ? 'warning' : 'success'}
                      onClick={handleResetPassword}
                      disabled={newPassword != confirmNewPassword}
                    >
                      Update
                    </Button>
                    <Link href={'/'}>
                      <Button simple color='success' size='lg' onClick={back}>
                        Back
                      </Button>
                    </Link>
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

UpdatePassword.propTypes = {
  changeLoginUser: func,
  loginUser: shape({
    confirmNewPassword: string,
    newPassword: string,
    oldPassword: string
  })
};

const mapStateToProps = (state) => ({
  loginUser: state.loginUser,
  user: state.user
});

const mapDispatchToProps = {
  changeLoginUser: changeLoginUser,
  changeUser: changeUser
};

export default connect(mapStateToProps,mapDispatchToProps)(UpdatePassword);
