import { motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const Service = () => {
  const { theme } = useTheme();
  const services = [
    {
      title: "Interactive Courses",
      description:
        "Explore our comprehensive collection of courses designed to enhance your skills. Learn at your own pace with expert-led instruction and hands-on projects.",
      link: "/courses",
      color: [0, 128, 255], // Blue
    },
    {
      title: "Skill Assessment Quizzes",
      description:
        "Test your knowledge and track your progress with our adaptive quizzes. Get instant feedback and personalized recommendations for improvement.",
      link: "/quizzes",
      color: [255, 99, 71], // Tomato
    },
    {
      title: "Professional Certification",
      description:
        "Earn industry-recognized certifications to validate your expertise. Stand out in your field with credentials that matter to employers.",
      link: "/certification",
      color: [50, 205, 50], // Lime Green
    },
    {
      title: "Industry Insights Blog",
      description:
        "Stay updated with the latest trends, best practices, and expert insights through our curated blog posts and articles.",
      link: "/blog",
      color: [147, 112, 219], // Medium Purple
    },
    {
      title: "Prepare and Review for Daily Tasks",
      description:
        "Stay updated with the latest trends, best practices, and expert insights through your curated To Do List and articles.",
      link: "/to-do-list",
      color: [147, 112, 219], // Medium Purple
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover how we can help you achieve your learning goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div
                className={`
                relative overflow-hidden rounded-xl p-8
                ${theme === "dark" ? "bg-[#020817]" : "bg-white"}
                border ${
                  theme === "dark" ? "border-gray-800" : "border-gray-200"
                }
                transition-all duration-300
                group-hover:shadow-lg
                ${
                  theme === "dark"
                    ? "group-hover:shadow-blue-500/10"
                    : "group-hover:shadow-gray-200"
                }
              `}
              >
                <CanvasRevealEffect
                  animationSpeed={5.1}
                  containerClassName={cn(
                    "absolute inset-0",
                    theme === "dark" ? "bg-[#020817]" : "bg-white"
                  )}
                  colors={[service.color]}
                  dotSize={2}
                />
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <Link
                    to={
                      service.link == "/quizzes"
                        ? "https://quiz-app-v2-shyam.netlify.app/"
                        : service.link === "/blog"
                        ? "https://atomic-blog-shyam-pandey.netlify.app/"
                        : service.link === "/to-do-list"
                        ? "https://study-journey-trip.netlify.app/"
                        : service.link
                    }
                    className={`
                      inline-flex items-center justify-center
                      px-6 py-2 rounded-lg
                      ${
                        theme === "dark"
                          ? "bg-blue-500 text-white"
                          : "bg-blue-500 text-white"
                      }
                      hover:bg-blue-600
                      transition-colors duration-300
                    `}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
