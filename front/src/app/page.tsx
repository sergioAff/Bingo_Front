import { CoverParticles } from "@/Components/CoverParticles";
import { pressStart2P } from "@/app/fonts/fonts";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className={`${pressStart2P.className} flex flex-col items-center justify-center h-screen text-white`}
    >
      <CoverParticles />
      <div className="border border-gray-200 p-4 rounded-lg shadow-lg w-full text-center">
        <h2 className=" text-xl border-b pb-2 border-gray-200">
          Welcome to Big Buddha Bingo
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 border-b md:border-b-0 md:border-r-2 border-gray-200 p-4">
            <p className="text-st">
              Welcome to our exciting online bingo platform, where fun and
              rewards meet! Play bingo anytime, anywhere, and experience the
              thrill of winning in a vibrant community. Whether you are a
              seasoned player or new to the game, our user-friendly interface
              and engaging features make every round enjoyable. Join the fun,
              challenge your luck, and win amazing prizes. Ready to play? Let’s
              get the bingo party started!
            </p>
          </div>
          <div className="flex-1 p-4 flex items-center justify-center">
            {" "}
            <Image
              src={"/bingo.svg"}
              alt={"Bingo"}
              width={100}
              height={100}
              className="filter w-full grayscale hover:grayscale-0 hover:cursor-pointer transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
