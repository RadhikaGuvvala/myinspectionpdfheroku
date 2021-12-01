import nextConnect from 'next-connect';
import middleware from '../../../middleware/middleware';

import bcrypt from 'bcryptjs';

const handler = nextConnect();

handler.use(middleware);


handler.patch(async (req, res) => {
  try {
    let { email, oldPassword, newPassword } = req.body;
    const userLogin = await req.db.collection('inspectors').findOne({ email });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    if (oldPassword != newPassword && userLogin && (await bcrypt.compare(oldPassword, userLogin.password))) {
      await req.db.collection('inspectors').updateOne(
        { email: email },
        {
          $set: {
            password: hashedPassword,
            token: undefined,
            deactivated: false
          }
        }
      );
      res.status(200).json({ data: 'Password Updated Successfully!!!', user: userLogin });
    } else {
      res.status(404).json({ data: 'Cannot update password to the old password!!!' });
    }
  } catch (error) {
    console.log(error);
  }
});

export default handler;
