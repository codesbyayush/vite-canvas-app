import React, { SetStateAction, useCallback, useRef, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";

import useOnClickOutside from "../hooks/useOnClickOutside";

type colorPickerProps = {
  color: string;
  onChange: React.Dispatch<SetStateAction<string>>;
};
export const ColorPicker = ({ color, onChange }: colorPickerProps) => {
  const popover = useRef(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useOnClickOutside(popover, close);

  return (
    <div className="relative border-2 rounded border-black/30">
      <div
        className="w-10 h-10 rounded cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className="absolute top-[102%] left-0" ref={popover}>
          <RgbaStringColorPicker
            color={color}
            onChange={onChange}
            className="border-2 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};
