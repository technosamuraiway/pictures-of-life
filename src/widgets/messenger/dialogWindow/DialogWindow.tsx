interface IProps {
  userId: string | string[]
}

export const DialogWindow = ({ userId }: IProps) => {
  return (
    <div>
      <h2>Chat with user {userId}</h2>
    </div>
  )
}
