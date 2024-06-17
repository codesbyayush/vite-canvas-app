import { icons } from "../libs/icons";
import { element, tools } from "../libs/types";
import { ColorPicker } from "./colorPicker";

type controlProps = {
  setElement: React.Dispatch<React.SetStateAction<[] | element[]>>;
  setTool: React.Dispatch<React.SetStateAction<tools>>;
  selectedTool: tools;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setStrokeWidth: React.Dispatch<React.SetStateAction<number>>;
  strokeWidth: number;
};

export default function Controls({
  setElement,
  setTool,
  selectedTool,
  color,
  setColor,
  setStrokeWidth,
  strokeWidth,
}: controlProps) {
  return (
    <div className="w-min flex px-8 py-3 justify-center items-center border-gray-500 border-2 gap-24 fixed top-4 rounded-lg bg-gray-100 left-1/2 -translate-x-1/2">
      <div className="flex gap-4 bg-gray-100">
        {Object.entries(icons).map(([value, tool], i) => {
          if (i >= Object.keys(tools).length / 2) return;
          return (
            <button
              key={value}
              onClick={() => setTool(tool.value)}
              className={`px-3 py-2 rounded border-2 border-black/15 ${
                tool.value === selectedTool ? "bg-black text-white" : ""
              }`}
            >
              <tool.icon className="h-6 w-6" />
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        <ColorPicker color={color} onChange={setColor} />
        <span>
          <input
            type="number"
            onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
            value={strokeWidth}
            aria-valuemax={10}
            aria-valuemin={1}
            className="border-2 w-10 h-10 rounded pl-2"
          />
        </span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => {
            setElement([]);
          }}
          className="whitespace-nowrap bg-red-300 py-2 px-4 rounded font-semibold border-red-500 border-2"
        >
          Clear Canvas
        </button>
      </div>
    </div>
  );
}
