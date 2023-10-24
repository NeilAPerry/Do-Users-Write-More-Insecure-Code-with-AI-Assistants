import React from 'react';
import { connect } from 'react-redux';
import actions from './actions/index';
import NextButton from './NextButton';

// const {
// } = actions;

const { ipcRenderer } = window.require('electron');

class OutOfTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    const {
      order,
      questions,
      remainingQuestions,
      tab,
      times,
      currTime,
      code,
    } = this.props;
    const {
      mounted,
    } = this.state;
    if (!mounted) {
      console.log('saving all answers');
      // reorders the questions
      const newQuestions = order.reduce(
        (prev, curr, idx) => ({
          ...prev,
          [idx + 1]: questions[curr],
        }),
        {},
      );

      const questionsToDisplay = remainingQuestions.reduce(
        (prev, curr) => ({
          ...prev,
          [curr]: newQuestions[curr],
        }),
        {},
      );

      // save all questions
      // update timing on current question
      // (on index 'tab' of keys of sorted 'questionsToDisplay') and save it
      const sortedRemainingQuestions = Object.keys(questionsToDisplay).sort();
      const questionNum = sortedRemainingQuestions[tab];
      const timesIndex = questionNum - 1;
      const newTime = Date.now();
      const timeToAdd = newTime - currTime;
      ipcRenderer.send(
        'save-question',
        {
          num: questionNum,
          answer: code[timesIndex].input,
          time: timeToAdd + times[timesIndex],
        },
      );
      // save rest of remaining questions
      Object.entries(questionsToDisplay).forEach(([key, value]) => {
        if (key !== questionNum) {
          const index = (+key) - 1;
          ipcRenderer.send(
            'save-question',
            {
              num: key,
              answer: code[index].input,
              time: times[index],
            },
          );
        }
      });
      this.setState({
        mounted: true,
      });
    }
  }

  render() {
    // const {
    // } = this.props;
    return (
      <div>
        <h1>Times up!</h1>
        <NextButton
          onClick={() => {

          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.app.questionOrder,
  questions: state.app.questions,
  remainingQuestions: state.app.remainingQuestions,
  tab: state.app.questionTab,
  currTime: state.timing.currTime,
  times: state.timing.times,
  code: state.code,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OutOfTime);
