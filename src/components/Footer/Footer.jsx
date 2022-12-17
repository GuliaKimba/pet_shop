import cn from 'classnames'
import { Logo } from '../Logo/Logo'
import stl from './styles.footer.module.scss'
import copyright from './copyright.png'
import telegram from './img/telegram.png'
import whatsapp from './img/whatsapp.png'
import viber from './img/viber.png'
import instagram from './img/instagram.png'
import vk from './img/vk.png'

export function Footer() {
  return (
    <div className={cn(stl.footer)}>
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
        <div className={cn(stl.footer__block)}>
          <div className={cn(stl.footer__text)}>Каталог</div>
          <div className={cn(stl.footer__text)}>Акции</div>
          <div className={cn(stl.footer__text)}>Новости</div>
          <div className={cn(stl.footer__text)}>Отзывы</div>
        </div>
        <div className={cn(stl.footer__block)}>
          <div className={cn(stl.footer__text)}>Оплата и доставка</div>
          <div className={cn(stl.footer__text)}>Часто спрашивают</div>
          <div className={cn(stl.footer__text)}>Обратная связь</div>
          <div className={cn(stl.footer__text)}>Контакты</div>
        </div>
        <div className={cn(stl.footer__block_contacs)}>
          <div className={cn(stl.footer__text_bolt)}>Мы на связи</div>
          <div className={cn(stl.footer__phone_email)}>
            <div className={cn(stl.footer__text_bolt)}>
              <a
                href='tel:+7999000000'
                alt='Номер телефона'>
                8(999) 00-00-00
              </a>
            </div>
            <div className={cn(stl.footer__text)}>
              <a
                href='mailto: dogfood@gmail.com'
                alt='Электронная почта'>
                dogfood@gmail.com
              </a>
            </div>
          </div>
          <div className={cn(stl.footer__social)}>
            <a
              href='https://www.google.com/'
              alt='Телеграм'>
              <img
                src={telegram}
                alt='Телеграм'
              />
            </a>
            <a
              href='https://www.google.com/'
              alt='Вотсап'>
              <img
                src={whatsapp}
                alt='Вотсап'
              />
            </a>
            <a
              href='https://www.google.com/'
              alt='Viber'>
              <img
                src={viber}
                alt='Viber'
              />
            </a>
            <a
              href='https://www.google.com/'
              alt='Инстаграм'>
              <img
                src={instagram}
                alt='Инстаграм'
              />
            </a>
            <a
              href='https://www.google.com/'
              alt='Вконтакте'>
              <img
                src={vk}
                alt='Вконтакте'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
