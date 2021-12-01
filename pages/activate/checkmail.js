import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import OtpInput from 'react-otp-input';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import CardHeader from '../../components/Card/CardHeader';
import Button from '../../components/CustomButtons/Button';
import FooterLow from '../../components/Footer/FooterLow';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import UpperHeader from '../../components/Header/UpperHeader';
// import connection from '../../lib/axiosInstance';
import { any, shape } from '../../lib/commonImports';
import image from '../../public/img/bg7.jpg';
import { verifyOtp } from '../../redux/action/action';
import loginPageStyle from '../../styles/jss/nextjs-material-kit-pro/pages/loginPageStyle';
import { useDispatch } from "react-redux";
const useStyles = makeStyles(loginPageStyle);

function LoginPage(props) {
  const [otp, setOtp] = React.useState('');
  const [resetPasswordOTP, setResetPasswordOTP] = React.useState('');
  const dispatch = useDispatch();
  React.useEffect(() => {});

 

  const verifyPassword = async (resetPassword) => {
  let data ={
    token:resetPassword,
    email:localStorage.getItem('checkInspector')
  }
      const result = await dispatch(verifyOtp(data));
      if (result) {
             toast.success('Set Your Password');
             Router.push(`/reset/${resetPassword}`);
          } else {
              toast.error('Invalid Otp');
           
          }
  };

  const clearOtp = () => {
    setOtp('');
  };

  const clearResetPasswordOTP = () => {
    setResetPasswordOTP('');
  };
  const close = () => {
    Router.push('/');
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
            <GridItem xs={12} sm={8} md={6}>
              <Card>
                <form
                  className={classes.form}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <CardHeader color='success' signup className={classes.cardHeader}>
                    <h4>Reset Password</h4> 
                  </CardHeader>
                  <CardBody signup>
                    <div></div>
                    <h4>Check your mail and enter the “one-time password” to validate your user</h4>

                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                      
                        <OtpInput
                          value={resetPasswordOTP}
                          onChange={(e) => setResetPasswordOTP(e)}
                          numInputs={6}
                          isInputNum={true}
                          separator={<span>&nbsp;-&nbsp;</span>}
                          inputStyle={{
                            width: '2em',
                            height: '2em',
                            fontSize: '14px'
                          }}
                        />
                      
                     
                    </div>
                    <div className={classes.textCenter}>
                      
                        <Button
                          type='submit'
                          simple
                          color={resetPasswordOTP.length != 6 ? 'warning' : 'success'}
                          size='lg'
                          onClick={() => {
                            verifyPassword(resetPasswordOTP);
                          }}
                          disabled={resetPasswordOTP.length != 6}
                        >
                          <strong>Reset Password</strong>
                        </Button>
                     
                      
                        <Button
                          simple
                          color={resetPasswordOTP.length == 0 ? 'warning' : 'success'}
                          type='button'
                          size='lg'
                          onClick={clearResetPasswordOTP}
                          disabled={resetPasswordOTP.length == 0}
                        >
                          <strong>Clear Fields</strong>
                        </Button>
                      
                      {/* <Link href={'/'}> */}
                        <Button type='button' simple color='success' size='lg' onClick={close}>
                          <strong>Close</strong>
                        </Button>
                      {/* </Link> */}
                    </div>
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      {/* <FooterLow /> */}
    </div>
  );
}

// LoginPage.propTypes = {
//   loginUser: shape({
//     verified: any
//   })
// };

const mapStateToProps = (state) => ({
  registerUser: state.registerUser,
  loginUser: state.loginUser
});

export default connect(mapStateToProps, null)(LoginPage);
