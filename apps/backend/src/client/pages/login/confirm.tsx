import {responseEncoding} from 'axios'
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next'
import {verifyAuthToken} from '../../service/auth'

type LoginConfirmationPageProps = {
  isAuthanticated: boolean
  accessToken?: string
}

export const getServerSideProps: GetServerSideProps<
  LoginConfirmationPageProps
> = async ({query, res}: GetServerSidePropsContext) => {
  try {
    console.log('HELLO')

    const {data, headers, request} = await verifyAuthToken({
      token: query.token as string,
    })

    console.log(headers)

    //  Update headers on requester using headers from Node.js server response
    Object.entries(headers).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1] as string)
    )
    // Send data from Node.js server response

    console.log(res.getHeader)

    return {
      props: {
        isAuthanticated: true,
        accessToken: data.accessToken,
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
