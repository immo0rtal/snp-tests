import React from 'react';
import style from './Question.scss';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Answer from './Answer';

const Question = props => {
  const questions = useSelector(state => state.questions.questions);

  const _renderAnswers = React.useMemo(() => {
    return questions[props.question].answers.map(answer => (
      <Answer
        key={answer}
        answer={answer}
        type={questions[props.question].question_type}
      />
    ));
  }, [questions, props.question]);

  return (
    <div>
      <div className={style.question}>
        <div className={style.title}>{questions[props.question].title}</div>
        <div className={style.answers}>
          {questions[props.question].question_type === 'number'
            ? questions[props.question].answer
            : _renderAnswers.length > 0
            ? _renderAnswers
            : 'no answers'}
        </div>
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.number,
};

Question.defaultProps = {
  question: null,
};

export default React.memo(Question);
