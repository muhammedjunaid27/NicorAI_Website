import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  MessageSquare, 
  BarChart3, 
  Zap, 
  Database, 
  Bot, 
  LineChart, 
  Sparkles,
  ChevronRight,
  Briefcase,
  Code,
  Users,
  Shield,
  Clock,
  Globe
} from 'lucide-react';

interface ViewProps {
  viewId: string;
  onClose: () => void;
}

// Helper function for classNames conditional joining
const cn = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};

const DynamicViewRenderer: React.FC<ViewProps> = ({ viewId, onClose }) => {
  // Function to render content based on viewId
  const renderContent = () => {
    switch (viewId) {
      case 'what-we-do':
        return <WhatWeDoPage />;
        
      case 'what-weve-done':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">What We've Done</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Case Study 1 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Case Study Image</span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">Healthcare AI Assistant</h3>
                  <p className="text-gray-700 mb-3">
                    Developed an AI assistant for a major healthcare provider that reduced administrative workload by 35%.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Healthcare</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">NLP</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Workflow Automation</span>
                  </div>
                </div>
              </div>
              
              {/* Case Study 2 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Case Study Image</span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">Retail Demand Forecasting</h3>
                  <p className="text-gray-700 mb-3">
                    Built predictive models for a retail chain that improved inventory management and increased sales by 22%.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Retail</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Predictive Analytics</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">ML</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'connect':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Connect With Us</h2>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 max-w-2xl mx-auto">
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        );
        
      case 'us':
        return (
          <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            
            <div className="mb-8 max-w-3xl">
              <p className="text-gray-700 mb-4">
                NicorAI was founded with a vision to make artificial intelligence accessible and practical
                for businesses of all sizes. Our team of experts combines deep technical knowledge with
                business acumen to deliver AI solutions that drive real results.
              </p>
              <p className="text-gray-700">
                We believe in the transformative power of AI and are committed to helping our clients
                leverage this technology to innovate, grow, and stay ahead in today's competitive landscape.
              </p>
            </div>
            
            <h3 className="text-2xl font-semibold mb-4">Our Team</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Team Member 1 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Team Member Photo</span>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold">Jane Doe</h4>
                  <p className="text-blue-700 text-sm mb-2">CEO & Founder</p>
                  <p className="text-gray-700 text-sm">
                    AI enthusiast with 15+ years of experience in machine learning and business leadership.
                  </p>
                </div>
              </div>
              
              {/* Team Member 2 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Team Member Photo</span>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold">John Smith</h4>
                  <p className="text-blue-700 text-sm mb-2">CTO</p>
                  <p className="text-gray-700 text-sm">
                    Former research scientist with expertise in NLP and conversational AI architectures.
                  </p>
                </div>
              </div>
              
              {/* Team Member 3 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Team Member Photo</span>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold">Emily Chen</h4>
                  <p className="text-blue-700 text-sm mb-2">Lead Data Scientist</p>
                  <p className="text-gray-700 text-sm">
                    PhD in Computer Science with specialization in predictive modeling and data analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-700">Select a section from the sidebar to view content</p>
          </div>
        );
    }
  };

  return (
    <div className="relative flex-1 h-full overflow-auto bg-gray-50">
      <div className="sticky top-0 right-0 p-4 flex justify-end">
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-sm"
          aria-label="Close view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {renderContent()}
    </div>
  );
};

// Feature Section Component
function FeatureSection() {
  const features = [
    {
      title: "AI-Powered Solutions",
      description: "Custom AI solutions designed to solve your specific business challenges.",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      title: "Conversational AI",
      description: "Natural language processing that enables human-like interactions with your customers.",
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      title: "Data Analytics",
      description: "Transform raw data into actionable insights with our advanced analytics tools.",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      title: "Real-time Processing",
      description: "Process and analyze data in real-time for immediate decision making.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Data Integration",
      description: "Seamlessly integrate with your existing systems and data sources.",
      icon: <Database className="w-6 h-6" />,
    },
    {
      title: "Predictive Analytics",
      description: "Forecast future trends and behaviors with our predictive models.",
      icon: <LineChart className="w-6 h-6" />,
    },
    {
      title: "Custom AI Models",
      description: "Develop and deploy custom AI models tailored to your specific needs.",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      title: "Continuous Learning",
      description: "Our AI systems continuously learn and improve from new data and interactions.",
      icon: <Sparkles className="w-6 h-6" />,
    },
  ];

  return (
    <div className="py-20 bg-slate-50" id="services">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10 mb-16">
          <div className="flex gap-4 flex-col items-center">
            <Badge>Our Services</Badge>
            <div className="flex gap-2 flex-col text-center">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-2xl mx-auto font-medium">
                Our Core Services
              </h2>
              <p className="text-lg max-w-2xl mx-auto leading-relaxed tracking-tight text-gray-600">
                We offer a wide range of AI services designed to help your business thrive in today's competitive landscape.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Modern "What We Do" page component with cleaner design
function WhatWeDoPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeatureSection />
    </div>
  );
}

// Badge component (simplified version for this project)
const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
      {children}
    </div>
  );
};

// RetroGrid animation component
const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "#e2e8f0",
  darkLineColor = "#334155",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "pointer-events-none absolute w-full h-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`,
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="[background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90%" />
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  const title = "What We Do";
  const subtitle = {
    regular: "Transforming businesses with ",
    gradient: "AI solutions",
  };
  const description = "NicorAI specializes in creating custom AI solutions tailored to your business needs. We leverage cutting-edge machine learning and natural language processing to automate tasks, analyze data, and provide actionable insights.";
  
  return (
    <div className="relative bg-slate-50">
      <div className="absolute top-0 z-[0] h-screen w-screen bg-purple-950/5 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      <section className="relative max-w-full mx-auto z-1">
        <RetroGrid />
        <div className="max-w-screen-xl z-10 mx-auto px-4 py-28 gap-12 md:px-8">
          <div className="space-y-5 max-w-3xl leading-0 lg:leading-5 mx-auto text-center">
            <h1 className="text-sm text-gray-600 group font-medium mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/20 via-gray-400/20 to-transparent border-[2px] border-black/5 rounded-3xl w-fit">
              {title}
              <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
            </h1>
            <h2 className="text-4xl tracking-tighter font-medium bg-clip-text text-transparent mx-auto md:text-6xl bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)]">
              {subtitle.regular}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                {subtitle.gradient}
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              {description}
            </p>
            <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white text-xs font-medium backdrop-blur-3xl">
                  <a
                    href="#services"
                    className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-zinc-300/20 via-purple-400/30 to-transparent text-gray-900 border-input border-[1px] hover:bg-gradient-to-tr hover:from-zinc-300/30 hover:via-purple-400/40 hover:to-transparent transition-all sm:w-auto py-4 px-10"
                  >
                    Explore Services
                  </a>
                </div>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Feature Card Component
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="relative bg-gradient-to-b from-neutral-100 to-white p-6 rounded-3xl overflow-hidden group hover:shadow-md transition-all duration-300">
      <Grid size={20} />
      <div className="relative z-20 flex flex-col gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-200 via-violet-400 to-indigo-600 rounded-xl text-white">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-neutral-800 mb-2">
            {title}
          </h3>
          <p className="text-neutral-600 text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Grid Component
function Grid({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-zinc-100/30 to-zinc-300/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full mix-blend-overlay stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
}

// Grid Pattern Component
function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any, i: number) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}-${i}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

export default DynamicViewRenderer; 