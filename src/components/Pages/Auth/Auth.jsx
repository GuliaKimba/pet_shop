import cn from 'classnames'
import stl from './styles.auth.module.scss'
import { Logo } from '../../Logo/Logo'
import { SingupBtn, SinginBtn } from '../../Buttons/Buttons'

export function Auth() {
  return (
    <div className={cn(stl.auth)}>
      <div className={cn(stl.auth__logo)}>
        <Logo />
      </div>

      <div className={cn(stl.auth__buttons)}>
        <SingupBtn />
        <SinginBtn />
      </div>
    </div>
  )
}
