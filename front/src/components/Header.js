import { useLocation, Link } from 'react-router-dom'

const Header = ({ title, onAdd }) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
    {location.pathname === '/analysis' && <Link to='/project' className='btn' onClick={onAdd}>Avançar</Link>}
    {location.pathname === '/project' && <Link to='/' className='btn' onClick={onAdd}>Avançar</Link>}
        </header>
    )
}

Header.defaultProps = {
    title: 'Control System',
}

export default Header
