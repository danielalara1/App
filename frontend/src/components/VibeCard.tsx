interface VibeProps {
  image: string;
  title: string;
  user: string;
}

export const VibeCard = ({ image, title, user }: VibeProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">por {user}</p>
      </div>
    </div>
  );
};