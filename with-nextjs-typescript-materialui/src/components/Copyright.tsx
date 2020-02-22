import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/benjohns1/next-ts-mui-jest-template">
        <span data-test='site'>Your Website</span>
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}
