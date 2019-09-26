import React, { Component } from 'react';
import PropTypes from 'prop-types';

const VCHOC = InComponent =>
  class VC extends Component {
    static propTypes = {
      steps: PropTypes.array,
      onClickBackView: PropTypes.func
    };

    render() {
      return (
        <div className="view-controller-container">
          <header className={this.defineHeaderClass()}>
            <div className="button-section">
              <button
                className="back-button"
                onClick={ev => this.handleClickBackView(ev)}
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1126"
                  height="1024"
                  viewBox="0 0 1126 1024"
                >
                  <path d="M614.349 456.192c-29.594 0-168.96-1.946-168.96-1.946s94.72-88.986 118.579-111.258l40.243-37.632 2.816-2.56c6.929-6.215 11.268-15.196 11.268-25.19s-4.339-18.976-11.236-25.162l-0.032-0.028-2.816-2.662-25.088-23.45c-7.778-7.198-18.221-11.613-29.697-11.613-11.207 0-21.431 4.211-29.174 11.138l0.042-0.037-277.248 258.56c-7.573 6.866-12.31 16.742-12.31 27.725s4.737 20.859 12.279 27.697l0.031 0.028 276.736 258.048c7.936 7.373 18.432 11.418 29.696 11.418 11.213 0 21.709-4.045 29.645-11.418l25.088-23.398c7.526-6.867 12.244-16.702 12.288-27.64v-0.008c-0.048-10.786-4.773-20.46-12.251-27.103l-0.037-0.033-41.216-38.4-126.003-116.378s140.237 3.072 176.23 3.072h271.155c33.178 0 60.006-25.139 59.904-56.064-0.051-30.771-26.88-55.706-59.904-55.706h-270.029z" />
                </svg>
              </button>
            </div>
            <div className="criptext-logo" />
          </header>
          <InComponent {...this.props} />
        </div>
      );
    }

    defineHeaderClass = () => {
      return this.props.steps.length === 1 ? 'invisible' : 'visible';
    };

    handleClickBackView = ev => {
      ev.preventDefault();
      ev.stopPropagation();
      const tmplastStep = [...this.props.steps];
      tmplastStep.pop();
      const steps = tmplastStep;
      const currentStep = tmplastStep[tmplastStep.length - 1];
      this.props.onClickBackView({ steps, currentStep });
    };
  };

export default VCHOC;
