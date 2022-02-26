import { OknoContent } from "./OknoContent";
import { OknoHideButton } from "./OknoHideButton";
import { OknoResizeHandle } from "./OknoResizeHandle";
import { OknoTitlebar } from "./OknoTitlebar";
import { OknoCloseButton } from "./OknoCloseButton";
import { OknoWrapper } from "./OknoWrapper";
import { OknoShowButton } from "./OknoShowButton";

export const Okno = {
  Wrapper: OknoWrapper,
  Titlebar: OknoTitlebar,
  HideButton: OknoHideButton,
  CloseButton: OknoCloseButton,
  Content: OknoContent,
  ResizeHandle: OknoResizeHandle,
  ShowButton: OknoShowButton
};

export { useOkno, OknoProvider } from "./useOkno";
