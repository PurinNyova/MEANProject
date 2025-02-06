import { Button, DialogActionTrigger, DialogBody, DialogCloseTrigger,
    DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogPositioner } from "@chakra-ui/react"
import { ReactNode } from "react";

interface popupProps {
    dialogTitle?: string;
    dialogButtonText?: string;
    openProp: boolean;
    onClickFunc: Function;
    children?: ReactNode;
}

const ErrorPopup: React.FC<popupProps> = ({
    dialogTitle,
    children,
    dialogButtonText,
    openProp,
    onClickFunc
}) => {

  return (
    <DialogRoot modal open={openProp} closeOnInteractOutside={false}>
      <DialogPositioner>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <DialogBody>
              {children}
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button onClick={() => {onClickFunc()}} >{dialogButtonText}</Button>
            </DialogActionTrigger>
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  )
}

export default ErrorPopup