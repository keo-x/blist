import {AtSymbolIcon} from '@heroicons/react/24/outline'
import {Button} from '../components/Button'
import {useForm, SubmitHandler} from 'react-hook-form'
import {sendUserLink} from '../service/auth'

type LoginInput = {
  destination: string
}

const LoginPage = () => {
  const {register, handleSubmit} = useForm<LoginInput>()

  return (
    <main className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Get started today
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>

        <form
          onSubmit={handleSubmit(sendUserLink)}
          className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl"
        >
          <p className="text-lg font-medium">Sign in to your account</p>

          <div>
            <label htmlFor="destination" className="text-sm font-medium">
              Email
            </label>

            <div className="relative mt-1">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                {...register('destination', {required: true})}
              />

              <span className="absolute inset-y-0 right-4 inline-flex items-center">
                <AtSymbolIcon className="h-6 w-6 text-gray-300" />
              </span>
            </div>
          </div>

          <Button type="submit" variant="primary">
            Sign in
          </Button>
        </form>
      </div>
    </main>
  )
}

export default LoginPage
