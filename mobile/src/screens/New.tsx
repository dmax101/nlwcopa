import { VStack, Text, Heading, Toast } from "native-base";
import Logo from "../assets/logo.svg";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";

export function New() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handlePoolCreate() {
    if (!title.trim()) {
      return Toast.show({
        title: "Title is required",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsLoading(true);

      await api.post("/pools", { title });

      Toast.show({
        title: "Pool created successfully",
        placement: "top",
        bgColor: "green.500",
      });

      setTitle("");
    } catch (error) {
      Toast.show({
        title: "Not possible to create a new pool",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa e compartilhe com seus amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual nome do seu bolão?"
          onChangeText={setTitle}
          value={title}
        />
        <Button
          title="Criar meu Bolão"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar o bolão, você receberá um código único que poderá usar para
          convidar outras pessoas para {"\n"}participar do seu bolão.
        </Text>
      </VStack>
    </VStack>
  );
}
