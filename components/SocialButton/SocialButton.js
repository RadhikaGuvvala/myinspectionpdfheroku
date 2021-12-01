import React from 'react';
import SocialLogin from 'react-social-login';
import Button from '../../components/CustomButtons/Button';
import { any } from '../../lib/commonImports';

class SocialButton extends React.Component {
  render() {
    return (
      <Button justIcon color='transparent' onClick={this.props.triggerLogin} {...this.props} type='button'>
        <i className={'fab fa-' + this.props.children} />
      </Button>
    );
  }
}

SocialButton.propTypes = {
  triggerLogin: any,
  children: any
};

export default SocialLogin(SocialButton);
