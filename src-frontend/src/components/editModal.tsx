import { Fieldset, Input, Stack } from "@chakra-ui/react"
import { Field } from "./ui/field"
import { NativeSelectField, NativeSelectRoot } from "@chakra-ui/react"

const EditModal = () => {
  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field label="Name">
          <Input name="name" />
        </Field>

        <Field label="Email address">
          <Input name="email" type="email" />
        </Field>

        <Field label="Country">
          <NativeSelectRoot>
            <NativeSelectField
              name="country"
            />
          </NativeSelectRoot>
        </Field>
      </Fieldset.Content>
    </Fieldset.Root>
  )
}

export default EditModal