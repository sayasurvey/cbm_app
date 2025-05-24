import { BookList } from '../ui/books/BookList';
import { Title }  from '../ui/utils/Title';

const BooksPage = () => {
  return (
    <div>
      <Title value="本一覧"/>
      <BookList />
    </div>
  );
}

export default BooksPage;
