import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  // ----- Search Bar Styles -----
  searchBarContainer: {
    marginBottom: "1.5%",
  },

  searchBar: {
    backgroundColor: "white",
    color: "black",
  },

  addBtn: {
    fontSize: "1.1rem",
    color: "black",
    "&:hover": {
      color: "blue",
    },
  },

  maxWidth: {
    width: '100%'
  },
  
  // ----- Modal Styles -----
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline:'0'
  },

  modalCardWrapper: {
    outline:'0'
  },

  letterHeader:{
    fontWeight: '700', 
    borderBottom: 'solid black 2px', 
    marginBottom: '10px', 
    marginTop: '30px'
  },

  pageFooter: {
    width: '100%', 
    display: 'flex', 
    justifyContent: 'center',
    fontSize: '22px',
    paddingTop: '20px',
    paddingBottom: '20px'
  },
  

  // ----- Card Styles -----
  infoCard: {
    marginLeft: "10px",
    marginRight: "10px",
    marginBottom: "15px",
    paddingTop: '0px',
    paddingBottom: '0px'
  },

  modalCard: {
    margin: "0px",
  },

  card: {
    overflow: "hidden",
    boxShadow: `0px 2px 1px -1px rgba(0, 0, 0, 1), 0px 1px 1px 0px rgba(0, 0, 0, 1), 
                0px 1px 3px 0px rgba(0, 0, 0, 1)`,
  },

  cardHeaderItem: {
    display: "flex",
    justifyContent: "center",
    fontSize: "30px",
  },

  infoCardAvatar: {
    fontSize: "40px", 
    backgroundColor: '#1976d2'
  },

  infoCardAvatarIcon: {
    fontSize: "40px", 
    color: 'white'
  },

  cardAvatar: {
    height: "80px",
    width: "80px",
    backgroundColor: "#1976d2",
    border: "2px solid black",
  },

  cardAvatarIcon: {
    fontSize: "80px",
  },

  cardContent: {
    paddingTop: "0px",
    paddingBottom: "8px",
  },

  cardIcon: {
    color: "black",
  },

  cardInputError: {
    paddingBottom: '0px'
  },

  cardContentError: {
    paddingBottom: '0px',
    paddingTop: '0px'
  },

  mainContainer: {
    paddingTop: "3.5%"
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  'cardList': {
    display: 'flex',
    flexDirection : 'row'
  },

  // query
  '@media (max-width: 768px)':{
    searchBarContainer:{
      paddingTop: "15%",
      marginBottom:"2.5%"
    }
  },
  '@media (min-width: 768px)': {
    searchBarContainer:{
      paddingTop: "6%",
      marginBottom:"2.5%"
    }
  },

  '@media (max-width: 960px)' :{
    'cardList': {
      // display: 'flex',
      flexDirection: 'column'
    },
  },

  '@media (min-width: 992px)':{
    searchBarContainer:{
      paddingTop: "4%",
    }
  },
  '@media (min-width: 1200px)':{
    searchBarContainer:{
      paddingTop: "2.5%",
    }
  }
}));
