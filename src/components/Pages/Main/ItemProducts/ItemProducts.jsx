import cn from 'classnames'

import stl from './styles.itemProduct.module.scss'

export function ItemProducts({ pictures, price, discount, wight, name }) {
  const priceWithDiscount = price - (price * discount) / 100

  return (
    <div className={cn(stl.item__cnt)}>
      {discount > 0 ? (
        <button
          className={cn(stl.tags__btn, stl.tags__sale_btn)}
          aria-label='Значки акции'
          type='submit'>
          {`- ${discount} %`}
        </button>
      ) : null}

      <div className={cn(stl.product__img)}>
        <img
          src={pictures}
          alt='Фото продукта'
        />
      </div>
      <div className={cn(stl.itemWr)}>
        {discount > 0 ? <div className={cn(stl.current__price_line_through)}>{price}</div> : null}
        {discount > 0 ? (
          <div className={cn(stl.current__price_red)}>{priceWithDiscount}</div>
        ) : (
          <div className={cn(stl.current__price)}>{price}</div>
        )}

        <div className={cn(stl.product__wight)}>{wight}</div>
        <div className={cn(stl.product__name)}>{name}</div>

        <button
          className={cn(stl.item__products_btn)}
          type='button'>
          В корзину
        </button>
      </div>
    </div>
  )
}
