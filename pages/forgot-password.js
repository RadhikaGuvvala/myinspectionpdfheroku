import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import Email from '@material-ui/icons/Email';
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
// import { any, func, shape } from '../lib/commonImports';
import image from '../public/img/bg7.jpg';
// import { changeLoginUser, resetLoginUser } from '../redux/action/loginUserAction';
// import { changeUser, resetUser } from '../redux/action/userAction';
import loginPageStyle from '../styles/jss/nextjs-material-kit-pro/pages/loginPageStyle';
import { checkInspector, ForgotPassword } from "../redux/action/action.js";
import { useDispatch } from "react-redux";
const useStyles = makeStyles(loginPageStyle);

function ForgotPasswordPage(props) {
  const [email, setEmail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfPassword, setShowConfPassword] = React.useState(false);
  const [display, setDisplay] = React.useState(true);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setEmail((localStorage?.getItem("checkInspector")))
    }
  }, [])

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(String(password));
  };

  const handleChange = (e, t) => {
    setEmail(e.target.value);
    if (t == 'email' && validateEmail(e.target.value)) {

      checkEmail(e.target.value);
    }
  };
  const checkEmail = async (email) => {
    setDisplay(true)
    const result = await dispatch(checkInspector(email));
    if (result) {
      if (result.data.length) {
        setDisplay(true)
      } else {
        setDisplay(false)
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
  const handleClick = async (e) => {

    const result = await dispatch(ForgotPassword(email));
    if (result) {
      toast.success('Reset password OTP sent to your mail');
      Router.push('/activate/checkmail');

    } else {
      toast.error('User not found');
    }



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
            <GridItem xs={12} sm={8} md={6}>
              <Card>
                <form className={classes.form}>
                  <CardHeader color='success' signup className={classes.cardHeader}>
                    <h4 className={classes.cardTitle}>Forgot Password</h4>
                  </CardHeader>
                  <CardBody signup>
                    <CustomInput
                      id='email'
                      formControlProps={{
                        fullWidth: true
                      }}

                      inputProps={{
                        placeholder: 'Email...',
                        type: 'email',
                        value: email || '',
                        onChange: (e) => handleChange(e, 'email'),
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />

                    {email && validateEmail(email) && !display && (
                      <ul
                        style={{
                          color: 'red',
                          paddingLeft: '10px',
                          fontSize: '11px'
                        }}
                      >
                        <li>User with that email does not exist in the system please Sign Up.</li>
                        {/* {display ? <h4 > User with that email does Not exist in the system please sign up.</h4> : <h4></h4>} */}

                      </ul>
                    )}
                  </CardBody>
                  <div className={classes.textCenter}>
                    {email && validateEmail(email) && (
                      <Button round color='success' onClick={handleClick}>
                        Send password reset OTP
                      </Button>
                    )}
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

// ForgotPasswordPage.propTypes = {
//   changeLoginUser: func,
//   loginUser: shape({
//     alreadyEmail: any,
//     email: func
//   })
// };

const mapStateToProps = (state) => ({
  loginUser: state.loginUser,
  user: state.user
});

// const mapDispatchToProps = {
//   changeLoginUser: changeLoginUser,
//   resetLoginUser: resetLoginUser,
//   changeUser: changeUser,
//   resetUser: resetUser
// };

export default connect(mapStateToProps)(ForgotPasswordPage);
