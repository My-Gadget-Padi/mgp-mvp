import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import cardData from "./cardData";  

const Blog = () => {
  return (
    <section
      id="blog"
      className="bg-white py-12 md:py-10 lg:py-5"
    >
      <div className="container">
        <SectionTitle
          subtitle="Service we offer"
          title="Peep into what we have for you"
          paragraph="this is a text, don’t read except you’re one... I caught you reading this, better stop now or the next line is going to hit you really well. You are smart"
          center
        />

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-10 xl:grid-cols-2">
          {cardData.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
