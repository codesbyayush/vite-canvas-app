import { useRef, useState } from "react";
import Controls from "./components/controls";
import Whiteboard from "./components/whiteboard";
import { tools, element } from "./libs/types";

function App() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [tool, setTool] = useState<tools>(tools.Pencil);
  const [color, setColor] = useState("rgba(0, 0, 0, 1)");
  const [element, setElement] = useState<element[] | []>([]);
  const [strokeWidth, setStrokeWidth] = useState(3);

  return (
    <>
      <Controls
        setElement={setElement}
        setTool={setTool}
        selectedTool={tool}
        color={color}
        setColor={setColor}
        setStrokeWidth={setStrokeWidth}
        strokeWidth={strokeWidth}
      />
      <Whiteboard
        canvasRef={canvasRef}
        ctxRef={ctxRef}
        element={element}
        setElement={setElement}
        tool={tool}
        color={color}
        strokeWidth={strokeWidth}
      />
    </>
  );
}

export default App;

