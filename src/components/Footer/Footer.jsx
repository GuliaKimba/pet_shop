import cn from 'classnames'
import { Logo } from '../Logo/Logo'
import stl from './styles.footer.module.scss'
import copyright from './copyright.png'

export function Footer() {
  return (
    <div className={cn(stl.container)}>
      <div className={cn(stl.footer__block_logo)}>
        <Logo />
        <div className={cn(stl.copyright)}>
          <img
            className={cn(stl.copyright__img)}
            src={copyright}
            alt='Все права защищены'
          />
          <div className={cn(stl.copyright__text)}>Интернет-магазин Pet Shop</div>
        </div>
      </div>
    </div>
  )
}
