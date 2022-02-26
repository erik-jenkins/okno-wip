import { OknoContent } from "./OknoContent";
import { OknoHideButton } from "./OknoHideButton";
import { OknoResizeHandle } from "./OknoResizeHandle";
import { OknoTitlebar } from "./OknoTitlebar";
import { OknoCloseButton } from "./OknoCloseButton";
import { OknoWrapper } from "./OknoWrapper";
import { OknoShowButton } from "./OknoShowButton";
import { OknoBounds } from "./OknoBounds";

export const Okno = {
  Wrapper: OknoWrapper,
  Titlebar: OknoTitlebar,
  HideButton: OknoHideButton,
  CloseButton: OknoCloseButton,
  Content: OknoContent,
  ResizeHandle: OknoResizeHandle,
  ShowButton: OknoShowButton,
  Bounds: OknoBounds
};

export { useOkno, OknoProvider } from "./useOkno";
