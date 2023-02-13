import NextAuth, {AuthOptions} from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    EmailProvider({}),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
