import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { FaImage, FaLink, FaRegNewspaper } from "react-icons/fa";
import { SiReact, SiTailwindcss, SiPython, SiTensorflow } from "react-icons/si";
import performanceImage from "../assets/model_performance.png";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white overflow-visible">

      {/* ===== Header ===== */}
      <Header />

      {/* ===== Hero Section ===== */}
      <main className="flex-grow flex flex-col items-center justify-center text-center relative px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none" />

        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold tracking-wide mb-6"
        >
          Fake News Detection <span className="text-blue-500">AI</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-3xl text-gray-300 text-lg md:text-xl leading-relaxed mb-10"
        >
          Empower your knowledge with truth. Analyze text, images, or links to
          detect fake news instantly using our intelligent LSTM+CNN model.
        </motion.p>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button
            label="Get Started"
            color="blue"
            onClick={() => navigate("/home/main")}
            className="px-8 py-3 text-lg shadow-lg hover:shadow-blue-500/40"
          />
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60"
        />
      </main>

      {/* ===== Features Section ===== */}
      <section className="bg-gray-950 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12"
        >
          Key Features
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {[
            {
              icon: <FaRegNewspaper className="text-blue-400 text-5xl mb-4" />,
              title: "Text Detection",
              desc: "Enter or paste news articles and our AI model will instantly detect if it's fake or real.",
              path: "/home/main",
              mode: "text",
            },
            {
              icon: <FaImage className="text-purple-400 text-5xl mb-4" />,
              title: "Image Analysis",
              desc: "Upload an image of news content. The system uses OCR to extract text and analyze authenticity.",
              path: "/home/main",
              mode: "image",
            },
            {
              icon: <FaLink className="text-green-400 text-5xl mb-4" />,
              title: "Link Verification",
              desc: "Paste a news article URL, and we’ll extract key information and run it through our model.",
              path: "/home/main",
              mode: "link",
            },
          ].map((item, index) => (
            <motion.div
              key={item.mode} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              onClick={() => navigate(item.path, { state: { mode: item.mode } })}
              className="bg-gray-800 hover:bg-gray-700 p-8 rounded-2xl shadow-lg border border-gray-700 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
            >
              {item.icon}
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </section>

      {/* ===== How It Works ===== */}
      <section className="bg-gray-900 py-20 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-10"
        >
          How It Works
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10 max-w-5xl mx-auto text-gray-300">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-400 mb-2">1</span>
            <p>Enter a paragraph, image, or link related to news.</p>
          </div>
          <div className="text-2xl text-blue-500">→</div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-400 mb-2">2</span>
            <p>Our AI model processes the content.</p>
          </div>
          <div className="text-2xl text-blue-500">→</div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-blue-400 mb-2">3</span>
            <p>It returns the result: <span className="text-blue-400">Real</span> or <span className="text-red-400">Fake</span>.</p>
          </div>
        </div>
      </section>
      {/* ===== System Overview Section (Converted from Images) ===== */}
      {/* ===== System Overview Section (Dark Mode) ===== */}
      <section className="bg-gray-950 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* ===== Important Note (Dark) ===== */}
          <div className="bg-yellow-950/40 text-gray-200 rounded-2xl p-6 shadow-xl border border-yellow-900/40">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-yellow-400 mb-3">
              ⚠ Important Note
            </h3>

            <p className="text-sm leading-relaxed mb-4 text-gray-300">
              This system uses a <strong className="text-yellow-300">3-tier verification approach</strong>:
              <br />
              <strong className="text-yellow-200">
                News API → Wikipedia → ML Models
              </strong>
              . It intelligently falls back to ensure
              <strong className="text-yellow-300"> 100% fact-checking coverage</strong>.
            </p>

            <div className="bg-yellow-900/40 rounded-xl p-4">
              <h4 className="font-semibold text-yellow-300 mb-2">
                ⚡ Key Features
              </h4>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
                <li>Professional fact-checker integration</li>
                <li>Entity verification via Wikipedia</li>
                <li>Real-time misinformation detection</li>
              </ul>
            </div>
          </div>
          {/* ===== How It Works (Dark) ===== */}
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-800">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">
              How It Works
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              Our system uses <strong className="text-gray-200">3 verification layers</strong>:
            </p>

            <div className="space-y-4 text-sm">
              <div className="border-l-4 border-gray-500 bg-gray-800 p-3 rounded-md text-gray-300">
                <strong className="text-gray-200">News API</strong>
                <br />
                Claims → ClaimReview → Verified results
              </div>

              <div className="border-l-4 border-green-500 bg-green-950/40 p-3 rounded-md text-gray-300">
                <strong className="text-green-400">Wikipedia Verification</strong>
                <br />
                spaCy NER → Entity validation
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-950/40 p-3 rounded-md text-gray-300">
                <strong className="text-blue-400">ML Pattern Detection</strong>
                <br />
                TF-IDF → Ensemble Voting → 99% accuracy
              </div>

            </div>

            <div className="mt-4 bg-blue-900/40 text-blue-300 text-xs p-3 rounded-lg">
              🔄 Smart fallback activates when News Api has no results
            </div>
          </div>
          {/* ===== Model Performance (Dark) ===== */}
          <div className="w-full flex justify-center overflow-hidden">
    <img
      src={performanceImage}
      alt="Tested Model Performance"
      className="
        w-full 
        max-w-full 
        h-auto 
        object-contain
        rounded-xl
      "
    />
  </div>


        </div>
      </section>

      {/* ===== Tech Stack ===== */}
      <section className="bg-gray-950 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-10"
        >
          Built With Modern Technology
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-12 text-5xl text-gray-400">
          <SiReact className="hover:text-blue-400 transition" title="React" />
          <SiTailwindcss className="hover:text-teal-400 transition" title="Tailwind CSS" />
          <SiPython className="hover:text-yellow-400 transition" title="Python" />
          <SiTensorflow className="hover:text-orange-400 transition" title="TensorFlow" />
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-800 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6"
        >
          Ready to Find the Truth?
        </motion.h2>
        <Button
          label="Start Detecting"
          color="blue"
          onClick={() => navigate("/home/main")}
          className="px-10 py-4 text-lg bg-black hover:bg-gray-800 border border-blue-500 shadow-lg"
        />
      </section>

      {/* ===== Footer ===== */}
      <Footer />
    </div>
  );
}
