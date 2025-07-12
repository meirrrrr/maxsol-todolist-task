import { Center, Container } from "@mantine/core";
import SignUpForm from "@/components/auth/sign-up";

export default function SignUpPage() {
  return (
    <Container size="responsive" py="5rem">
      <Center>
        <SignUpForm />
      </Center>
    </Container>
  );
}
