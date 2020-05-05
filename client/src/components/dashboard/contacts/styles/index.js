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

  // ----- Modal Styles -----
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modalCardWrapper: {
    outline:'0'
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },



  // ----- Card Styles -----
  infoCard: {
    marginLeft: "10px",
    marginRight: "10px",
    marginBottom: "15px",
  },

  modalCard: {
    margin: "0px",
  },

  card: {
    overflow: "hidden",
    borderRadius: "3%",
    boxShadow: `0px 2px 1px -1px rgba(0, 0, 0, 1), 0px 1px 1px 0px rgba(0, 0, 0, 1), 
                0px 1px 3px 0px rgba(0, 0, 0, 1)`,
  },

  cardHeaderItem: {
    display: "flex",
    justifyContent: "center",
    fontSize: "30px",
  },

  cardAvatar: {
    height: "80px",
    width: "80px",
    backgroundColor: "#1976d2",
    border: "2px solid black",
  },

  cardAvatarIcon: {
    fontSize: "70px",
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
