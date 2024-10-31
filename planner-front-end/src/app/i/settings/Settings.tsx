import { TypeUserForm } from "@/types/auth.types"
import { SubmitHandler, useForm } from "react-hook-form"
import { useInitialData } from "./useInitialData"
import { useUpdateSettings } from "./useUpdateSettings"
import { Field } from "@/components/ui/fields/Field"
import { TypePomodoroSettingsState } from "@/types/pomodoro.types"

export function Settings() {
  const { register, handleSubmit, reset } = useForm<TypeUserForm & TypePomodoroSettingsState>({
    mode: 'onChange'
  })

  useInitialData(reset)
  const { isPending, mutate } = useUpdateSettings()

  const onSubmit: SubmitHandler<TypeUserForm> = data => {
    const { password, ...rest } = data

    mutate({
      ...rest,
      password: password || undefined
    })
  }

  return <div>
    <form className="w-2/4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-10">
        <Field
          id='email'
          label='Email:'
          placeholder='Enter email:'
          type='email'
          extra='mb-4'
          {...register('email', {
            required: 'Email is required!'
          })}
        />

        <Field
          id='name'
          label='Name:'
          placeholder='Enter name:'
          type='email'
          {...register('name')}
          extra='mb-4'
        />

        <Field
          id='password'
          label='Password: '
          placeholder='Enter password: '
          type='password'
          {...register('password', {
            required: 'Password is required!'
          })}
          extra='mb-6'
        />
      </div>
      <div>
        <Field
          id='workInterval'
          label='Work interval (min.): '
          placeholder='Enter work interval (min.): '
          isNumber
          {...register('workInterval', {
            valueAsNumber: true
          })}
          extra='mb-4'
        />
      </div>
    </form>
  </div>
}