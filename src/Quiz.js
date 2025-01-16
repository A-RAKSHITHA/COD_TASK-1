import React, { useState } from 'react';
import './Quiz.css';

const questions = [
  {
    id: 1,
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "JavaScript", "Java", "C++"],
    correctAnswer: "JavaScript"
  },
  {
    id: 2,
    question: "What does API stand for?",
    options: ["Application Programming Interface", "Advanced Programming Interface", "Application Process Integration", "Advanced Protocol Interface"],
    correctAnswer: "Application Programming Interface"
  },
  {
    id: 3,
    question: "Who is the CEO of OpenAI?",
    options: ["Sam Altman", "Elon Musk", "Sundar Pichai", "Mark Zuckerberg"],
    correctAnswer: "Sam Altman"
  },
  {
    id: 4,
    question: "Which of these is a version control system?",
    options: ["Docker", "Git", "Kubernetes", "Jenkins"],
    correctAnswer: "Git"
  },
  {
    id: 5,
    question: "What is the latest version of HTML?",
    options: ["HTML4", "HTML5", "HTML6", "HTML7"],
    correctAnswer: "HTML5"
  },
  {
    id: 6,
    question: "Which company owns Android?",
    options: ["Apple", "Microsoft", "Google", "Samsung"],
    correctAnswer: "Google"
  },
  {
    id: 7,
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Coded Style Syntax"],
    correctAnswer: "Cascading Style Sheets"
  },
  {
    id: 8,
    question: "Which of these is not a cloud service provider?",
    options: ["AWS", "Azure", "Oracle Cloud", "Adobe"],
    correctAnswer: "Adobe"
  },
  {
    id: 9,
    question: "What is the primary function of a firewall?",
    options: ["Virus Detection", "Network Security", "Data Backup", "File Sharing"],
    correctAnswer: "Network Security"
  },
  {
    id: 10,
    question: "Which programming paradigm does React.js follow?",
    options: ["Procedural", "Object-Oriented", "Functional", "Declarative"],
    correctAnswer: "Declarative"
  },
  {
    id: 11,
    question: "What is the most popular NoSQL database?",
    options: ["MongoDB", "Cassandra", "Redis", "Neo4j"],
    correctAnswer: "MongoDB"
  },
  {
    id: 12,
    question: "Which protocol is used for secure data transmission?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correctAnswer: "HTTPS"
  },
  {
    id: 13,
    question: "What is the purpose of DNS?",
    options: ["Domain Name System", "Data Network Service", "Digital Network System", "Domain Network Service"],
    correctAnswer: "Domain Name System"
  },
  {
    id: 14,
    question: "Which language is primarily used for AI/ML?",
    options: ["Java", "Python", "C++", "Ruby"],
    correctAnswer: "Python"
  },
  {
    id: 15,
    question: "What is the latest ECMAScript version (as of 2024)?",
    options: ["ES5", "ES6", "ES2023", "ES2024"],
    correctAnswer: "ES2024"
  }
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState({ show: false, isCorrect: false });
  const [answers, setAnswers] = useState([]);

  const handleAnswerClick = (selectedAnswer) => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    
    setAnswers([...answers, {
      question: questions[currentQuestion].question,
      userAnswer: selectedAnswer,
      correctAnswer: questions[currentQuestion].correctAnswer,
      isCorrect
    }]);

    setFeedback({ show: true, isCorrect });

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setFeedback({ show: false, isCorrect: false });
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setFeedback({ show: false, isCorrect: false });
    setAnswers([]);
  };

  const getPerformanceMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "Outstanding! You're a tech expert! 🏆";
    if (percentage >= 70) return "Great job! You know your stuff! 🌟";
    if (percentage >= 50) return "Good effort! Keep learning! 📚";
    return "Keep practicing! You'll get better! 💪";
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>Quiz Complete!</h2>
          <p>You scored {score} out of {questions.length}</p>
          <div className="performance-message">
            {getPerformanceMessage()}
          </div>
          
          <div className="detailed-feedback">
            <h3>Detailed Review</h3>
            {answers.map((answer, index) => (
              <div 
                key={index} 
                className={`answer-review ${answer.isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="question-review">
                  <span className="question-number">Q{index + 1}:</span> 
                  {answer.question}
                </div>
                <div className="answer-details">
                  <div className="your-answer">
                    Your answer: {answer.userAnswer}
                    <span className={`answer-icon ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                      {answer.isCorrect ? '✓' : '✗'}
                    </span>
                  </div>
                  {!answer.isCorrect && (
                    <div className="correct-answer">
                      Correct answer: {answer.correctAnswer}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <button onClick={restartQuiz} className="restart-button">
            Try Again
          </button>
        </div>
      ) : (
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className="question-text">
            {questions[currentQuestion].question}
          </div>
          <div className="answer-options">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerClick(option)}
                className={`answer-button ${
                  feedback.show && option === questions[currentQuestion].correctAnswer
                    ? 'correct'
                    : feedback.show && option !== questions[currentQuestion].correctAnswer
                    ? 'incorrect'
                    : ''
                }`}
                disabled={feedback.show}
              >
                {option}
              </button>
            ))}
          </div>
          {feedback.show && (
            <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
              {feedback.isCorrect ? 'Correct!' : 'Incorrect!'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz; 