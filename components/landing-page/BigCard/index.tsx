import SectionTitle from "../Common/SectionTitle";
import SingleCard from "./SingleCard";
import cardData from "./bigCardData";  

const BigCard = () => {
  return (
    <section
      id="blog"
      className="bg-white dark:bg-bg-color-dark py-16 md:py-10 lg:py-20"
    >
      <div className="container">
      <SectionTitle
          subtitle="About us"
          title="Hey! Meet mygadgetpadi is here"
          paragraph="this is a text, don’t read except you’re one... I caught you reading this, better stop now or the next line is going to hit you really well. You are smart"
          center
        />

      <div className="mx-auto w-full">
      <div className="lg:grid grid-cols-3 lg:gap-12 md:grid-cols-1 md:gap-x-8 lg:gap-x-12 xl:grid-cols-3 sm:grid-cols-1 ">
          {cardData.map((card) => (
            <div key={card.id} className="w-full">
              <SingleCard card={card} />
            </div>
          ))}
        </div>
      </div>
       
      </div>
    </section>
  );
};

export default BigCard;
