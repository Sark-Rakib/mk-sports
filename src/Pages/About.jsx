import { motion } from "framer-motion";
import aboutImg from "../assets/455929671_122105534468469330_3367931376665786303_n-removebg-preview.png";

const About = () => {
  return (
    <section className="py-20">
      <title>Lunor | About</title>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-[#aba65e]">
            About <span className="text-[#dacf2b]">MK Sports</span>
          </h2>

          {/* Brand Story */}
          <p className="text-lg leading-relaxed">
            <span className="font-semibold">MK Sports, </span>
            we are passionate about empowering athletes and sports enthusiasts
            to perform their best while looking stylish. We offer a wide range
            of high-quality sportswear, including jerseys, shorts, pants, and
            tracksuits designed for comfort, durability, and performance.
            Whether you're on the field, in the gym, or cheering for your
            favorite team, our products help you showcase your team spirit in
            style. Every piece is crafted to meet the demands of active
            lifestyles, so you can move freely, stay comfortable, and always
            feel confident. Join the MK Sports community and fuel your passion
            for sports—because greatness starts with the right gear!
          </p>

          <p className="text-lg leading-relaxed">
            At MK Sports, we believe clothing is more than just fabric — it's a
            statement of personality. Whether you're dressing for work, a
            celebration, or a casual outing, our collections are designed to
            make you look sharp and feel comfortable.
          </p>

          {/* Mission */}
          <div className=" mt-4">
            <h3 className="text-xl font-semibold text-[#aba65e] mb-2">
              Our Mission
            </h3>
            <p>
              To provide high-quality, affordable fashion that blends modern
              trends with cultural elegance.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src={aboutImg}
            alt="Lunor Fashion Collection"
            className="w-full md:w-[420px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
