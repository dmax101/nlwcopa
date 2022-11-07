import { VStack, Heading, Toast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
  const [isLoading, setisLoading] = useState(false);
  const [code, setCode] = useState("");
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    try {
      setisLoading(true);

      if (!code.trim()) {
        return Toast.show({
          title: "Please enter a valid code",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/pools/join", { code });

      Toast.show({
        title: "Pool joined successfully",
        placement: "top",
        bgColor: "green.500",
      });

      navigate("pools");
    } catch (error) {
      console.log(error);
      setisLoading(false);

      Toast.show({
        title: `Não foi possível entrar no bolão! ${error.message}`,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {"\n"} seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />
        <Button
          title="Buscar o Bolão"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
