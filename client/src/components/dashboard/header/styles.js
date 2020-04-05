import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  header: {
    position: 'fixed',
    zIndex: '1000',
    paddingTop: "1%",
    paddingBottom: "1%",
    marginBottom: "2%",
    backgroundColor: "#1976d2",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.5), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },

  headerItems: {
    margin: "10px",
    color: "white",
  },

  searchBar: {
    backgroundColor: "white",
    color: "black",
  },

  addBtn: {
    fontWeight: '700',
    color: "white",
    border: "1px solid white",
    backgroundColor: "#268745",
    
    "&:hover": {
      color: "#268745",
      border: "1px solid #268745",
      backgroundColor: 'white'
    },
  },
}));
