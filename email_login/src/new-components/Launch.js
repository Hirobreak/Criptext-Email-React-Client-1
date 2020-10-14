import React from 'react';
import PropTypes from 'prop-types';
import Button, { STYLE } from './templates/Button';
import { version } from './../../package.json';
import './launch.scss';

const Launch = props => {
  return (
    <div className="launch-container">
      <div className="title-container">
        <div className="title" />
        <div className="subtitle" />
      </div>
      <div className="buttons-container">
        <Button text={'Log In'} style={STYLE.CRIPTEXT} />
        <Button
          text={'Create Account'}
          onClick={() => {
            props.onGoTo('sign-up');
          }}
          style={STYLE.CLEAR}
        />
      </div>
      <div className="version-container">
        <span>Version {version}</span>
      </div>
    </div>
  );
};

Launch.propTypes = {
  onGoTo: PropTypes.func
};

export default Launch;