import { Link, useSearchParams } from 'react-router-dom'

export default function NavBar() {

    const [searchParam] = useSearchParams();
    let navFilter = searchParam.get("todos");
    return (
        <nav>
            <Link to="/" className={navFilter === null ? 'active' : ''}>All</Link>
            <Link to="/?todos=active" className={navFilter === 'active' ? 'active' : ''}>Active</Link>
            <Link to="/?todos=completed" className={navFilter === 'completed' ? 'active' : ''}>Completed</Link>
        </nav>
    )
}
