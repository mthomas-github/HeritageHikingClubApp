import React, {Component} from 'react';
import * as Animatable from 'react-native-animatable';
import {Dimensions, StyleSheet} from 'react-native';
const defaultInOnNext = 'bounceInLeft';
const defaultOutOnNext = 'bounceOutRight';
const defaultInOnBack = 'bounceInRight';
const defaultOutOnBack = 'bounceOutLeft';
const SCREEN_DIMENSIONS = Dimensions.get('window');

export class AnimatedFormView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      totalSteps: 0,
      userState: {},
      action: 'bounceInLeft',
      animationFinished: false,
      tripState: {},
    };
  }

  componentDidMount() {
    const {steps = 0, comeInOnNext = defaultInOnNext, trip} = this.props;
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      totalSteps: steps.length - 1,
      action: comeInOnNext,
      tripState: trip,
    });
  }

  next = () => {
    const {currentStep, totalSteps} = this.state;
    const {animate = true, OutOnNext = defaultOutOnNext} = this.props;
    if (currentStep !== totalSteps) {
      this.onNext();
      this.setState({action: OutOnNext, animationFinished: false});
      if (animate) {
        setTimeout(() => {
          this.setState({currentStep: currentStep + 1});
        }, 300);
      }
    } else {
      this.finish();
    }
  };

  back = () => {
    const {currentStep} = this.state;
    const {animate = true, OutOnBack = defaultOutOnBack} = this.props;
    if (currentStep !== 0) {
      this.onBack();
      this.setState({action: OutOnBack, animationFinished: false});
      if (animate) {
        setTimeout(() => {
          this.setState({currentStep: currentStep - 1});
        }, 300);
      }
    }
  };

  cancel = () => {
    const {onCancel} = this.props;
    if (onCancel) {
      onCancel();
    }
  };

  onNext = () => {
    const {onNext} = this.props;
    if (onNext) {
      if (typeof onNext !== 'function') {
        throw new Error('onNext parameter should be a function');
      }
      onNext();
    }
  };

  onBack = () => {
    const {onBack} = this.props;
    if (onBack) {
      if (typeof onBack !== 'function') {
        throw new Error('onBack parameter should be a function');
      }
      onBack();
    }
  };

  onCancel = () => {
    const {onCancel} = this.props;
    if (onCancel) {
      if (typeof onCancel !== 'function') {
        throw new Error('onBack parameter should be a function');
      }
      onCancel();
    }
  };

  finish = () => {
    const {onFinish} = this.props;
    const {userState} = this.state;
    if (onFinish) {
      onFinish(userState);
    }
  };

  saveState = state => {
    const {userState} = this.state;
    if (typeof state !== 'object') {
      throw new Error('state must be an object');
    }
    this.setState({userState: {...userState, ...state}});
  };

  getState = () => {
    return this.state.userState;
  };

  getTripState = () => {
    return this.state.tripState;
  };

  animationEnd = () => {
    const {action, animationFinished} = this.state;
    const {
      OutOnBack = defaultOutOnBack,
      comeInOnBack = defaultInOnBack,
      comeInOnNext = defaultInOnNext,
    } = this.props;
    if (!animationFinished) {
      this.setState({
        action: action === OutOnBack ? comeInOnBack : comeInOnNext,
        animationFinished: true,
      });
    }
  };

  render() {
    const {steps = 0} = this.props;
    const {currentStep, action} = this.state;
    const Step = steps[currentStep].component;

    return (
      <Animatable.View
        ref={this.handleViewRef}
        animation={action}
        onAnimationEnd={this.animationEnd}
        style={styles.container}>
        <Step
          next={this.next}
          back={this.back}
          cancel={this.cancel}
          saveState={this.saveState}
          getState={this.getState}
          getTrip={this.getTripState}
        />
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_DIMENSIONS.width,
    height: SCREEN_DIMENSIONS.height,
  },
});

export default Animatable.createAnimatableComponent(AnimatedFormView);
