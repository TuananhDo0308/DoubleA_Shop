import React from "react";
import {
  motion,
  useAnimate,
  useMotionValue,
  useDragControls,
} from "framer-motion";
import ProductList from "./ListProduct";
import { AppDispatch, useAppSelector } from "@/app/GlobalRedux/store";
import { useDispatch } from "react-redux";
import { changeStatus } from "@/app/GlobalRedux/Features/cartUiSlice";

const Drawer: React.FC = () => {
  const open = useAppSelector((state) => state.cartUiStatusSliceReducer.value);
  
  const dispatch = useDispatch<AppDispatch>()

  const [scope, animate] = useAnimate();
  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, { opacity: [1, 0] });
    await animate("#drawer", { y: [0] });
    dispatch(changeStatus())
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ ease: "easeInOut" }}
            className="absolute bottom-0 h-[90vh] w-full overflow-hidden rounded-t-3xl bg-white"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
          >
            <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12">
              <ProductList />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Drawer;
