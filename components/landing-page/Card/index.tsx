import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import landingData from "./cardData";  

const Blog = () => {
  return (
    <section
      id="blog"
      className="bg-white py-12 md:py-10 lg:py-5"
    >
      <div className="container">
        <SectionTitle
          subtitle="Service we offer"
          title="Explore what we have for you"
          paragraph="We are your one-stop solution for all consumer electronics needs, bringing together protection, repairs, purchasing, trade-ins, and more, all in one place."
          center
        />

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-10 xl:grid-cols-2">
          {landingData.map((data) => (
            <div key={data.id} className="w-full">
              <SingleBlog landing={data} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
