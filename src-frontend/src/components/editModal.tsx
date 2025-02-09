import { Box, Container, Fieldset, Input, NumberInputRoot, SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@chakra-ui/react"
import { Field } from "./ui/field"
import { kelamins, positions, locations } from "../pages/RegisterPage"
import React, { useContext, useEffect } from "react"
import { NumberInputField } from "./ui/number-input"
import { EditContext } from "../pages/DashboardPage"
import Loader from "./Loader"


const EditModal: React.FC<{onStartFunction: Function}> = ({onStartFunction}) => {

  const { user, handleInputChange, emptyField, setUser, loading, setLoading} = useContext(EditContext)

  useEffect(() => {
    setLoading(true)
    onStartFunction()
  }, [])

  useEffect(() => {
    console.log(user)
    setLoading(false)
  }, [user])

  if (loading) {
    return <Loader />
  }

  return (

    <Container mt={"20px"}>
              <Fieldset.Root size="lg" maxW="2xl">
                  <Fieldset.Content>
                      <Field required label="Nama" errorText="This field is required" invalid={(emptyField && user.name !== "")}>
                          <Input color={"black"} name='name' placeholder='Nama' w={"100%"} unstyled h={"50px"}
                          focusRingColor={"none"} pl={"10px"} value={user.name}
                          backgroundColor={"white"} borderRadius={"20px"}
                          onChange={handleInputChange}
                          />
                      </Field>
                      <Field required label="Kelas" invalid={(emptyField && user.kelas !== "")} errorText="This field is required">
                          <Input name='kelas' placeholder='Kelas' w={"100%"} unstyled h={"50px"}
                          focusRingColor={"none"} pl={"10px"} color={"black"} value={user.kelas}
                          backgroundColor={"white"} borderRadius={"20px"}
                          onChange={handleInputChange}
                          />
                      </Field>
      
                      <Field required label="NPM" invalid={(emptyField && user.npm !== 0)} errorText="This field is required">
                      <NumberInputRoot defaultValue="0" step={1} name='npm' w={"100%"} unstyled h={"50px"}
                          focusRingColor={"none"} pl={"10px"} display={"flex"} overflow={"hidden"}
                          backgroundColor={"white"} borderRadius={"20px"}>
                          <NumberInputField bg={"transparent"} focusVisibleRing={"none"} color={"black"} w={"100%"} onChange={handleInputChange} value={user.npm}/>
                      </NumberInputRoot>
                      </Field>

                      <Field required label="Kelamin" invalid={(emptyField && user.kelamin !== "")} errorText="This field is required">
                      <Box w={"100%"} overflow={"visible"} h={"50px"}>
                          <SelectRoot w={"100%"}
                          name={"kelamin"} collection={kelamins}
                          onValueChange={(data) => setUser(prevState => ({
                              ...prevState,
                              ["kelamin"]: data.value.toString()
                          }))}>
                              <SelectTrigger w={"100%"} backgroundColor={"white"} borderRadius={"20px"}>
                                  <SelectValueText color={"black"} placeholder={user.kelamin} defaultValue={user.kelamin} />
                              </SelectTrigger>
                              <SelectContent>
                                  {kelamins.items.map((position) => (
                                  <SelectItem item={position} key={position.value}>
                                      {position.label}
                                  </SelectItem>
                                  ))}
                              </SelectContent>
                          </SelectRoot>
                      </Box>
                      </Field>

                      <Field required label="No HP" invalid={(emptyField && user.noHP !== 0)} errorText="This field is required">
                      <NumberInputRoot defaultValue="0" step={1} name='noHP' w={"100%"} unstyled h={"50px"}
                          focusRingColor={"none"} pl={"10px"} display={"flex"} overflow={"hidden"}
                          backgroundColor={"white"} borderRadius={"20px"}>
                          <NumberInputField bg={"transparent"} focusVisibleRing={"none"} color={"black"} w={"100%"} onChange={handleInputChange} value={user.noHP}/>
                      </NumberInputRoot>
                      </Field>

                      <Field required label="IPK Terakhir" invalid={(emptyField && user.lastIPK !== 0)} errorText="This field is required">
                      <NumberInputRoot defaultValue="0" step={0.01} name='lastIPK' w={"100%"} unstyled h={"50px"}
                          focusRingColor={"none"} pl={"10px"} display={"flex"} overflow={"hidden"} formatOptions={{style: "decimal"}}
                          backgroundColor={"white"} borderRadius={"20px"}>
                          <NumberInputField bg={"transparent"} focusVisibleRing={"none"} color={"black"} w={"100%"} onChange={handleInputChange} value={user.lastIPK}/>
                      </NumberInputRoot>
                      </Field>
                      <Field required label="Tempat Tanggal lahir (Tempat, 0 Bulan 0000)" invalid={(emptyField && user.tempatTanggalLahir !== "")} errorText="This field is required">
                          <Input name='tempatTanggalLahir' placeholder='Tempat Tanggal Lahir' w={"100%"} unstyled h={"50px"}
                          focusVisibleRing={"none"} pl={"10px"} color={"black"}
                          backgroundColor={"white"} borderRadius={"20px"}
                          onChange={handleInputChange} value={user.tempatTanggalLahir}
                          />
                      </Field>
                      <Field required label="Jurusan" invalid={(emptyField && user.jurusan !== "")} errorText="This field is required">
                          <Input name='jurusan' placeholder='Jurusan' w={"100%"} unstyled h={"50px"}
                          focusRingColor={"none"} pl={"10px"} color={"black"}
                          backgroundColor={"white"} borderRadius={"20px"}
                          onChange={handleInputChange} value={user.jurusan}
                          />
                      </Field>
                      <Field required label="Alamat" invalid={(emptyField && user.alamat !== "")} errorText="This field is required">
                          <Input name='alamat' placeholder='Alamat' w={"100%"} unstyled h={"50px"}
                          focusRingColor={"none"} pl={"10px"} color={"black"}
                          backgroundColor={"white"} borderRadius={"20px"}
                          onChange={handleInputChange} value={user.alamat}
                          />
                      </Field>
                      <Field required label="Email address" invalid={(emptyField && user.email !== "")} errorText="This field is required">
                          <Input name='email' placeholder='Email Address' w={"100%"} unstyled h={"50px"}
                          focusRingColor={"none"} pl={"10px"} color={"black"}
                          backgroundColor={"white"} borderRadius={"20px"}
                          onChange={handleInputChange} value={user.email}
                          />
                      </Field>
                      <Field required label="Lokasi Kampus" invalid={(emptyField && user.lokasiKampus !== "")} errorText="This field is required">
                          <Box w={"100%"} overflow={"visible"} h={"50px"}>
                              <SelectRoot w={"100%"}
                              name={"lokasiKampus"} collection={locations}
                              onValueChange={(data) => setUser(prevState => ({
                                  ...prevState,
                                  ["lokasiKampus"]: data.value.toString()
                              }))}>
                                  <SelectTrigger w={"100%"} backgroundColor={"white"} borderRadius={"20px"}>
                                      <SelectValueText color={"black"} placeholder={user.lokasiKampus} defaultValue={user.lokasiKampus}/>
                                  </SelectTrigger>
                                  <SelectContent>
                                      {locations.items.map((location) => (
                                      <SelectItem item={location} key={location.value}>
                                          {location.label}
                                      </SelectItem>
                                      ))}
                                  </SelectContent>
                              </SelectRoot>
                          </Box>
                      </Field>
      
                      <Field required label="Posisi" invalid={(emptyField && user.posisi !== "")} errorText="This field is required">
                      <Box w={"100%"} overflow={"visible"} h={"50px"}>
                          <SelectRoot w={"100%"}
                          name={"posisi"} collection={positions}
                          onValueChange={(data) => setUser(prevState => ({
                              ...prevState,
                              ["posisi"]: data.value.toString()
                          }))}>
                              <SelectTrigger w={"100%"} backgroundColor={"white"} borderRadius={"20px"}>
                                  <SelectValueText color={"black"} placeholder={user.posisi} />
                              </SelectTrigger>
                              <SelectContent>
                                  {positions.items.map((position) => (
                                  <SelectItem item={position} key={position.value}>
                                      {position.label}
                                  </SelectItem>
                                  ))}
                              </SelectContent>
                          </SelectRoot>
                      </Box>
                      </Field>
                  </Fieldset.Content>
                  </Fieldset.Root>
    </Container>
  )
}

export default EditModal