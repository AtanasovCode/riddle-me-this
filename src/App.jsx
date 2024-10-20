import { useEffect, useState } from 'react'

import logo from './assets/logo.svg';

function App() {

  const [riddle, setRiddle] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);


  const fetchRiddle = async () => {
    try {
      setShowAnswer(false);
      setLoading(true);

      const data = await fetch("https://riddles-api.vercel.app/random");
      const riddle = await data.json();

      return riddle;
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const getRiddle = async () => {
    try {
      const response = await fetchRiddle();

      console.log(response);
      setRiddle(response.riddle);
      setAnswer(response.answer)
    }
    catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRiddle();
  }, [])

  const answerStyle = showAnswer ? "" : "cursor-pointer"

  return (
    <div className="min-h-[100dvh] bg-background text-text flex items-center justify-center font-sans">
      <div className="flex flex-col items-center justify-center w-[95%] xs:w-[85%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[35%] max-w-[45rem]">
        <div className="flex items-center justify-center w-full mb-6">
          <img src={logo} alt="logo" className="w-full" />
        </div>
        <div className="w-full flex flex-col items-center justify-center md:Flex-row">
          <div className="p-4 rounded-xl border border-primary mb-4 w-full min-h-28">
            {
              !loading && <div className="">
                {riddle}
              </div>
            }
          </div>
          <div
            className={`p-4 rounded-xl border border-primary w-full relative min-h-28 ${answerStyle}`}
            onClick={() => !showAnswer && setShowAnswer(true)}
          >
            <div>
              {answer}
            </div>
            {
              !showAnswer &&
              <div className="absolute top-0 left-0 w-full h-full bg-slate-500
            flex items-center justify-center bg-opacity-30 backdrop-blur-[4px]">
                <div className="text-xl">See Answer</div>
              </div>
            }
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <input
            type="button"
            value="New Riddle"
            className="w-full text-background bg-primary px-6 font-bold py-4 text-center rounded-xl cursor-pointer"
            onClick={() => {
              getRiddle();
            }}
          />
        </div>
        <a
          href="https://riddles-api.vercel.app/" target="_blank"
          className="w-full flex items-center justify-center absolute bottom-[2%] mt-2 text-sm opacity-70 underline"
        >
          Powered by riddles-api
        </a>
      </div>
    </div>
  )
}

export default App
