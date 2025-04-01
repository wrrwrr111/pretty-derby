export default function Loading() {
  return (
    <div className="modal modal-open">
      <div className="modal-box max-h-[80vh] w-fit max-w-[80vw] overflow-y-auto">
        <progress className="progress z-10 w-56"></progress>
      </div>
    </div>
  );
}
