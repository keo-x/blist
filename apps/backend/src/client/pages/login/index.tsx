import {AtSymbolIcon} from '@heroicons/react/24/outline'
import {Button} from '../../components/Button'
import {useForm} from 'react-hook-form'
import {sendUserLink} from '../../service/auth'

type LoginInput = {
  destination: string
}

const LoginPage = () => {
  const {register, handleSubmit} = useForm<LoginInput>()

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
            nulla eaque error neque ipsa culpa autem, at itaque nostrum!
          </p>
        </div>

        <form
          onSubmit={handleSubmit(sendUserLink)}
          className="mx-auto mt-8 mb-0 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="destination" className="text-sm font-medium">
              Email
            </label>

            <div className="relative mt-1">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 border p-4 pr-12 text-sm shadow-sm"
                placeholder="votre adresse e-mail"
                {...register('destination', {required: true})}
              />

              <span className="absolute inset-y-0 right-4 inline-flex items-center">
                <AtSymbolIcon className="h-6 w-6 text-gray-300" />
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <Button type="submit" variant="primary">
              Connectez-vous
            </Button>
          </div>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Welcome"
          src="http://localhost:3333/public/night-club.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

export default LoginPage
