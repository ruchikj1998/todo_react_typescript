import { Link } from 'react-router-dom'
import { useNavFilter } from '../hooks/useNavFilter';
import { NAV_FILTER_ACTIVE, NAV_FILTER_COMPLETED } from '../utils/constants';

export default function NavBar() {

    const navFilter = useNavFilter();

    return (
        <nav>
            <Link to="/" className={navFilter === null ? 'active' : ''}>All</Link>
            <Link to="/?todos=active" className={navFilter === NAV_FILTER_ACTIVE ? 'active' : ''}>Active</Link>
            <Link to="/?todos=completed" className={navFilter === NAV_FILTER_COMPLETED ? 'active' : ''}>Completed</Link>
        </nav>
    )
}
