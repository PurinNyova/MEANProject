import { Button, DialogActionTrigger, DialogBody, DialogCloseTrigger,
    DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, DialogPositioner } from "@chakra-ui/react"
import { ReactNode } from "react";

interface popupProps {
    buttonText?: string;
    buttonColor?: string;
    dialogTitle?: string;
    children?: ReactNode;
    dialogButtonText?: string;
    onClickFunc: Function;
    buttonBg?: string;
}

const popup: React.FC<popupProps> = ({
    buttonText,
    buttonColor,
    dialogTitle,
    children,
    dialogButtonText,
    onClickFunc,
    buttonBg
}) => {

  return (
    <DialogRoot modal closeOnInteractOutside={false}>
      <DialogTrigger asChild>
        <Button bg={buttonBg} color={buttonColor}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogPositioner>
          <DialogContent maxH={"90vh"}>
            <DialogHeader>
              <DialogTitle maxW={"100px"}>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <DialogBody overflow={"scroll"}>
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