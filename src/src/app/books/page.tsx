import { BookList } from '../ui/books/BookList';
import { Title }  from '../ui/utils/Title';

const BooksForm = () => {
  return (
    <div>
      <Title value="本一覧"/>
      <BookList />
    </div>
  );
}

export default BooksForm;
