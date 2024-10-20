import { useEffect, useState } from 'react'

function App() {

  const [riddle, setRiddle] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);


  const fetchRiddle = async () => {
    try {
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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center w-[95%]">
        <div className="font-bold text-2xl mb-8 text-center">
          Riddle me this
        </div>
        <div className="p-4 rounded-xl border border-slate-400 mb-4 w-full min-h-36">
          {
            !loading && <div className="text-lg font-semibold">
              {riddle}
            </div>
          }
        </div>
        <div className={`p-4 rounded-xl border border-slate-400 w-full relative min-h-36 ${answerStyle}`}>
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
    </div>
  )
}

export default App
