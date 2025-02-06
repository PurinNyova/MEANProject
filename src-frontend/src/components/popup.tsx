import { Button, DialogActionTrigger, DialogBody, DialogCloseTrigger,
    DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, DialogPositioner } from "@chakra-ui/react"
import { ReactNode } from "react";

interface popupProps {
    buttonText?: string;
    dialogTitle?: string;
    children?: ReactNode;
    dialogButtonText?: string;
    onClickFunc: Function;
    buttonBg?: string;
}

const popup: React.FC<popupProps> = ({
    buttonText,
    dialogTitle,
    children,
    dialogButtonText,
    onClickFunc,
    buttonBg
}) => {

  return (
    <DialogRoot modal closeOnInteractOutside={false}>
      <DialogTrigger asChild>
        <Button bg={buttonBg}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogPositioner>
          <DialogContent maxH={"90vh"}>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <DialogBody>
              {children}
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>
              <DialogActionTrigger asChild>
                <Button onClick={() => {onClickFunc();}} bg={buttonBg}>{dialogButtonText}</Button>
            </DialogActionTrigger>
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  )
}

export default popup