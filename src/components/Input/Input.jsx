import { useRef, useEffect } from 'react';
import './Input.css';

function Input({ value, onChange, onKeyDown, type = 'text', required = true, placeholder }) {
  const inputRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(event) {
      inputRef.current.focus();

      if (event.key === 'Enter') {
        inputRef.current.blur();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <input
      className="discord-input"
      ref={inputRef}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      type={type}
      required={required}
      placeholder={placeholder}
    />
  );
}

export default Input;
