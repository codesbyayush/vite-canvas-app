import rough from "roughjs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { element, tools } from "../libs/types";

type whiteboardProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  element: element[];
  setElement: React.Dispatch<React.SetStateAction<element[]>>;
  tool: tools;
  color: string;
  strokeWidth: number;
};

export default function Whiteboard({
  canvasRef,
  ctxRef,
  element,
  setElement,
  tool,
  color,
  strokeWidth,
}: whiteboardProps) {
  const [drawing, setDrawing] = useState(false);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const rcanvas = rough.canvas(canvasRef.current);

    ctxRef.current?.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    element.forEach((ele) => {
      if (ele.path.length > 0) {
        if (ele.tool === 0)
          rcanvas.linearPath(ele.path as [number, number][], {
            stroke: ele.strokeColor,
            strokeWidth: ele.strokeWidth,
            roughness: 0.5,
          });
        else if (ele.tool === 1)
          rcanvas.line(
            ele.path[0][0],
            ele.path[0][1],
            ele.path[0][2],
            ele.path[0][3],
            {
              stroke: ele.strokeColor,
              strokeWidth: ele.strokeWidth,
              roughness: 0.5,
            }
          );
        else if (ele.tool === 2)
          rcanvas.rectangle(
            ele.path[0][0],
            ele.path[0][1],
            ele.path[0][2] - ele.path[0][0],
            ele.path[0][3] - ele.path[0][1],
            {
              stroke: ele.strokeColor,
              strokeWidth: ele.strokeWidth,
              roughness: 0.5,
            }
          );
        else if (ele.tool === 3)
          rcanvas.ellipse(
            ele.path[0][0],
            ele.path[0][1],
            2 * (ele.path[0][2] - ele.path[0][0]),
            2 * (ele.path[0][3] - ele.path[0][1]),
            {
              stroke: ele.strokeColor,
              strokeWidth: ele.strokeWidth,
              roughness: 0.5,
            }
          );
        else if (ele.tool === 4)
          rcanvas.circle(
            ele.path[0][0],
            ele.path[0][1],
            2 *
              Math.sqrt(
                Math.pow(ele.path[0][2] - ele.path[0][0], 2) +
                  Math.pow(ele.path[0][3] - ele.path[0][1], 2)
              ),
            {
              stroke: ele.strokeColor,
              strokeWidth: ele.strokeWidth,
              roughness: 0.5,
            }
          );
      }
    });
  }, [element, canvasRef]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
  }, [canvasRef]);

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    setDrawing(true);
    setElement((prev) => [
      ...prev,
      {
        path: [[e.nativeEvent.offsetX, e.nativeEvent.offsetY]],
        tool: tool,
        strokeColor: color,
        strokeWidth: strokeWidth,
      },
    ]);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!drawing) return;

    setElement((prev) => {
      if (tool === 0)
        return [
          ...prev.map((ele, index) =>
            index === prev.length - 1
              ? {
                  ...ele,
                  path: [
                    ...ele.path,
                    [e.nativeEvent.offsetX, e.nativeEvent.offsetY],
                  ],
                }
              : ele
          ),
        ];
      else
        return [
          ...prev.map((ele, index) =>
            index === prev.length - 1
              ? {
                  ...ele,
                  path: [
                    [
                      ele.path[0][0],
                      ele.path[0][1],
                      e.nativeEvent.offsetX,
                      e.nativeEvent.offsetY,
                    ],
                  ],
                }
              : ele
          ),
        ];
    });
  }

  function handleMouseUp() {
    setDrawing(false);
  }

  return (
    <>
      <canvas
        className="h-screen w-screen cursor-pointer border-gray-900 border-2"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </>
  );
}
