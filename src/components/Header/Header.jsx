import cn from 'classnames'

import { CartBtn, FavoritesBtn, ProfileBtn } from '../Buttons/Buttons'
import { Logo } from '../Logo/Logo'
import { Search } from '../Search/Search'
import stl from './styles.header.module.scss'

export function Header() {
  return (
    <header className={cn(stl.header)}>
      <div className={cn(stl.container)}>
        <Logo />
        <Search />
        <div className={cn(stl.header__block_btn)}>
          <FavoritesBtn />
          <CartBtn />
          <ProfileBtn />
        </div>
      </div>
    </header>
  )
}
