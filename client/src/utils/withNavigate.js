import { useNavigate } from 'react-router-dom'

const withNavigate = (WrappedComponent) => {
  const Wrapper = (props) => {
    const navigate = useNavigate()
    return <WrappedComponent {...props} navigate={navigate} />
  }

  return Wrapper
}

export default withNavigate
