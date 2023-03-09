import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next'
import {dehydrate, QueryClient, DehydratedState} from 'react-query'
import {saveAccessToken, verifyAuthToken} from '../../service/auth'

type LoginConfirmationPageProps = {
  isAuthanticated: boolean
  DehydratedState?: DehydratedState
}

export const getServerSideProps: GetServerSideProps<
  LoginConfirmationPageProps
> = async ({query, res}: GetServerSidePropsContext) => {
  try {
    const queryClient = new QueryClient()
    const {data, headers} = await verifyAuthToken({
      token: query.token as string,
    })

    await queryClient.prefetchQuery(
      ['accessToken', data.accessToken],
      saveAccessToken
    )

    Object.entries(headers).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1] as string)
    )
    // Send data from Node.js server response
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  } catch (err) {
    return {
      props: {
        isAuthanticated: false,
      },
    }
  }
}

const LoginConfirmationPage: NextPage<LoginConfirmationPageProps> = ({
  isAuthanticated,
}) => {
  return (
    <main className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg  rounded-lg p-8 shadow-2xl">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          {isAuthanticated
            ? 'Félicitations, vous êtes connecté !'
            : 'Connexion échouée'}
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          {isAuthanticated
            ? "Cliquez sur le bouton pour accéder à la page d'accueil."
            : "Cliquez sur le bouton ci-dessous pour revenir à l'écran de connexion et essayer de vous connecter à nouveau."}
        </p>
      </div>
    </main>
  )
}

export default LoginConfirmationPage
