// eslint-disable-next-line react/prop-types
function Workout({ wod }) {
  return (
    <article>
      <pre className=" text-4xl text-[#eee] text-center tracking-wider  font-[Roboto] ">
        {wod}
      </pre>
    </article>
  );
}

export default Workout;
