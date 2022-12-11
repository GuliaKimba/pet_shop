import cn from 'classnames'
import { SearchBtn } from '../Buttons/Buttons'
import stl from './search.module.scss'

export function Search() {
  return (
    <form className={cn(stl.search__form)}>
      <input
        className={cn(stl.search__input)}
        type='text'
        placeholder='Найти'
      />
      <SearchBtn />
    </form>
  )
}
