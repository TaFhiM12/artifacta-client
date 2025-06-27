import { useState } from "react";
import { motion } from "framer-motion";

const ArtifactQuiz = () => {
  const questions = [
    {
      question:
        "What's the safest way to clean a 2000-year-old bronze artifact?",
      options: [
        "Soap and water",
        "Ultrasonic cleaner",
        "Soft brush and distilled water",
        "Steel wool",
      ],
      answer: 2,
    },
    {
      question: "Which light level causes the LEAST damage to textiles?",
      options: [
        "500 lux (bright office)",
        "200 lux (living room)",
        "50 lux (museum display)",
        "10 lux (moonlight)",
      ],
      answer: 2,
    },
    {
      question:
        "What's the safest way to clean a 2000-year-old bronze artifact?",
      options: [
        "Soap and water",
        "Ultrasonic cleaner",
        "Soft brush and distilled water",
        "Steel wool",
      ],
      answer: 2,
    },
    {
      question: "Which light level causes the LEAST damage to textiles?",
      options: [
        "500 lux (bright office)",
        "200 lux (living room)",
        "50 lux (museum display)",
        "10 lux (moonlight)",
      ],
      answer: 2,
    },
    {
      question: "Why is it important to document artifacts?",
      options: [
        "Ensures artifact longevity",
        "Maintains authenticity",
        "Enhances educational value",
        "All of the above",
      ],
      answer: 3,
    },
    {
      question: "What is the ideal temperature range for storing artwork?",
      options: [
        "4-10°C (39-50°F)",
        "18-24°C (65-75°F)",
        "27-32°C (80-90°F)",
        "Too hot",
      ],
      answer: 1,
    },
    {
      question: "What type of shelving is best for artifact storage?",
      options: [
        "Wood shelving",
        "Sturdy steel shelving with synthetic polymer powder coating",
        "Cardboard boxes",
        "Any available shelf",
      ],
      answer: 1,
    },
    {
      question: "Why should artifacts not be stored on the ground?",
      options: [
        "Risk of pest infestation",
        "Exposure to water damage",
        "Both A and B",
        "For convenience",
      ],
      answer: 2,
    },
    {
      question: "What should be used as padding for artifacts?",
      options: [
        "Polyester batting",
        "Polyethylene foam",
        "Unbleached, undyed cotton muslin",
        "All of the above",
      ],
      answer: 3,
    },
    {
      question: "What is the first step in conserving cultural artifacts?",
      options: [
        "Apply chemicals",
        "Assess and document their condition",
        "Clean the artifact",
        "Put the artifact on display",
      ],
      answer: 1,
    },
    {
      question:
        "What is the purpose of using X-ray and infrared reflectography on artifacts?",
      options: [
        "To clean the artifact",
        "To examine the internal structure and composition without causing damage",
        "To make the artifact more shiny",
        "To test the artifact's strength",
      ],
      answer: 1,
    },
    {
      question: "What is the ideal humidity range for storing paper artifacts?",
      options: ["10-20%", "30-50%", "60-80%", "90-100%"],
      answer: 1,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-amber-600"
    >
      {!showResult ? (
        <>
          <h3 className="text-xl font-bold text-amber-800 mb-4">
            Question {currentQuestion + 1}/{questions.length}
          </h3>
          <p className="mb-6 text-gray-700">
            {questions[currentQuestion].question}
          </p>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(index)}
                className="w-full text-left px-4 py-3 bg-amber-50 rounded-lg border border-amber-200 hover:bg-amber-100 transition-colors"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-amber-800 mb-2">
            Quiz Complete!
          </h3>
          <p className="text-lg mb-4">
            Your score: {score}/{questions.length}
          </p>
          {score === questions.length ? (
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full">
              <span className="mr-2">🏆</span> Conservation Expert!
            </div>
          ) : (
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setShowResult(false);
              }}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ArtifactQuiz;
