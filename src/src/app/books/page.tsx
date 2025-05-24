import Layout from '../ui/layouts/Layout';
import { BookList } from '../ui/books/BookList';
import { Title }  from '../ui/utils/Title';

const BooksForm = () => {
  return (
    <Layout>
      <Title value="本一覧"/>
      <BookList />
    </Layout>
  );
}

export default BooksForm;