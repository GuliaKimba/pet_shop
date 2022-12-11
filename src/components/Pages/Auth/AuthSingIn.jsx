import { useState } from 'react'
import cn from 'classnames'
import stl from './styles.auth.module.scss'
import { Logo } from '../../Logo/Logo'
import { SinginBtn } from '../../Buttons/Buttons'
import { Modal } from '../../Modal/Modal'

import { SingIn } from './SingIn'

export function AuthSingIn() {
  const [isModalOpenSingUp, setIsModalOpenSingUp] = useState(false)

  const clickHandler = () => {
    setIsModalOpenSingUp((prev) => !prev)
  }

  return (
    <div className={cn(stl.auth)}>
      <div className={cn(stl.auth__logo)}>
        <Logo />
      </div>

      <div className={cn(stl.auth__buttons)}>
        <SinginBtn
          isModalOpenSingUp={isModalOpenSingUp}
          setIsModalOpenSingUp={setIsModalOpenSingUp}
          clickHandler={clickHandler}
        />
      </div>
      <Modal isModalOpenSingUp={isModalOpenSingUp}>
        <SingIn />
      </Modal>
    </div>
  )
}
