import { useState } from "react";
import Workout from "../components/Workout";

function InitPage() {
  const [wods, setWods] = useState([]);
  const [wod, setWod] = useState("");

  const [workout, setWorkout] = useState([]);
  const [titleWod, setTitleWod] = useState("");

  const getWod = async (wod) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/wod/${wod}`
    );

    const data = await response.json();
    if (data.workout === undefined) return;
    data.name = wod;

    setWorkout((currentState) => [...currentState, data]);
  };

  const verifyWod = (workoutToday, getWorkout) => {
    const exist = wods.find((w) => w === workoutToday);
    console.log("verifiywod" + workoutToday);
    if (!exist) {
      return getWorkout(workoutToday);
    } else {
      console.log("ya hubo un llamado de este workout");
      return;
    }
  };

  const handleWod = (e) => {
    const textWod = e.target.id;
    setTitleWod(e.target.innerText);
    setWod(textWod);
    setWods((currentWod) => [...currentWod, textWod]);
  };

  return (
    <section className="h-screen w-full">
      <header className="w-full h-[10%]  flex items-center justify-center p-2">
        <img src="wod-tv/src/assets/logo-g10.png" alt="" className="h-[100%]" />
      </header>
      <div
        className="flex tracking-widest  max-h-[10%]"
        onClick={(e) => {
          handleWod(e);
        }}
      >
        <button
          className="font-semibold tracking-wide focus:scale-100 focus:bg-[#eee] focus:text-[#171717] p-2 rounded-md max-w-fit hover:scale-105 ease-in-out duration-200 cursor-pointer bg-[#212121] m-2"
          onClick={() => {
            verifyWod("crossfit", getWod);
          }}
          id="crossfit"
        >
          Crossfit
        </button>
        <button
          className=" font-semibold tracking-wide focus:scale-100 focus:bg-[#eee] focus:text-[#171717] p-2 rounded-md max-w-fit hover:scale-105 ease-in-out duration-200 cursor-pointer bg-[#212121] m-2"
          onClick={() => {
            verifyWod("woman", getWod);
          }}
          id="woman"
        >
          Woman
        </button>
        <button
          id="functional"
          className="font-semibold tracking-wide  focus:scale-100 focus:bg-[#eee] focus:text-[#171717] p-2 rounded-md max-w-fit hover:scale-105 ease-in-out duration-200 cursor-pointer bg-[#212121] m-2"
          onClick={() => {
            verifyWod("functional", getWod);
          }}
        >
          Functional
        </button>
        <button
          className="font-semibold tracking-wide focus:scale-100 focus:bg-[#eee] focus:text-[#171717] p-2 rounded-md max-w-fit hover:scale-105 ease-in-out duration-200 cursor-pointer bg-[#212121] m-2"
          onClick={() => {
            verifyWod("high", getWod);
          }}
          id="high"
        >
          High Intensity
        </button>
        <button
          className="font-semibold tracking-wide focus:scale-100 focus:bg-[#eee] focus:text-[#171717] p-2 rounded-md max-w-fit hover:scale-105 ease-in-out duration-200 cursor-pointer bg-[#212121] m-2"
          onClick={() => {
            verifyWod("power", getWod);
          }}
          id="power"
        >
          Power Woman
        </button>
        <button
          className=" font-semibold tracking-wide focus:scale-100 focus:bg-[#eee] focus:text-[#171717] p-2 rounded-md max-w-fit hover:scale-105 ease-in-out duration-100 cursor-pointer bg-[#212121] m-2"
          onClick={() => {
            verifyWod("intense", getWod);
          }}
          id="intense"
        >
          Intense Functional
        </button>
        <button
          className=" font-semibold tracking-wide focus:scale-100 focus:bg-[#eee] focus:text-[#171717] p-2 rounded-md max-w-fit hover:scale-105 ease-in-out duration-100 cursor-pointer bg-[#212121] m-2"
          onClick={() => {
            verifyWod("full", getWod);
          }}
          id="full"
        >
          Full Body
        </button>
      </div>
      <main className="h-[80%] flex ">
        <div className="w-1/2 ">
          <div className="flex  ">
            <h3 className="bg-[#212121] flex-1 flex justify-center items-center text-3xl p-4 mx-2 rounded-md my-6 tracking-wide font-semibold">
              {titleWod}
            </h3>
          </div>
          <div className="">
            {workout ? (
              workout.map((work) => {
                if (wod === work.name) {
                  return <Workout key={work.name} wod={work.workout}></Workout>;
                }
              })
            ) : (
              <p>No workout</p>
            )}
          </div>
        </div>
        <div className="w-1/2 flex items-center ">
          <video
            autoPlay
            muted
            loop
            className="w-full object-cover aspect-video animate-fade"
            src={import.meta.env.VITE_PUBLICIDAD_URL}
          >
            Tu navegador no soporta la reproducción de videos.
          </video>
        </div>
      </main>
    </section>
  );
}

export default InitPage;
