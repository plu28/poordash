import React from "react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";


interface UserChefCardProps {
  slug: string;
  chefName: string;
  distance: number;
  cuisine?: string[];
  rating: number;
  imageUrl: string;
}

const UserChefCard: React.FC<UserChefCardProps> = ({
  slug,
  chefName,
  distance,
  cuisine,
  rating,
  imageUrl,
}) => {
  return (
    <Link
      to={`/chef/${slug}`}
      className="flex gap-3 bg-white p-6 rounded-lg shadow-sm border">
      <img
        src={imageUrl}
        alt={`${chefName}'s image`}
        className="w-24 h-24 rounded-md object-cover"
      />
      <div className="flex flex-col gap-y-2">
        <p className="font-semibold text-2xl leading-none -mt-0.5">
          {chefName}
        </p>
        <p className="text-lg text-gray-600 leading-none">{distance} mi away</p>
        <div className="flex gap-2 flex-wrap">
          {cuisine?.map((c, index) => (
            <Badge key={index} variant="secondary" className="w-fit">
              {c}
            </Badge>
          ))}
        </div>
        <p className="flex text-lg font-medium items-center gap-1 leading-none">
          {rating} <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        </p>
      </div>
    </Link>
  );
};

export default UserChefCard;
