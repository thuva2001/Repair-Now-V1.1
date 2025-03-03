import React from 'react';

function AdminFooter() {
  return (
    <footer style={styles.footer}>
      <p style={styles.footerText}> ©Copyrights & All Reserved <b>@repairnow </b></p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'black',
    padding: '5px',
    textAlign: 'center',
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    margin: 0,
  },
};

export default AdminFooter;
