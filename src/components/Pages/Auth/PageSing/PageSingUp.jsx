import cn from 'classnames'
import { SingIn } from '../SingIn'

import { SingUp } from '../SingUp'
import stl from './styles.pagesing.module.scss'

export function PageSingUp() {
  return (
    <div className={cn(stl.page__sing)}>
      <SingUp />
      <SingIn />
    </div>
  )
}
