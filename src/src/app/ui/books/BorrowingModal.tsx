import { Button }  from '../buttons/Button';
import { TextField } from '../inputs/TextField';
import { useState } from 'react';
import { fetcher } from '../../../../lib/utils';

interface BorrowingModalProps {
  isOpen: boolean;
  bookId: number;
  onClose: () => void;
  onBorrowSuccess: () => void;
}

export const BorrowingModal: React.FC<BorrowingModalProps> = ({ isOpen, bookId, onClose, onBorrowSuccess }) => {
  const [returnDate, setReturnDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetcher('api/books/borrow', {
        method: 'POST',
        body: JSON.stringify({
          bookId: bookId,
          returnDueDate: returnDate
        })
      });

      await onBorrowSuccess();
      await onClose();
      setTimeout(() => {
        alert('貸し出し処理が完了しました');
      }, 100);
    } catch (error) {
      console.error('Error:', error);
      alert('貸出処理に失敗しました');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-bg fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="modal-content bg-white p-6 rounded-lg z-10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <TextField 
              label='返却日' 
              dataName='returnDate'
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
            />
          </div>

          <div>
            <Button value='借りる' type='submit'/>
            <button
              type="button"
              onClick={onClose}
              className={`w-full border rounded-md bg-while py-1.5 text-sm font-semibold text-gray text-gray-400 hover:bg-gray-100 mt-1`}
            >
              閉じる
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
