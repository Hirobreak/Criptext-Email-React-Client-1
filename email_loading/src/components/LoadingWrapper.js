import React, { Component } from 'react';
import PropTypes from 'prop-types';
import signal from './../libs/signal';
import { remoteData, errors } from './../utils/electronInterface';
import {
  closeCreatingKeysLoadingWindow,
  openMailboxWindow,
  throwError
} from './../utils/ipc';
import Loading from './Loading';

const animationTypes = {
  RUNNING: 'running-animation',
  STOP: 'stop-animation'
};

const loadingTypes = {
  SIGNUP: 'signup',
  LOGIN: 'login'
};

const delay = 85;
const responseMaxDelay = 300;

class LoadingWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      failed: false,
      animationClass: animationTypes.RUNNING,
      timeout: 0,
      accountResponse: undefined
    };
  }

  componentDidMount() {
    this.increasePercent();
  }

  render() {
    return (
      <Loading
        animationClass={this.state.animationClass}
        percent={this.state.percent}
        failed={this.state.failed}
        restart={this.restart}
      />
    );
  }

  increasePercent = () => {
    const percent = this.state.percent + 1;
    if (percent === 2) {
      if (this.props.loadingType === loadingTypes.SIGNUP) {
        this.createNewAccount();
      } else if (this.props.loadingType === loadingTypes.LOGIN) {
        const { recipientId, deviceId, name } = remoteData;
        this.createAccountWithNewDevice({ recipientId, deviceId, name });
      }
    }
    if (percent > 99) {
      clearTimeout(this.tm);
      this.checkResult();
      return;
    }
    this.setState({ percent });
    this.tm = setTimeout(this.increasePercent, delay);
  };

  createNewAccount = async () => {
    const userCredentials = {
      recipientId: remoteData.username,
      password: remoteData.password,
      name: remoteData.name
    };
    if (remoteData.recoveryEmail !== '') {
      userCredentials['recoveryEmail'] = remoteData.recoveryEmail;
    }
    try {
      const accountResponse = await signal.createAccount(userCredentials);
      if (accountResponse === false) {
        this.loadingThrowError();
      }
      if (accountResponse === true) {
        this.setState({
          accountResponse,
          failed: false
        });
      }
    } catch (e) {
      if (e.code === 'ECONNREFUSED') {
        throwError(errors.server.UNABLE_TO_CONNECT);
      } else {
        throwError({
          name: e.name,
          description: e.description || e.message
        });
      }
      this.loadingThrowError();
      return;
    }
  };

  createAccountWithNewDevice = async ({ recipientId, deviceId, name }) => {
    try {
      const loginResponse = await signal.createAccountWithNewDevice({
        recipientId,
        deviceId,
        name
      });
      if (loginResponse === false) {
        this.loadingThrowError();
      }
      if (loginResponse === true) {
        this.setState({
          accountResponse: loginResponse,
          failed: false
        });
      }
    } catch (e) {
      if (e.code === 'ECONNREFUSED') {
        throwError(errors.server.UNABLE_TO_CONNECT);
      } else {
        throwError({
          name: e.name,
          description: e.description || e.message
        });
      }
      this.loadingThrowError();
    }
  };

  checkResult = () => {
    if (
      this.state.timeout > responseMaxDelay &&
      this.state.accountResponse === undefined
    ) {
      clearTimeout(this.state.timeout);
      throwError(errors.server.NO_RESPONSE);
      this.loadingThrowError();
      return;
    }
    if (this.state.accountResponse === false) {
      clearTimeout(this.state.timeout);
      this.loadingThrowError();
    }
    if (this.state.accountResponse === true) {
      clearTimeout(this.state.timeout);
      this.setState({ percent: 100 }, () => {
        openMailboxWindow();
        closeCreatingKeysLoadingWindow();
      });
    }
    this.setState({
      timeout: setTimeout(this.checkResult, 1000)
    });
  };

  loadingThrowError = async () => {
    clearTimeout(this.tm);
    this.setState({
      failed: true,
      animationClass: animationTypes.STOP
    });
    await setTimeout(() => {
      this.setState({
        percent: 0
      });
    }, 1000);
  };

  restart = () => {
    clearTimeout(this.tm);
    this.setState(
      {
        percent: 0,
        animationClass: animationTypes.RUNNING,
        failed: false
      },
      () => {
        this.increasePercent();
      }
    );
  };
}

LoadingWrapper.propTypes = {
  loadingType: PropTypes.string
};

export default LoadingWrapper;
