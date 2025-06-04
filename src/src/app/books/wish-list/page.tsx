import { WishList } from '../../ui/books/wish-list/WishList';
import { Title }  from '../../ui/utils/Title';

const WishListPage = () => {
  return (
    <div>
      <Title value="借りたい本一覧"/>
      <WishList />
    </div>
  );
}

export default WishListPage;
