import React from 'react';
import { useSelector } from 'react-redux';
import style from './Question.scss';
import Answer from './Answer';
import PropTypes from 'prop-types';

const Question = props => {
  const { question, change } = props;
  const questions = useSelector(state => state.questions.questions);
  const answers = useSelector(state => state.answers.answers);
  const [text, setText] = React.useState('');

  const answersObj = React.useMemo(
    () =>
      questions[question].answers.reduce((acc, answer) => {
        return { ...acc, [answer]: false };
      }, {}),
    [questions, question]
  );

  const [radio, setRadio] = React.useState(answersObj);

  const checkRadio = React.useCallback(
    radId => {
      setRadio({ ...answersObj, [radId]: true });
    },
    [answersObj]
  );

  const correctAnswers = React.useMemo(() => {
    return questions[question].answers.reduce((acc, answer) => {
      if (answers[answer].is_right) {
        return [...acc, answer];
      }
      return acc;
    }, []);
  }, [questions, question, answers]);

  const [selectedAnsers, setSelectedAnsers] = React.useState([]);

  const isEqual = (a, b) => {
    const a1 = a.sort(),
      a2 = b.sort();
    return a1.length === a2.sort().length && a1.every((v, i) => v === a2[i]);
  };

  const checkResult = React.useCallback(
    number => {
      if (isEqual(correctAnswers, number)) {
        return change(question, true);
      } else {
        change(question, false);
      }
    },
    [correctAnswers, question, change]
  );

  const addAnswer = React.useCallback(
    value => {
      setSelectedAnsers([...selectedAnsers, value]);
      checkResult([...selectedAnsers, value]);
    },
    [selectedAnsers, checkResult]
  );

  const addAnswerRadio = React.useCallback(
    val => {
      setSelectedAnsers([val]);
      checkResult([val]);
    },
    [checkResult]
  );

  const removeAnswer = React.useCallback(
    value => setSelectedAnsers(selectedAnsers.filter(el => el !== value)),
    [selectedAnsers]
  );

  const handleNumberAnswerInputChange = React.useCallback(
    event => setText(event.target.value),
    []
  );

  const handleNumberAnswerOnBlur = React.useCallback(() => {
    if (text === questions[question].answer.toString()) {
      change(question, true);
    } else {
      change(question, false);
    }
  }, [change, question, questions, text]);

  const _renderAnswers = React.useMemo(() => {
    return questions[question].answers.map(answer => (
      <Answer
        answer={answer}
        key={answer}
        questionType={questions[question].question_type}
        addAnswer={addAnswer}
        removeAnswer={removeAnswer}
        checkRadio={checkRadio}
        radioCheck={radio[answer]}
        addAnswerRadio={addAnswerRadio}
      />
    ));
  }, [
    questions,
    question,
    addAnswer,
    removeAnswer,
    checkRadio,
    radio,
    addAnswerRadio,
  ]);

  return (
    <div className={style.question}>
      <div>{questions[question].title}</div>
      {questions[question].question_type === 'number' ? (
        <input
          placeholder="your answer"
          value={text}
          onChange={handleNumberAnswerInputChange}
          onBlur={handleNumberAnswerOnBlur}
        />
      ) : (
        <div>{_renderAnswers}</div>
      )}
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.number,
  change: PropTypes.func,
};

Question.defaultProps = {
  question: null,
  change: () => {},
};

export default React.memo(Question);
