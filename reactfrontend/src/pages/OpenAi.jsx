import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRocket } from 'react-icons/fa';
import { generateText } from '../features/openAi/openAiSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function OpenAi() {
  const [prompt, setPrompt] = useState('');

  const dispatch = useDispatch();

  const { generatedText, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.openai
  );

  useEffect(() => {
    if (isError) {
      console.log('Error message:', message); // Add this line

      toast.error(message);
    }
  }, [isError, message]);

  const onChange = (e) => {
    setPrompt(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(generateText( prompt ));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="accentBlue heading">
        <h1>
          <FaRocket /> Generate AI Text
        </h1>
        <p>Enter a prompt and generate AI text using OpenAI API</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="prompt"
              name="prompt"
              value={prompt}
              placeholder="Enter your prompt"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
      {isSuccess && (
        <section className="response">
          <h2 class="midBlue">AI-Generated Text:</h2>
          <p class="midBlue">{generatedText}</p>
        </section>
      )}
    </>
  );
}

export default OpenAi;
