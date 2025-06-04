const About = () => {
  return (
    <section className="py-12 px-4 md:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-6">About Us</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Welcome to <span className="font-semibold text-orange-500">FoodExpress</span> — your go-to destination for quick, delicious, and reliable food delivery.
          We partner with top restaurants in your area to bring your favorite meals straight to your doorstep.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Whether you're craving street food, fine dining, or daily essentials, we’ve got you covered. 
          Our platform is designed to be fast, easy to use, and secure, making online food ordering a delightful experience.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed">
          At FoodExpress, we believe good food should be accessible, affordable, and fast. 
          We’re constantly growing, adding new features, and improving our service to give you the best online food ordering experience.
        </p>
      </div>
    </section>
  );
};

export default About;
