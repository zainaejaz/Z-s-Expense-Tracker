import { useNavigate } from "react-router-dom";
import Button from "./Button";

// import {} from '../../public/'
function Section() {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen min-w-full bg-center bg-cover bg-no-repeat  bg-[url('../../public/pexels-cottonbro-3943748.jpg')]">
      <div
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        className="min-h-screen min-w-full flex flex-col justify-center items-center text-[#FFFFFF] relative"
      >
        <h1 className="text-[3rem] xl:text-[2rem] lg:text-[1.5rem] md:text-[1.5rem] sm:text-[1rem] text_size mb-8">
          Welcome Zaina <span>😊</span> to Z&apos;s ExpenseTracker
        </h1>
        <Button
          className="text-[2rem] xl:text-[2rem] lg:text-[1.5rem] md:text-[1.5rem] sm:text-[0.5rem] btn_size bg-cyan-500 rounded-full p-3 shadow-lg hover:shadow-[#FFFFFF]/100 hover:drop-shadow-2xl"
          onClick={() => navigate("budget")}
        >
          Check Budget <span>👁</span>
        </Button>
      </div>
    </section>
  );
}

export default Section;
