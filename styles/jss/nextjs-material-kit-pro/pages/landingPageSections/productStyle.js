import { title } from '../../../../../styles/jss/nextjs-material-kit-pro';

const productStyle = {
  section: {
    padding: '70px 0',
    textAlign: 'center'
  },
  sectionImage: {
    padding: '70px 0',
    textAlign: 'center'
  },
  bigMap: {
    height: '55vh',
    maxHeight: '550px',
    width: '100%',
    display: 'block'
  },
  sectionforgrow: {
    padding: '70px 0',
    textAlign: 'center'
  },
  sectionForCareer: {
    padding: '30px 0',
    textAlign: 'center'
  },
  sectionForabout: {
    padding: '70px 0',
    textAlign: 'center'
  },
  sectionForPricing: {
    padding: '230px 0',
    textAlign: 'center'
  },

  contentCenter: {
    textAlign: 'center'
  },

  title: {
    ...title,
    marginBottom: '1rem',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none'
  },
  titleForCommitment: {
    ...title,
    marginBottom: '1rem',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none'
  },

  titlesection: {
    ...title,
    marginBottom: '1rem',
    marginTop: '30px',
    minHeight: '32px',
    fontSize: '25px',
    textDecoration: 'none'
  },
  description: {
    color: '#333'
  },
  howweDo: {
    color: '#3C4858',
    fontSize: '30px',
    fontWeight: 600,
    marginBottom: '1rem',
    backgroundPosition: '0 0',
    backgroundSize: 'cover'
  },
  imageBox: {
    width: '300px',
    maxWidth: '450px'
  },
  imageBoxone: {
    width: '150px',
    maxWidth: '450px'
  },
  fromTop: {
    display: 'flex'
  },
  textdiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
  },
  textSizeClass: {
    fontSize: '1.5rem',
    lineHeight: '1.55em',
    fontWeight: 400,
    color: '#333'
  },
  textSizeClassImage: {
    fontSize: '1.4rem',
    lineHeight: '1.66em',
    fontWeight: 400,
    color: '#333'
  },
  questionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    fontFamily: 'Roboto Slab'
  },
  buttonText: {
    margin: '0px',
    display: 'inline-flex',
    position: 'relative',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '20px',
    textDecoration: 'none',
    textTransform: 'none !important'
  },
  roundCard: {
    borderRadius: '100px !important',
    padding: '30px !important',
    backgroundColor: '#e2f0d9'
  },
  roundCardwthOutColor: {
    borderRadius: '100px !important',
    padding: '30px !important'
  },
  '@media (max-width: 992px)': {
    roundCard: {
      borderRadius: '100px !important'
    },
    roundCardwthOutColor: {
      borderRadius: '100px !important'
    }
  },
  listClass: {
    fontSize: '1.4rem',
    lineHeight: '1.66em',
    fontWeight: 400,
    color: '#333',
    marginTop: '30px'
  },
  ulClass: {
    marginTop: '70px',
    textAlign: 'left'
  },
  bannerText: {
    fontSize: '1.6rem',
    lineHeight: '1.55em',
    fontWeight: 400,
    color: 'white'
  },
  '@media (max-width: 998px)': {
    sectiononDiv: {
      display: 'none'
    },
    onMobileDiv: {
      display: 'block'
    },
    imageBox: {
      width: '180px',
      maxWidth: '450px'
    },
    questionTitle: {
      paddingRight: '25px',
      fontSize: '20px',
      fontWeight: '600',
      fontFamily: 'Roboto Slab'
    }
  },
  '@media (min-width: 998px)': {
    sectiononDiv: {
      display: 'block'
    },
    onMobileDiv: {
      display: 'none'
    }
  },

  onMobileDiv: {
    marginTop: '60px'
  },
  sectiononDiv: {
    marginTop: '0px'
  },
  '@media (max-width: 567px)': {
    buttonText: {
      width: '180px',
      fontSize: '15px'
    }
  },
  '@media (max-width: 340px)': {
    titleForCommitment: {
      fontSize: '24px'
    }
  }
};

export default productStyle;
