import { useParams } from 'react-router-dom';

export const Detail = () => {
  const { carId } = useParams();
  console.log('carId', carId);
  return (
    <div>
      <h1 className="text-red-500">Detail for id {carId} will be handle later</h1>
    </div>
  );
};
