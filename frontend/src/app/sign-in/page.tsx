import { Center, Container } from "@mantine/core";
import SignInForm from "@/components/auth/sign-in";

export default function SignInPage() {
  return (
    <Container size="responsive" py="5rem">
      <Center>
        <SignInForm />
      </Center>
    </Container>
  );
}
