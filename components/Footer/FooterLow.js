import { makeStyles, withStyles } from "@material-ui/core/styles";
import loginPageStyle from "../../styles/jss/nextjs-material-kit-pro/pages/loginPageStyle";
import React from "react";
import { connect } from "react-redux";
import styles from "../../styles/jss/nextjs-material-kit-pro/pages/ecommerceStyle";
import Footer from "./Footer.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "../CustomButtons/Button";
const style = { ...styles, ...loginPageStyle };
const useStyles = makeStyles(style);

function FooterLow(props) {
  React.useEffect(() => {});
  const classes = useStyles();
  return (
    <>
      <Footer
        theme="white"
        content={
          <div>
            <div
              className={classes.pullCenter}
              style={{
                paddingTop: "20px",
                fontSize: "35px",
                fontWeight: "600",
                color: "gray",
              }}
            >
              Inspection Center
            </div>
            <div style={{ paddingTop: "20px", fontSize: "20px" }}>
              <a
                href="https://go-regi.com"
                style={{ color: "gray", cursor: "pointer" }}
              >
                Create Beautiful Inspection Report For Your Inspection
              </a>
            </div>
            {/* <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <a href="#" className={classes.block} style={{ color: "gray" }}>
                  <i className="fab fa-facebook-square fa-2x" />
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a href="#" className={classes.block} style={{ color: "gray" }}>
                  <i className="fab fa-twitter fa-2x" />
                </a>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <a href="#" className={classes.block} style={{ color: "gray" }}>
                  <i className="fab fa-linkedin fa-2x" />
                </a>
              </ListItem>
            </List> */}
          </div>
        }
      />
      {/* <div className={classes.left}>
              <a href='https://go-regi.com' target='_blank' className={classes.footerBrand}>
                Regi
              </a>
            </div> */}
      {/* <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href='https://www.creative-tim.com/?ref=njsmkp-presentation'
                    target='_blank'
                    className={classes.block}
                  >
                    Creative Tim
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href='https://www.creative-tim.com/presentation?ref=njsmkp-presentation'
                    target='_blank'
                    className={classes.block}
                  >
                    About us
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a href='http://blog.creative-tim.com/?ref=njsmkp-presentation' className={classes.block}>
                    Blog
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href='https://www.creative-tim.com/license?ref=njsmkp-presentation'
                    target='_blank'
                    className={classes.block}
                  >
                    Licenses
                  </a>
                </ListItem>
              </List> */}
      {/* <div className={classes.rightLinks}>
              <ul>
                <li>
                  <Button
                    href='https://twitter.com/CreativeTim?ref=creativetim'
                    target='_blank'
                    color='twitter'
                    justIcon
                    simple
                  >
                    <i className='fab fa-twitter' />
                  </Button>
                </li>
                <li>
                  <Button
                    href='https://dribbble.com/creativetim?ref=creativetim'
                    target='_blank'
                    color='dribbble'
                    justIcon
                    simple
                  >
                    <i className='fab fa-dribbble' />
                  </Button>
                </li>
                <li>
                  <Button
                    href='https://instagram.com/CreativeTimOfficial?ref=creativetim'
                    target='_blank'
                    color='instagram'
                    justIcon
                    simple
                  >
                    <i className='fab fa-instagram' />
                  </Button>
                </li>
              </ul>
            </div> */}
    </>
  );
}
const mapStateToProps = (state) => ({
  // user: state.user,
  // clientInfo: state.clientInfo
});

export default connect(mapStateToProps)(withStyles(style)(FooterLow));
