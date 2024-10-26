import { motion } from "framer-motion";
import { Category } from "@/types/Category";

interface ChipTabsProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const ChipTabs: React.FC<ChipTabsProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="px-36 py-6 flex items-center flex-wrap gap-2">
      {categories?.map((category: Category) => (
        <Chip
          key={category.str_malh}
          text={category.str_tenlh}
          value={category.str_malh}
          selected={selectedCategory === category.str_malh}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </div>
  );
};

interface ChipProps {
  text: string;
  value: string;
  selected: boolean;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const Chip: React.FC<ChipProps> = ({
  text,
  value,
  selected,
  setSelectedCategory,
}) => {
  return (
    <button
      onClick={() => setSelectedCategory(value)}
      className={`${
        selected
          ? "text-white font-black"
          : "text-slate-800 hover:text-slate-900 hover:bg-slate-300"
      } text-base transition-colors px-5 py-2 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-md"
        />
      )}
    </button>
  );
};
