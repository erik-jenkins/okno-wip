import { OknoContent } from "./OknoContent";
import { OknoTitlebar } from "./OknoTitlebar";
import { OknoCloseButton } from "./OknoCloseButton";
import { OknoWrapper } from "./OknoWrapper";

export const Okno = {
  Wrapper: OknoWrapper,
  Titlebar: OknoTitlebar,
  CloseButton: OknoCloseButton,
  Content: OknoContent
};

export { useOkno, OknoProvider } from "./useOkno";
