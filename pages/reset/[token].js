import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import UpperHeader from "../../components/Header/UpperHeader";
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import CardHeader from '../../components/Card/CardHeader';
import Button from '../../components/CustomButtons/Button';
import CustomInput from '../../components/CustomInput/CustomInput';

import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

import image from '../../public/img/bg7.jpg';

import loginPageStyle from '../../styles/jss/nextjs-material-kit-pro/pages/loginPageStyle';
const useStyles = makeStyles(loginPageStyle);

function ResetPage(props) {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfPassword, setShowConfPassword] = React.useState(false);
  // const [tokenCheck, setCheckToken] = React.useState(false);

  // useEffect(() => {
  //   if (!tokenCheck) {
  //     setCheckToken(true);
  //     setTimeout(() => {
  //       checkToken();
  //     }, 1000);
  //   }
  // });

 

  // const checkToken = async () => {
  //   const res = await fetch('/api/password/reset?token=' + Router.router.query.token, {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  //   if (res.status === 200) {
  //     await res.json();
  //     toast.success('User Found');
  //   } else {
  //     await res.json();
  //   }
  // };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/password/reset', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: Router.router.query.token,
        password:password
      })
    });
    if (res.status === 200) {
      const reset = await res.json();

      toast.success('Password has been reset, login with your new password to continue');
      Router.push('/login');
    } else {
      const err = await res.json();
      toast.error(err.message);
    }
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[A-Za-z\d `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,}$/;
    return re.test(String(password));
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
  const handleChange = (e, t) => {
    if(t == 'password'){
      setPassword(e.target.value)
    }else if(t == 'passwordConf'){
      setConfirmPassword(e.target.value)
    }
   
    // props.changeLoginUser(t, e.target.value);
    // if (t == 'email' && validateEmail(e.target.value)) {
    //   checkEmail();
    // }
  };
  const checkEmail = async () => {
    let usedEmail = props.loginUser.email;
    const res = await fetch('/api/checkuser/' + usedEmail, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.status == 200) {
      const resp = await res.json();
      if (usedEmail == props.loginUser.email) {
        if (resp.length) {
          props.changeLoginUser('alreadyEmail', true);
        } else {
          props.changeLoginUser('alreadyEmail', false);
        }
      }
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfPassword = () => {
    setShowConfPassword(!showConfPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();
  return (
   
    <div>
         {/* <UpperHeader /> */}
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
                    <h4 className={classes.cardTitle}>Reset Password</h4>
                  </CardHeader>
                  <CardBody signup>
                    <CustomInput
                      id='password'
                      formControlProps={{
                        fullWidth: true
                      }}
                      error={
                        password &&
                        !validatePassword(password) 
                        
                      }
                      success={validatePassword(password) }
                      inputProps={{
                        placeholder: 'Password...',
                        type: showPassword ? 'text' : 'password',
                        value: password || '',
                        onChange: (e) => handleChange(e, 'password'),
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                    {password && !validatePassword(password) && (
                      <ul
                        style={{
                          color: 'red',
                          paddingLeft: '10px',
                          fontSize: '11px'
                        }}
                      >
                        {!validateLength(password) && (
                          <li>The password must be 8 digits in length</li>
                        )}
                        {!validateLower(password) && (
                          <li>The password must must have a lowercase character</li>
                        )}
                        {!validateUpper(password) && (
                          <li>The password must must have a uppercase character</li>
                        )}
                        {!validateNumber(password) && <li>The password must must have a number</li>}
                        {!validateSpecialChar(password) && (
                          <li>The password must must have a special character</li>
                        )}
                      </ul>
                    )}
                    <CustomInput
                      id='conf-password'
                      formControlProps={{
                        fullWidth: true
                      }}
                      error={confirmPassword && password !== confirmPassword}
                      success={confirmPassword && password == confirmPassword}
                      inputProps={{
                        placeholder: 'Confirm Password...',
                        type: showConfPassword ? 'text' : 'password',
                        value: confirmPassword || '',
                        onChange: (e) => handleChange(e, 'passwordConf'),
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon
                              aria-label='toggle password visibility'
                              onClick={handleClickShowConfPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showConfPassword ? <Visibility /> : <VisibilityOff />}
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                    />
                     {confirmPassword && password !== confirmPassword && (
                      <ul
                        style={{
                          color: 'red',
                          paddingLeft: '10px',
                          fontSize: '11px'
                        }}
                      >
                        <li>Passwords are not matching</li>
                        
                      </ul>
                    )}
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button
                      round
                      color={password != confirmPassword ? 'info' : 'success'}
                      onClick={handleResetPassword}
                      disabled={password != confirmPassword}
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    
    // </div>
    // </div>
  );
}

ResetPage.propTypes = {
  // changeLoginUser: func,
  // loginUser: shape({
  //   email: any,
  //   password: string,
  //   passwordConf: string
  // }),
  // resetLoginUser: func
};

const mapStateToProps = (state) => ({
  loginUser: state.loginUser,
  user: state.user
});

const mapDispatchToProps = {
  // changeLoginUser: changeLoginUser,
  // resetLoginUser: resetLoginUser,
  // changeUser: changeUser,
  // resetUser: resetUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPage);
