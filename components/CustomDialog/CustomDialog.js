import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React from 'react';
import loginPageStyle from '../../styles/jss/nextjs-material-kit-pro/pages/loginPageStyle';
import CardHeader from '../../components/Card/CardHeader';

const useStyles = makeStyles(loginPageStyle);

function CustomDialogTitle(props) {
  const classes = useStyles();
  const { children } = props;
  return (
    <DialogTitle id="alert-dialog-title">
      <CardHeader
        color={props.color}
        signup
        className={classes.cardHeader}
        style={{ position: 'relative' }}
      >
        <IconButton
          aria-label="delete"
          className={classes.margin}
          size="small"
          style={{
            position: 'absolute',
            right: '10px',
            top: '25%',
            color: 'white'
          }}
          onClick={() => {
            props.close();
          }}
        >
          <CloseIcon fontSize="inherit" style={{ position: 'absolute' }} />
        </IconButton>
        {children}
      </CardHeader>
    </DialogTitle>
  );
}

CustomDialogTitle.propTypes = {
  close: PropTypes.func,
  color: PropTypes.any,
  children: PropTypes.any
};
export default CustomDialogTitle;
