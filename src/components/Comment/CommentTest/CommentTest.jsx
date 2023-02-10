import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRev } from '../../../redux/reviewsSlice/revSlice'

export function CommentTest({ ...item }) {
  const arr = useSelector((state) => state.test.rev)
  const dispatch = useDispatch()
  const productId = item._id

  const prodRev = arr.filter((el) => el.product === productId)

  useEffect(() => {
    dispatch(fetchRev())
  }, [dispatch])

  return (
    <div>
      {prodRev.map((el) => (
        <div>{el.author.name}</div>
      ))}
    </div>
  )
}
