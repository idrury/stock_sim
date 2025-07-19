export interface ControlsProps {
  onStart: () => void;
  onCrash: () => void;
}

/******************************
 * Controls component
 * @todo Create description
 */
export function Controls({ onStart, onCrash }: ControlsProps) {
  return (
    <div className="w100 pb3 row">
      <button className="w100 mr1" onClick={onStart}>
        Start
      </button>
      <button className="w100 ml1" onClick={onCrash}>
        Crash
      </button>
    </div>
  );
}
