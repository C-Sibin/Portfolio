import { useState, useEffect } from "react";

interface TypingAnimationProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

const TypingAnimation = ({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypingAnimationProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="inline-flex items-center">
      <span>{currentText}</span>
      <span className="animate-pulse ml-1 text-primary">|</span>
    </span>
  );
};

export default TypingAnimation;
