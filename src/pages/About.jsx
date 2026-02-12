import { useState, useEffect } from "react";

const aboutInfo = [
  {
    image: "/hs_chairman.webp",
    name: "Dr. Hari Om Singh",
    position: "Chairman",
    school: "Raj Group of Schools",
    about: `Raj English School, Varanasi, offers diverse learning opportunities, including debates, music, dance, drama, and sports. Our success is a result of the dedication of our staff and active parental involvement. As we celebrate 42 years of excellence, the school has earned a reputation not only for academics but also for cultural and sporting achievements.

<span class='highlight-quote'>"A child holds immense potential, and nurturing it is our collective responsibility."</span> With this in mind, we are committed to fostering a balanced development in our students, ensuring they excel in both scholastic and co-scholastic areas. Our students will continue to carry forward the values of love and unity.`,
  },
  {
    image: "/hs_director.webp",
    name: "Mr. Harsh Vardhan Singh",
    position: "Director",
    school: "Raj Group of Schools",
    about: `Education is not just about preparing for a job; it is a lifelong process that instills moral and ethical values. At Raj English School, we emphasize holistic development by encouraging participation in sports, games, and extracurricular activities, which teach valuable life skills that cannot be learned in the classroom.

<span class='highlight-quote'>"Sound body has a sound mind."</span> By fostering physical development through sports, we help students build a strong foundation for mental and emotional growth. Parents and school authorities must work together to nurture and guide students towards a bright future. <span class='highlight-quote'>"If a plant is carefully nurtured by a gardener, it will grow strong and bear good fruits."</span> In the same way, children must be carefully guided from a young age.`,
  },
  {
    image: "/hs_exec.webp",
    name: "Mr. Ratnesh Dubey",
    position: "Executive Director",
    school: "Raj Group of Schools",
    about: `At Raj English School, we offer a wide range of activities and opportunities that encourage students to explore their interests. From music to sports, our students thrive in an environment that nurtures their talents and encourages personal growth.

<span class='highlight-quote'>"Each day is an opportunity to learn and grow."</span> We are here to ensure our students seize every opportunity and thrive in an ever-changing world.`,
  },
  {
    image: "/utils/principal.webp",
    name: "Binod Kumar Mishra",
    position: "Principal",
    school: "Raj Group of Schools",
    about: `Raj English School is committed to creating an environment where students can grow academically, physically, and emotionally. Our school strives for excellence in every aspect, be it academics, sports, or leadership development.

<span class='highlight-quote'>"Excellence in academics is the hallmark of any great institution."</span> At Raj English School, we are proud to provide our students with the knowledge and skills they need to become tomorrow's leaders.`,
  },
];

function About() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mt-16 p-6 sm:p-10 bg-gray-100">
      {aboutInfo.map((info, index) => (
        <div
          key={index}
          className={`w-full mt-12 flex flex-col md:flex-row justify-center sm:rounded-lg lg:rounded-none items-center mb-16 ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image Section */}
          <div className="flex-16 w-full md:w-auto h-auto md:h-[350px]">
            <img
              src={info.image}
              alt={info.name}
              className="w-full h-full object-cover shadow-lg rounded-t-lg md:rounded-t-none"
            />
          </div>

          {/* Content Section */}
          <div
            className="bg-custom-blue p-5 bg-cover bg-center text-white shadow-lg flex-1 flex flex-col justify-center items-center md:h-[350px]"
            style={{
              backgroundImage:
                "url('registration-form/bg-img-default.png')",
            }}
          >
            <h1 className="text-xl lg:text-2xl text-red-500 tracking-wide border-b-2 border-red-500 mb-4">
              {info.position.toUpperCase()}'S DESK
            </h1>
            <h2 className="text-center md:text-left text-lg lg:text-xl text-white font-semibold mb-2">
              {info.name}
            </h2>

            <p
              className="text-white text-justify font-poppins text-sm lg:text-base max-w-full overflow-hidden overflow-ellipsis"
              dangerouslySetInnerHTML={{ __html: info.about }}
            />
          </div>
        </div>
      ))}

      <h1 className="text-xl sm:text-2xl lg:text-3xl text-black-400 my-10 text-center">
        About Raj English School
      </h1>
      <p className="text-sm sm:text-base lg:text-lg font-semibold text-red-500 text-center">
        Raj English School runs under the aegis of the Sanchetana Yoga
        Foundation.
      </p>
      <p className="p-6 sm:mx-14 text-slate-600 leading-relaxed text-center text-sm sm:text-base lg:text-lg max-w-full">
        The vision behind the founding of Raj English School is a remarkable
        story of perseverance and dedication. Dr. Hari Om Singh, a man with a
        dream, founded the school to impart quality education at a time when
        others doubted his path. Despite the challenges, he stayed determined,
        and today, his dream has become a reality. The school now enjoys a
        prestigious reputation for academic excellence and holistic development.
      </p>
      <p className="px-10 sm:mx-14 text-slate-600 text-center text-sm sm:text-base lg:text-lg max-w-full">
        Affiliated with CBSE, New Delhi since 1997, the school offers classes
        from Play Group to Senior Secondary with a focus on the all-round
        development of students. Our curriculum and co-curricular programs aim
        to prepare students for a bright and successful future.
      </p>

      {/* Custom CSS Styles */}
      <style jsx>{`
        .highlight-quote {
          color: #f0b429; /* Bright yellow color for highlighting quotes */
          font-style: italic;
          font-weight: bold;
        }
        @media (min-width: 770px) and (max-width: 1024px) {
          .text-lg {
            font-size: 1rem; /* Adjust font size for better fit */
          }
          .max-w-full {
            max-width: 90%; /* Set a max width for content */
          }
        }
      `}</style>
    </div>
  );
}

export default About;
