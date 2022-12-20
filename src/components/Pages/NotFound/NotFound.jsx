import cn from 'classnames'
import stl from './styles.notfound.module.scss'
import { Logo } from '../../Logo/Logo'

export function NotFound() {
  return (
    <div className={cn(stl.notfound)}>
      <Logo />

      <div className={cn(stl.notfound__text)}>Страница не найдена</div>
    </div>
  )
}
