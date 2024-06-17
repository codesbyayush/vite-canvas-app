import { FaPen } from "react-icons/fa";
import { BiRectangle } from "react-icons/bi";
import { FaRegCircle } from "react-icons/fa";
import { TbOval } from "react-icons/tb";
import { MdLinearScale } from "react-icons/md";
import { tools } from "./types";

export const icons = {
  pencil: {
    icon: FaPen,
    value: tools.Pencil,
  },
  line: {
    icon: MdLinearScale,
    value: tools.Line,
  },
  ellipse: {
    icon: TbOval,
    value: tools.Ellipse,
  },
  rectangle: {
    icon: BiRectangle,
    value: tools.Rectangle,
  },
  circle: {
    icon: FaRegCircle,
    value: tools.Circle,
  },
};
