// import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import MessageCreate from "../components/MessageCreate";
import "react-datepicker/dist/react-datepicker.css";

function CreateWod() {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      console.log("resetando");
      reset();
    }
  }, [isSubmitSuccessful, reset, formState]);

  const submit = async (values) => {
    values.fecha = selectedDate;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/create-wod`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicamos que el cuerpo de la solicitud es JSON
        },
        body: JSON.stringify(values), // Convertimos el objeto a formato JSON
      }
    );
    const send = await response.json();
    setCreate(send);
    setTimeout(() => {
      setCreate(false);
    }, 2000);
  };

  return (
    <form
      className="flex justify-center flex-col items-center bg-[#171717]"
      onSubmit={handleSubmit(submit)}
    >
      <div className="my-4 flex justify-center flex-col items-center">
        <h2 className="text-xl font-bold">Crear wod</h2>
        <select
          className="bg-[#212121] p-2 my-2 rounded-md shadow-md"
          name="crearWod"
          {...register("clase", { required: true })}
          id=""
        >
          <option value="crossfit">Crossfit</option>
          <option value="functional">Functional</option>
          <option value="high">High Intensity</option>
          <option value="woman">Woman Strong</option>
          <option value="intense">Intense Functional</option>
          <option value="power">Power Woman</option>
          <option value="full">Full Body</option>
        </select>
      </div>
      <DatePicker
        // {...register("fecha", { required: true })}
        className="mb-4 bg-[#212121] p-2 rounded-md"
        minDate={new Date()}
        name="fechaWod"
        placeholderText="Select day"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat={"dd-MM-yyyy"}
        required
      />
      <textarea
        placeholder="Ej: Amrap 18'..."
        {...register("workout", { required: true })}
        className="text-black p-4 rounded-md"
        type="text"
        id=""
        cols="30"
        rows="10"
      ></textarea>
      <button className="my-4 font-semibold tracking-wide focus:scale-100 focus:bg-[#eee] focus:text-[#171717] p-2 rounded-md  hover:scale-105 ease-in-out duration-200 cursor-pointer bg-[#212121] m-2 w-2/3">
        Enviar
      </button>
      {create && <MessageCreate></MessageCreate>}
    </form>
  );
}

export default CreateWod;
