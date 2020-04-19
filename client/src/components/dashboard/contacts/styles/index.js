import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  searchBarContainer: {
    marginBottom: "1.5%"
  },
  searchBar: {
    backgroundColor: "white",
    color: "black",
  },
  addBtn: {
    fontSize: '1.1rem',
    color: "black",
    "&:hover": {
      color: "blue",
    },
  },
}));
