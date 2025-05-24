interface TitleProps {
  value: string;
};

export const Title: React.FC<TitleProps> = ({ value }) => {

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-20">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">{value}</h2>
    </div>
  );
}
