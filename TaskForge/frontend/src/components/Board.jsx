import Column from "./Column";

export default function Board() {
  return (
    <div className="board">
      <Column title="To Do" />
      <Column title="Doing" />
      <Column title="Done" />
    </div>
  );
}