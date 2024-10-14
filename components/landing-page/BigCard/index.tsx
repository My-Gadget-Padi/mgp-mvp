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
          title="Hey! Meet MyGadgetPadi"
          paragraph="We are a platform designed to simplify gadget management for our customers. We serve as your one-stop solution for all your gadget needs, from protection to repairs, purchasing, trade-ins, and more in a single place."
          center
        />

        <div className="w-full">
          <div className="space-y-6 lg:space-y-0 gap-10 lg:grid grid-cols-3 md:grid-cols-1 xl:grid-cols-3 sm:grid-cols-1 ">
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