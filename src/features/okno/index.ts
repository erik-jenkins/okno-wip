import { OknoContent } from "./OknoContent";
import { OknoResizeHandle } from "./OknoResizeHandle";
import { OknoTitlebar } from "./OknoTitlebar";
import { OknoCloseButton } from "./OknoCloseButton";
import { OknoWrapper } from "./OknoWrapper";

export const Okno = {
  Wrapper: OknoWrapper,
  Titlebar: OknoTitlebar,
  CloseButton: OknoCloseButton,
  Content: OknoContent,
  ResizeHandle: OknoResizeHandle
};

export { useOkno, OknoProvider } from "./useOkno";
