import { Button, DialogActionTrigger, DialogBody, DialogCloseTrigger,
    DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger, DialogPositioner } from "@chakra-ui/react"

interface popupProps {
    buttonText?: string;
    dialogTitle?: string;
    dialogText?: string;
    dialogButtonText?: string;
    onClickFunc: Function;
}

const popup: React.FC<popupProps> = ({
    buttonText,
    dialogTitle,
    dialogText,
    dialogButtonText,
    onClickFunc
}) => {

  return (
    <DialogRoot modal closeOnInteractOutside={false}>
      <DialogTrigger asChild>
        <Button bg={"red"}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogPositioner>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <p>
                {dialogText}
              </p>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>
              <DialogActionTrigger asChild>
                <Button onClick={() => {onClickFunc();}} bg={"red"}>{dialogButtonText}</Button>
            </DialogActionTrigger>
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  )
}

export default popup