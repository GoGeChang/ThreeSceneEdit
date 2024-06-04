// 事件
type EventListType =
  | "save"
  | "import"
  | "export"
  | "gridCommb"
  | "gridMerg"
  | "instaniation"
  | "antiInstance"
  | "contourLine"
  | "posiRotationX"
  | "posiRotationY"
  | "posiRotationZ"
  | "vertexRotationX"
  | "vertexRotationY"
  | "vertexRotationZ"
  | "resetFront"
  | "resetBck"
  | "resetCenter";
  
interface ToolsEventType {
  type: EventListType;
  value: any;
}

/** topTools */
interface TopToolsIcon {
  icon: EventListType;
  key: EventListType;
}

interface TopToolsType extends TopToolsIcon {
  icons?: TopToolsIcon[];
  label: string;
}
