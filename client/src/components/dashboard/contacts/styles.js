import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  card: {
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '15px',
    borderRadius: '3%',
    boxShadow: `0px 2px 1px -1px rgba(0, 0, 0, 1), 0px 1px 1px 0px rgba(0, 0, 0, 1), 
                0px 1px 3px 0px rgba(0, 0, 0, 1)`
  },

  // header styles
  cardHeaderItem: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '30px'
  },

  cardAvatar: {
    height: '80px',
    width: '80px',
    backgroundColor: '#1976d2',
    border: '2px solid black'
  },

  cardAvatarIcon: {
    fontSize: '80px',
  },

  // content styles
  cardContent: {
    paddingTop: '0px',
    paddingBottom: '8px'
  },

  cardIcon: {
    color: 'black'
  }
}));
