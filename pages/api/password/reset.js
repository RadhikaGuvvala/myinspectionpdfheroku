import bcrypt from 'bcryptjs';
import nextConnect from 'next-connect';
import { sendMail } from '../../../lib/api-helpers';
import middleware from '../../../middleware/middleware';

const handler = nextConnect();

handler.use(middleware);



handler.post(async (req, res) => {
    console.log("email",req.body)
  let { email} = req.body;
  console.log(email)
  const userLogin = await req.db.collection('inspectors').findOne({ email });
  const token = (Math.floor(Math.random() * (999999 - 100000)) + 100000).toString();
  let tokenToSend = token.split('');
  tokenToSend =
    tokenToSend[0] + tokenToSend[1] + '-' + tokenToSend[2] + tokenToSend[3] + '-' + tokenToSend[4] + tokenToSend[5];
  const subject =  ' OTP';
  const message = '<b>OTP : </b> <span>' + tokenToSend.toString() + '</span>';
console.log(userLogin)
  if (userLogin) {
    req.db.collection('inspectors').updateOne(
      { email: userLogin.email },
      {
        $set: {
          token: token
        }
      }
    );

    sendMail(userLogin.email, subject, message, () => {
      res.status(200).json({ message: 'mail sent' });
    });
  } else {
    res.status(404).json({
      message: 'This email isnt associated with any user on this website!!!'
    });
  }
});

handler.put(async (req, res) => {

  let { token ,email} = req.body;
  const userLogin = await req.db.collection('inspectors').findOne({ email });
  
  if (userLogin) {
    if(userLogin.token == token){
      res.status(200).json({ message: 'User Found', user: userLogin });
    }else{
      res.status(404).json({ message: 'Invalid Token' });
    }
    
  } else {
    res.status(404).json({ message: 'User Not found' });
  }
});

handler.patch(async (req, res) => {
  let { token, password } = req.body;
  const userLogin = await req.db.collection('inspectors').findOne({ token });
  const hashedPassword = await bcrypt.hash(password, 10);
  if (userLogin) {
    await req.db.collection('inspectors').updateOne(
      { token: token },
      {
        $set: {
          password: hashedPassword,
          token: undefined,
          deactivated: false,
          loginAttempt: 0
        }
      }
    );
    delete userLogin.password;
    delete userLogin.token;
    res.status(200).json({ message: 'User Updated Successfully!!!', user: userLogin });
  } else {
    res.status(404).json({ message: 'Invalid Token' });
  }
});

export default handler;
