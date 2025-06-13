import { signInAction } from "../actions";

export default function SignIn() {
  return (
    <form
      action={signInAction}
    >
      <button type="submit">Sign in</button>
    </form>
  )
}