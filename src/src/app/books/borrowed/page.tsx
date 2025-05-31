import { BorrowedBookList } from '../../ui/books/borrowed/BorrowedBookList';
import { Title }  from '../../ui/utils/Title';

const BorrowedBooksPage = () => {
  return (
    <div>
      <Title value="借りた本の一覧"/>
      <BorrowedBookList />
    </div>
  );
}

export default BorrowedBooksPage;
