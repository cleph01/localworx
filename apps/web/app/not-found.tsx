import { Empty, Container } from "@/components/ui";
export default function NotFound() {
  return <Container narrow><Empty title="We couldn't find that page" body="It may have moved, or the link may be mistyped." action={["/", "Go home"]} /></Container>;
}
