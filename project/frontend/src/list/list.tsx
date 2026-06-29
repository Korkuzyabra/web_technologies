import Navbar from '../components/Navbar';
import BooksGrid from './components/BooksGrid';

function List() {
  return (
    <div>
      <Navbar active="2" />
      <BooksGrid />
    </div>
  );
}

export default List;
