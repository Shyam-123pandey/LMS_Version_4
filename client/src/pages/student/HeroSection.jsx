import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Vortex } from "@/components/ui/vortex";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative h-[70vh] w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-10">
      <Vortex
        className="flex items-center justify-center"
        particleCount={500}
        baseHue={200}
        backgroundColor="transparent"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Find the Best Courses for You
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              Discover, Learn, and Upskill with our wide range of courses
            </p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onSubmit={searchHandler}
              className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6 border border-gray-200 dark:border-gray-700"
            >
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Courses"
                className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
              />
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-full"
              >
                Search
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                onClick={() => navigate(`/course/search?query`)}
                className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-full px-8 py-3 border border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Explore Courses
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Vortex>
    </div>
  );
};

export default HeroSection;
