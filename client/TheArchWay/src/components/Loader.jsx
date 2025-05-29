import PulseLoader from "react-spinners/PulseLoader";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <PulseLoader color={"var(--Forest)"} />
    </div>
  );
}
